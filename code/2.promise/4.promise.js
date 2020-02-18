let Promise = require('./promise4')
const promise = new Promise((resolve, reject) => {
    resolve('hello')
})

let promise2 = promise.then(() => {
    return new Promise((resolve, reject) => {
        // 可能resolve出来的结果还是一个promise
        resolve(new Promise((resolve, reject) => {
            // 如果返回的是一个promise 那么会采用这个promise的结果 成功走成功 失败走失败
            setTimeout(() => {
                resolve(new Promise((resolve, reject) => {
                    // 如果返回的是一个promise 那么会采用这个promise的结果 成功走成功 失败走失败
                    setTimeout(() => {
                        resolve('hello')
                    }, 1000)
                }))
            }, 1000)

        }))
    })
})
promise2.then().then().then((data) => {
    console.log('sss' + data)
}, (err) => {
    console.log(err)
})