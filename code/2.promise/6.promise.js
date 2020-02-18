let Promise = require('./promise6')
// let p = new Promise((resolve, reject) => {
//     // resolve返回promise进行判断
//     resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(100)
//         }, 1000);
//     }))
// })

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(value)
    })
}
Promise.reject = function (value) {
    return new Promise((resolve, reject) => {
        reject(value)
    })
}
Promise.reject(100).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})