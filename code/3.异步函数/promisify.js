const fs = require('fs')
// const util = require('util')
// let readFile = util.promisify(fs.readFile)

// 实现promisify

let promisify = (fn) => {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}

let readFile = promisify(fs.readFile)

readFile('./name.txt', 'utf-8').then(data => {
    return readFile(data, 'utf-8')
}).then(data => {
    console.log(data)
})