const fs = require('fs')
const util = require('util')
let read = util.promisify(fs.readFile)

function* readAge() {
    let content = yield read('./name.txt', 'utf8')
    let age = yield {}
    return age;
}

function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let {
                value,
                done
            } = it.next(data)
            if (done) {
                resolve(value)
            } else {
                Promise.resolve(value).then(data => {
                    next(data);
                }, reject)
            }
        }
        next()
    })
}
// 依次执行生成器 不停的调用next方法 将最终结果返回
co(readAge()).then(data => {
    console.log(data)
})