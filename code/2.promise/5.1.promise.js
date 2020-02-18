let fs = require('fs')
let Promise = require('./promise5')

// function read(...args) {
//     let dfd = Promise.defer() // 延迟对象 可以解决promise嵌套的问题 ng1
//     fs.readFile(...args, function (err, data) {
//         if (err) dfd.reject(err)
//         dfd.resolve(data)
//     })
//     return dfd.promise
// }


// let {
//     promisify
// } = require('util');

// 手动实现promisify
function promisify(fn) {
    return function (...args) { // readFile
        return new Promise((resolve, reject) => {
            // fs.readFile('./name.txt','utf-8')
            fn(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

// 直接将异步的node方法转化成promise方法
let readFile = promisify(fs.readFile);

readFile('./name.txt', 'utf8').then(data => {
    return readFile(data, 'utf8')
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})