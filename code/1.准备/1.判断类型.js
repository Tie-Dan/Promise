// function isType(type) {
//   return function (content) {
//     return Object.prototype.toString.call(content) === `[object ${type}]`;
//   };
// }
// let isString = isType("String");



let isType = type => content =>
  Object.prototype.toString.call(content) === `[object ${type}]`;

let isString = isType("String");
console.log(isString("hello"));

let util = {}; // { isString: [Function], isNumber: [Function] }
//  方法有可能是错的 但是结果不会错
["String", "Number"].forEach(type => {
  util["is" + type] = isType(type);
});
console.log(util.isString("123"));