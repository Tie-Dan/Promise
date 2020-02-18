/* 
    如果Promise里面有异步操作 刚刚写就不行了 会返回空 
*/
let Promise = require('./promise2')
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('xxx')
    }, 1000);
})
/* 
发布订阅者模式实现: 
    把then里面的成功和失败分别存到数组中
    而且支持一个promise可以then多次
 */

promise.then((data) => {
    console.log('res', data)
}, (err) => {
    console.log(err)
})