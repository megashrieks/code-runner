# Code-runner ![build](https://api.travis-ci.org/megashrieks/code-runner.svg?branch=master "build status")

Its an **online programming ide** for the compilation of simple programs, Mostly
used in competitive programming servers to run the code according to certain set
of rules.

## installation
`npm install code-runner`
 
 ### additional dependencies
  1. To run `C` or `C++` code in the module you must have `gcc` installed in your system.
  2. To run `python` code you must have `python` installed in your system.


## usage

```javascript
var runner = require('code-runner');
runner(code,options,function(err,data){
  //callback function
  ...
});
```

* `code` is the code to be executed.
* `options` is an object which should contain the following properties :
  1. `timeout` : time in ms, specifies the time after which the program must be
     terminated.
  2. `language` : the name of the language of the given code.
* `err` is the error passed to the callback function if there is an error while calling the function.
* `data` is the output passed to the callback function which contains the property
  1. `error` : error while executing the code.
  2. `total` : output of the code that ran.
