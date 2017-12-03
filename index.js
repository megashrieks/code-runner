var runner = require("./modules/code-runner");
runner(
  `#include <stdio.h>
  int main(){
    char s[5];
    scanf("%s",s);
    printf("%s",s);
    return 1;
  }`,
  {
    language: "C"
  },
  function(err, data) {
    if (err) throw err;
    console.log(data);
  }
);
