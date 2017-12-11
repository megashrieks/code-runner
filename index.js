var runner = require("./modules/code-runner");
// runner(
//   `#include <stdio.h>
//   int main(){
//     char s[5];
//     while(true);
//     return 1;
//   }`,
//   {
//     language: "C",
//     timeout:100
//   },
//   function(err, data) {
//     if (err) throw err;
//     console.log(data);
//   }
// );
exports["code-runner"] = runner;
