let Promise = require('./promise3')
const promise = new Promise((resolve, reject) => {
    resolve('hello')
})

/* 
成功 then中返回一个普通值或者一个promise（成功的）
失败 返回的是一个失败的promise 抛出异常也会走是失败
*/
let promise2 = promise.then(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
        }, 1000);
    })
})
promise2.then((data) => {
    console.log(data)
})