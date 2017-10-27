var runner = require('./modules/code_executor');

runner("n = 0;\nwhile(True):n = n+1","Python",{
    input:"shrikanth",
    timeout:150
}).then(function(data){
    console.log(data);
});