import time

import numpy as np
import torch

# 矩阵乘法对比：C = A × B（均为 N×N）
# 这是 GPU 的典型优势场景——高算术强度：每个输出元素要做 N 次乘加，
# 数据复用率高，几千个核心可以同时各算一个元素。

# N = 512 时的结果:
# 矩阵规模: 512 × 512（每个结果元素需 512 次乘加，总计 0.13 GFLOP 级）
# [CPU] 耗时: 19025 毫秒, 校验和: 3288715584
# backend: mps
# [GPU] 耗时: 40 毫秒, 校验和: 3288715587
# 加速比 (CPU / GPU): 475.6x
N = 512

# ---- 准备两个 N×N 矩阵（用 float32 二维数组，与 JS 的 Float32Array 对齐）----
def make_matrix(n):
    m = []
    for i in range(n):
        row = np.zeros(n, dtype=np.float32)
        for j in range(n):
            # 用确定性的值填充，避免依赖随机数，且两版输入完全一致
            row[j] = ((i * 31 + j * 17) % 100) / 10
        m.append(row)
    return m

A = make_matrix(N)
B = make_matrix(N)

# 简单校验和：对比 GPU / CPU 结果是否一致（Float32 下允许微小误差）
def checksum(C, n):
    s = 0.0
    for i in range(n):
        for j in range(n):
            # 显式转 python float，避免 numpy 2.0 (NEP 50) 把 s 降级成 float32 累加
            s += float(C[i][j])
    return s

# ======================= CPU 版：三重循环 =======================
def cpu_mat_mul():
    start = time.time()
    C = []
    for i in range(N):
        row = np.zeros(N, dtype=np.float32)
        for j in range(N):
            total = 0.0
            for k in range(N):
                total += A[i][k] * B[k][j]
            row[j] = total
        C.append(row)
    end = time.time()
    return {"C": C, "ms": int((end - start) * 1000)}

# ======================= GPU 版：每线程算一个 C[y][x] =======================
def gpu_mat_mul():
    # 自动选择后端：Mac 的 MPS / NVIDIA 的 CUDA / 退化到 CPU
    if torch.backends.mps.is_available():
        device = torch.device("mps")
    elif torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")
    print("\nbackend:", device.type)

    # 将数据搬运 / 显存分配 / 计算的一次性开销纳入计时
    start = time.time()
    a = torch.tensor(np.array(A), dtype=torch.float32, device=device)
    b = torch.tensor(np.array(B), dtype=torch.float32, device=device)
    # this.thread.y = 行(i)，this.thread.x = 列(j)；N×N 个线程并行各算一个元素
    c = a @ b
    # 等待 GPU 异步计算完成后再停表
    if device.type == "mps":
        torch.mps.synchronize()
    elif device.type == "cuda":
        torch.cuda.synchronize()
    C = c.cpu().numpy()
    end = time.time()

    return {"C": C, "ms": int((end - start) * 1000)}

print(
    f"矩阵规模: {N} × {N}（每个结果元素需 {N} 次乘加，"
    f"总计 {(N * N * N / 1e9):.2f} GFLOP 级）\n"
)

cpu = cpu_mat_mul()
print(f"[CPU] 耗时: {cpu['ms']} 毫秒, 校验和: {checksum(cpu['C'], N):.0f}")

gpu = gpu_mat_mul()
print(f"[GPU] 耗时: {gpu['ms']} 毫秒, 校验和: {checksum(gpu['C'], N):.0f}")

print(f"\n加速比 (CPU / GPU): {(cpu['ms'] / max(gpu['ms'], 1)):.1f}x")
