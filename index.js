var runner = require('./modules/code_executor');

runner("#include <stdio.h>\nint main(){while(true){printf(\"yo\");}return 1;}","C",{
    input:"shrikanth",
    timeout:100
}).then(function(data){
    console.error(data);
});