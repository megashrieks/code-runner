var fs = require('fs');
var exec = require('child_process').exec;
var terminate = require('terminate');
var isWindows = process.platform == "win32";
var outExtension = isWindows ? ".exe" : ".out";
var delCommand = isWindows ? "del" : "rm";
var executionPath = isWindows ? "":"./";
var killed = false;
module.exports = function (file_name, options,extension) {
    return new Promise(function (resolve) {
        exec('g++ ./temp/'+file_name+extension+' -o temp/'+file_name+outExtension,function(err,out,serr){
            if(err || serr || out){
                var output = {
                    err:true,
                    total:err.message
                }
                resolve(output);
            } else {
                var output;
                var program = exec('cd temp && '+executionPath+file_name+outExtension, function (err, out, serr) {
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
                        fs.existsSync('./temp/' + file_name + outExtension) && exec('cd temp && '+delCommand+' ' + file_name + outExtension,console.log);
			killed = true;
                        output = {
                            err: true,
                            total: '',
                            killed:true,
			    signal:"SIGKILL"
                        };
                    });
                }, options.timeout);
                program.stdin.write(options.input);
                program.stdin.end();
                program.on('close',function(err,code){
                    fs.existsSync('./temp/'+file_name+outExtension)&&exec('cd temp && '+delCommand+' '+file_name+outExtension,function(){});
		    if(code)
		    	output = {
                            err: true,
                            total: '',
                            killed:true,
			    signal:code
			};
                    resolve(output);
                });
            }
        })
    });
};
