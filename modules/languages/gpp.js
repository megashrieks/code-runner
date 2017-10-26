var fs = require('fs');

module.exports = function (language, code, options) {
    return new Promise(function (resolve) {
        resolve({
            err: false,
            total: "executed the program"
        });
    });
};