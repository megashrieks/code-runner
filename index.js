var runner = require('./modules/code_executor');

runner("hi","C").then(function(data){
    console.log(data);
});