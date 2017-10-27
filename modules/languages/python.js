var fs = require('fs');

module.exports = function (file_name, options) {
    return new Promise(function (resolve) {
        resolve({
            err: false,
            total: "executed the program"
        });
    });
};