var fs = require('fs');
var exec = require('child_process').exec;
var os = require('os');
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
                        timeout:100,
                        killSignal:'SIGINT'
                }, function (err, out, serr) {
                    if (err && err.killed) {
                        output = {
                            err: true,
                            total: err.signal
                        };
                        resolve(output);
                    }
                    if(serr){
                        output = {
                            err:true,
                            total:serr
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
                setTimeout(function () {
                    program.kill('SIGINT');
                },10);
                program.on('close',function(){
                    console.log(":"+program.pid+":");
                    fs.unlink(file_name + '.exe', function (err) {
                        if (err) console.log("closed : " + err);
                    });
                });
            }
        })
    });
};