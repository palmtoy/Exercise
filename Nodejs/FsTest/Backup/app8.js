// 导入包
var fs = require('fs');
// 打开或创建文件 文件名, 读写方式, 权限, 回调(错误, 文件句柄)
fs.open('temp_js', 'w+', 0666, function(err, fd){
    // 错误检测
    if (err) throw err;
    // 写入buffer
    var b1 = new Buffer(100);
    // 向buffer写入数据，并获得写入长度
    var bwl = b1.write('1234567890123456789012345678901234567890');
    // 写入文件数据 文件句柄, 写入数据buffer, buffer开始, 写入buffer长度, 写入文件位置, 回调(错误, 写入长度, 写入数据buffer)
    fs.write(fd, b1, 0, bwl, null, function(err, wl, b1c){
        // 错误检查
        if (err) throw err;
        // 读取buffer
        var b2 = new Buffer(100);
        // 读取文件数据 文件句柄, 读取数据buffer, buffer开始, 读取buffer长度, 读取文件位置, 回调(错误, 读取长度, 读取数据buffer)
        fs.read(fd, b2, 0, b2.length, 0, function(err, rl, b2c){
            // 打印读取数据
            console.log(b2c.toString('utf-8', 0, rl));
            // 关闭文件句柄
            fs.close(fd, function(){
                // 进行后续操作
            });
        });
    });
});
