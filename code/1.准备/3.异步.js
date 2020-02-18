let fs = require("fs");
function after(times, callback) {
  let renderObj = {};
  return function(key, value) {
    renderObj[key] = value;
    if (--times == 0) {
      // times 永远取的是外层作用域下的变量
      callback(renderObj);
    }
  };
}
let out = after(2, function(renderObj) {
  console.log(renderObj);
});
fs.readFile("./age.txt", "utf8", function(error, data) {
  out("age", data);
});
fs.readFile("./name.txt", "utf8", function(error, data) {
  out("name", data);
});
