var runner = require('./modules/code_executor');

runner("#include<stdio.h>\nint main(){char s[5];scanf(\"%s\",s);printf(\"%s\",s);return 1;}","C",{
    input:"shrikanth"
}).then(function(data){
    console.log(data);
});