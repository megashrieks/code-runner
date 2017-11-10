var python = require('./languages/python');
var gpp = require('./languages/gpp');
var fs = require('fs');
var path = require('path');

module.exports = function(code,options,cb){
    //define the extension and their compilers
    var file_types = {
        "Python":{
            extension:'py',
            compiler:python
        },
        "C": {
            extension: 'c',
            compiler:gpp
        },
        "C++": {
            extension: 'cpp',
            compiler:gpp
        },
    };
    if(!options){
        cb(new Error("options not specified"),'');
        return;
    }
    if (!file_types[options.language]) {
        cb(new Error("unknown language"), '');
        return;
    }
    var extension = '.' + file_types[options.language].extension;
    var compiler = file_types[options.language].compiler;
    //file name for the code file
    var file_name = random_string();
    //create a file with code on it
    fs.mkdir('./temp/',function(err){
        // if(err) throw err;
        fs.writeFile('./temp/' + file_name + extension, code, function (err) {
            if (err) throw err;
            //execute the file with the respective compiler
            var output = compiler(file_name, options, extension);
            //delete the file after it is used
            output.then(function (out) {
                fs.unlink('./temp/' + file_name + extension, function (err) {
                    if (err) throw err;
                });
                cb(null, out);
            });
        });
    });
}

function random_string(post_str) {
    post_str = post_str ? post_str : '';
    var name = Math.random().toString(36).substr(2) + post_str;
    while (fs.existsSync(name))
        name = Math.random().toString(36).substr(2) + post_str;
    return name;
}