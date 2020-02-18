/* 
    resolve（成功的内容）
    reject（失败的内容）
    不传内容返回undefined
    状态只能有一种 不能即触发成功又触发失败
*/
let Promise = require('./promise1')
let promise = new Promise((resolve, reject) => {
    // resolve('resolve')
    reject('val')
})
promise.then((data) => {
    // onfulfilled 成功
    console.log('res' + data)
}, (err) => {
    // onrejected 失败
    console.log(err)
})