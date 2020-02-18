// 比如在说话之前 去干一些事情 说话之前先刷牙
function say(who) {
  console.log("say", who);
}
Function.prototype.before = function(callback) {
  // 箭头函数中没有this 没有arguments
  return (...who) => {
    // newSay 箭头函数中没有this指向 会向上级作用域查找
    callback();
    this(...who); // 谁调用了before this就是谁 所以现在this是say
  };
};
let newSay = say.before(function() {
  console.log("刷牙");
});
newSay("我");
