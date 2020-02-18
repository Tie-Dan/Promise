/* 
Promise类系统自带,类中需要传入一个executor执行器，默认立即执行
Promise类内部会提供两个方法 resolve（成功）、reject（失败） ,可以更改promise的3个状态: （等待、成功、失败）
 */
// 宏变量 
const PENDING = 'PENDING' // 等待
const RESOLVE = 'RESOLVE' // 成功
const REJECT = 'REJECT' // 失败
class Promise {
    constructor(executor) {
        this.status = PENDING // 默认是等待状态
        this.value = undefined // 成功的原因
        this.reason = undefined // 失败的原因
        /* 
        只有在pending状态下 才会转向成功或者失败
        保证状态只有pending下 才能改变
        */
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVE
            }

        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECT
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
    then(onfulfilled, onrejected) {
        if (this.status === RESOLVE) {
            onfulfilled(this.value)
        }
        if (this.status === REJECT) {
            onrejected(this.reason)
        }
    }
}
module.exports = Promise