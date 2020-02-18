/* 
Promise类系统自带,类中需要传入一个executor执行器，默认立即执行
Promise类内部会提供两个方法 resolve（成功）、reject（失败） ,可以更改promise的3个状态: （等待、成功、失败）
 */
// 宏变量 
const PENDING = 'PENDING' // 等待
const RESOLVE = 'RESOLVE' // 成功
const REJECT = 'REJECT' // 失败

// 根据x判断是否是promise,根据其结果调用resolve,reject
function resolvePromise(promise2, x, resolve, reject) {
    // 此方法 为了兼容所有的promise，n个库中 执行的流程是一样的
    // 尽可能详细 不出错
    // 1.不能引用同一个对象 可能造成死循环
    if (promise2 === x) {
        return reject(new TypeError('不能引用同一个对象'))
    }
    let called;
    // 2.判断x的类型 x如果是对象或者函数 说明他有可能是一个promise
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        // 有可能是promise promise要有then方法
        // 但是调用then方法有可能的时候有可能异常
        try {
            let then = x.then; // 因为then方法 可能使用getter来定义的
            if (typeof then === 'function') {
                // 到这只能认为它是promise了
                // call 改变this指向x   只取一次
                /* 
                    let obj = {
                        then(){
                        
                        }
                    }
                    let fn = obj.then
                    fn.call(obj)
                */
                then.call(x, y => {
                    // 只取一次 当前promise解析出来的结果可能还是一个promise
                    // 继续解析知道它是一个普通值为止
                    // 利用解析resolve直到解析为普通值为止
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e) // 取值失败错误信息抛出去
        }

    } else {
        resolve(x)
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING // 默认是等待状态
        this.value = undefined // 成功的原因
        this.reason = undefined // 失败的原因
        // 专门存放成功的回调函数
        this.onResolveCallbacks = []
        // 专门存放失败的回调函数
        this.onRejectCallbacks = []
        /* 
        只有在pending状态下 才会转向成功或者失败
        保证状态只有pending下 才能改变
        */
        let resolve = (value) => {
            // 增加判断如果resolve传入的是promise的判断
            if (value instanceof Promise) { // 递归解析直到为普通值为止
                value.then(resolve, reject)
                return
            }

            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVE
                // 让成功的方法依次执行
                this.onResolveCallbacks.forEach(fn => fn())
            }

        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECT
                this.onRejectCallbacks.forEach(fn => fn())
            }

        }
        // 执行executor 传入成功和失败
        try {
            executor(resolve, reject) // 立即执行
        } catch (e) {
            console.log('catch' + e)
            reject(e); // 如果出现错误手动调用reject向下传递
        }
    }
    // catch 就是没有成功的then方法
    catch (errCallback) {
        return this.then(null, errCallback)
    }
    then(onfulfilled, onrejected) {
        // then里面不传值 给默认值
        onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : v => v;
        onrejected = typeof onrejected == 'function' ? onrejected : err => {
            throw err
        }
        // 为了实现链式调用每次返回新的promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVE) {
                /* 
                执行then中方法，可能返回时一个普通值或者是promise
                得判断x的类型是不是一个promise，如果是promise的话
                需要让这个promise执行，并且采用它的状态作为promise的成功或者失败
                */

                /* 
                不管成功失败只要出现 异常 就抛出到下一个then的失败
                */
                // 使用异步才能内部才能拿到promise2
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        // resolvePromise方法是判断返回值是不是promise
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        // 失败的返回值是普通值（不是promise）走下一个then的成功
                        let x = onrejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                // 这时候 executor是肯定有异步操作
                this.onResolveCallbacks.push(() => {
                    // TODO ...切面编程
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })
        return promise2 // 每次返回新的promise
    }
}
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise