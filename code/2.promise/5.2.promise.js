let util = require('util');
let fs = require('fs');
let read = util.promisify(fs.readFile)
// all 方法最终返回的是一个promise
// 如果全成功了 才算成功 如果一个失败了 就失败了
function isPromise(x) {
    if (typeof x === 'object' && x != null || typeof x == 'function') {
        if (typeof x.then === 'function') {
            return true
        }
    }
    return false
}
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let idx = 0;
        let processData = (value, index) => {
            arr[index] = value
            if (++idx === promises.length) {
                resolve(arr);
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let currentValue = promises[i]
            if (isPromise(currentValue)) {
                currentValue.then((y) => {
                    processData(y, i)
                }, reject)
            } else {
                processData(currentValue, i)
            }
        }
    })
}
// Promise.all 特点就是 让所有promise并发执行 根据执行个数判断是否执行完成
Promise.all([1, read('./name.txt', 'utf8'), 2, read('./age.txt', 'utf8'), 3]).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})