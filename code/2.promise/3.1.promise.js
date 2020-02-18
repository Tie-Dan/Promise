// promise 可以解决链式调用问题 then.then
let promise = new Promise((resolve, reject) => {
    resolve('hello')
})
promise.then(data => {
    // then方法中可以返回一个值（不是promise）会把这个结果放到以下一次then的成功回调中
    return data
}).then((data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        // 如果返回的是一个promise 那么会采用这个promise的结果 成功走成功 失败走失败
        setTimeout(() => {
            // resolve('resolve')
            reject('reject')
        }, 1000)
    })
}).then(data => {
    console.log(data)
}, (err) => {
    console.log(err)
    // 如果在失败的函数中返回的是普通值或者是成功的promise,会走下一个then的成功函数

    // return 123
    return new Promise((resolve, reject) => {
        // resolve('resolve')
        reject('reject')
    })
}).then((data) => {
    console.log(data)
    console.log('成功')

}, (err) => {
    console.log(err)
}).then(() => {
    // 如果成功里面有失败会走下一个失败
    throw new Eroor('失败了')
}, (err) => {
    console.log('失败了')
}).then(() => {

}, (err) => {
    console.log('失败了')
})