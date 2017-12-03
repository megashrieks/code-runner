var fs = require("fs");
var exec = require("child_process").exec;
var terminate = require("terminate");
var isWindows = process.platform == "win32";
var outExtension = isWindows ? ".exe" : ".out";
var delCommand = isWindows ? "del" : "rm";
var executionPath = isWindows ? "" : "./";
var killed = false;
var global_timeouts = {
  start: 0,
  end: 0,
  at_terminate: 0,
  at_close: 0,
  time_taken: 0
};
module.exports = function(file_name, options, extension) {
  return new Promise(function(resolve) {
    exec(
      "g++ ./temp/" +
        file_name +
        extension +
        " -o temp/" +
        file_name +
        outExtension,
      function(err, out, serr) {
        if (err || serr || out) {
          var output = {
            err: true,
            total: err.message
          };
          resolve(output);
        } else {
          var output;
          global_timeouts.start = Date.now();
          global_timeouts.at_close = global_timeouts.at_terminate = -1;
          var program = exec(
            "cd temp && " + executionPath + file_name + outExtension,
            function(err, out, serr) {
              if (err && err.killed) {
                output = {
                  err: true,
                  total: "",
                  signal: err.signal
                };
              }
              if (serr) {
                output = {
                  err: true,
                  total: serr
                };
              } else {
                output = {
                  err: false,
                  total: out
                };
              }
            }
          );
          setTimeout(function() {
            terminate(program.pid, function(err) {
              global_timeouts.at_terminate = Date.now();
              fs.existsSync("./temp/" + file_name + outExtension) &&
                exec(
                  "cd temp && " + delCommand + " " + file_name + outExtension,
                  function() {}
                );
              killed = true;
              output = {
                err: true,
                total: "",
                killed: true,
                signal: "SIGKILL"
              };
            });
          }, options.timeout);
          program.stdin.write(options.input);
          program.stdin.end();
          program.on("close", function(err, code) {
            global_timeouts.at_close = Date.now();
            global_timeouts.end =
              global_timeouts.at_terminate == -1
                ? global_timeouts.at_close
                : Math.min(
                    global_timeouts.at_close,
                    global_timeouts.at_terminate
                  );
            global_timeouts.time_taken =
              global_timeouts.end - global_timeouts.start;
            fs.existsSync("./temp/" + file_name + outExtension) &&
              exec(
                "cd temp && " + delCommand + " " + file_name + outExtension,
                function() {}
              );
            if (code || !err)
              output = {
                err: true,
                total: output.total,
                killed: true,
                signal: code || "SIGKILL"
              };
            output.time = global_timeouts;
            resolve(output);
          });
        }
      }
    );
  });
};
