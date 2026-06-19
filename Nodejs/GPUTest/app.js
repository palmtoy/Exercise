const { GPU } = require('gpu.js');

// 矩阵乘法对比：C = A × B（均为 N×N）
// 这是 GPU 的典型优势场景——高算术强度：每个输出元素要做 N 次乘加，
// 数据复用率高，几千个核心可以同时各算一个元素。
const N = 1024 * 2;

// ---- 准备两个 N×N 矩阵（用普通二维数组，gpu.js 对 2D 输入最友好）----
function makeMatrix(n) {
    const m = [];
    for (let i = 0; i < n; i++) {
        const row = new Float32Array(n);
        for (let j = 0; j < n; j++) {
            // 用确定性的值填充，避免依赖随机数，且两版输入完全一致
            row[j] = ((i * 31 + j * 17) % 100) / 10;
        }
        m.push(row);
    }
    return m;
}

const A = makeMatrix(N);
const B = makeMatrix(N);

// 简单校验和：对比 GPU / CPU 结果是否一致（Float32 下允许微小误差）
function checksum(C, n) {
    let s = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) s += C[i][j];
    }
    return s;
}

// ======================= CPU 版：三重循环 =======================
function cpuMatMul() {
    const start = Date.now();
    const C = [];
    for (let i = 0; i < N; i++) {
        const row = new Float32Array(N);
        for (let j = 0; j < N; j++) {
            let sum = 0;
            for (let k = 0; k < N; k++) {
                sum += A[i][k] * B[k][j];
            }
            row[j] = sum;
        }
        C.push(row);
    }
    const end = Date.now();
    return { C, ms: end - start };
}

// ======================= GPU 版：每线程算一个 C[y][x] =======================
function gpuMatMul() {
    const gpu = new GPU();
    console.log('\nbackend:', gpu.mode);

    const matMul = gpu.createKernel(function (a, b) {
        let sum = 0;
        for (let k = 0; k < this.constants.N; k++) {
            // this.thread.y = 行(i)，this.thread.x = 列(j)
            sum += a[this.thread.y][k] * b[k][this.thread.x];
        }
        return sum;
    }, {
        constants: { N },
        output: [N, N],          // 输出 N×N，共 N*N 个线程并行
        loopMaxIterations: N,
    });

    // 将着色器编译 / 显存分配的一次性开销纳入计时
    const start = Date.now();
    const C = matMul(A, B);
    const end = Date.now();

    const result = { C, ms: end - start };
    gpu.destroy();
    return result;
}

console.log(`矩阵规模: ${N} × ${N}（每个结果元素需 ${N} 次乘加，总计 ${(N * N * N / 1e9).toFixed(2)} GFLOP 级）\n`);

const cpu = cpuMatMul();
console.log(`[CPU] 耗时: ${cpu.ms} 毫秒, 校验和: ${checksum(cpu.C, N).toFixed(0)}`);

const gpu = gpuMatMul();
console.log(`[GPU] 耗时: ${gpu.ms} 毫秒, 校验和: ${checksum(gpu.C, N).toFixed(0)}`);

console.log(`\n加速比 (CPU / GPU): ${(cpu.ms / Math.max(gpu.ms, 1)).toFixed(1)}x`);
