let fs = require("fs");
// on是订阅 emit是发布
let e = {
  _obj: {},
  _callback: [],
  on(callback) {
    // 订阅一件事 当这件事发生的时候 触发对应的函数
    // 订阅 就是将函数放到数组中
    this._callback.push(callback);
  },
  emit(key, value) {
    this._obj[key] = value; // 让订阅的数组中的方法，依次执行
    this._callback.forEach(method => {
      method(this._obj);
    });
  }
};
// 只要发布了就执行以下
e.on(function(obj) {
  // 每次发布都会触发此函数
  console.log("获取一个");
});
e.on(function(obj) {
  // 每次发布都会触发此函数
  if (Object.key(obj).length === 2) {
    // 用户根据结果决定输出
    console.log(obj);
  }
});
fs.readFile("./age.txt", "utf8", function(error, data) {
  e.emit("age", data);
});
fs.readFile("./name.txt", "utf8", function(error, data) {
  e.emit("name", data);
});
