var fs = require('fs');
var exec = require('child_process').exec;
var terminate = require('terminate');
module.exports = function (file_name, options,extension) {
    return new Promise(function (resolve) {
        exec('g++ ./temp/'+file_name+extension+' -o '+file_name,function(err,out,serr){
            if(err || serr || out){
                var output = {
                    err:true,
                    total:err.message
                }
                resolve(output);
            } else {
                var output;
                var program = exec(file_name+'.exe',{
                        // timeout:options.timeout,
                        // killSignal:'SIGINT'
                }, function (err, out, serr) {
                    if (err && err.killed) {
                        output = {
                            err: true,
                            total: err.signal
                        };
                    }
                    if(serr){
                        output = {
                            err:true,
                            total:serr
                        };
                    } else {
                        output = {
                            err: false,
                            total: out
                        };
                    }
                    });
                setTimeout(function () {
                    terminate(program.pid,function(err){
                        fs.existsSync(file_name + '.exe') && fs.unlink(file_name + '.exe', function () { });
                        output = {
                            err: true,
                            total: '',
                            killed:true
                        };
                    });
                }, options.timeout);
                program.stdin.write(options.input);
                program.stdin.end();
                program.on('close',function(){
                    fs.existsSync(file_name+'.exe') && fs.unlink(file_name + '.exe',function(){});
                    resolve(output);
                });
            }
        })
    });
};