var fs = require('fs');
var exec = require('child_process').exec;
module.exports = function (file_name, options, extension) {
    return new Promise(function (resolve) {
        var output;
        var program = exec('python ./temp/'+file_name + '.py', {
            timeout: options.timeout,
            killSignal: 'SIGINT'
        }, function (err, out, serr) {
            if (err) {
                output = {
                    err: true,
                    total: err.message,
                    status:err.signal,
                    killed:err.killed
                };
                resolve(output);
            }
            if (serr) {
                output = {
                    err: true,
                    total: serr
                };
                resolve(output);
            } else {
                output = {
                    err: false,
                    total: out
                };
                resolve(output);
            }
        });
        program.stdin.write(options.input);
        program.stdin.end();
    });
};