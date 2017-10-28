# Code-runner

Its an **online programming ide** for the compilation of simple programs,
Mostly used in competitive programming servers to run the code according to certain set of rules.

## usage

```javascript

var runner = require('runner');
runner(code,options,function(){
  //callback function
  ...
});

```

* `code` is the code to be executed.
* `options` is an object which should contain the following properties :
  1. `timeout`  : time in ms, specifies the time after which the program must be terminated.
  2. `language` : the name of the language of the given code.
