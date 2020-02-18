//  它编译出来的结果就是generator+co
async function test() {
    let r = await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('hello')
        }, 1000);
    })
    console.log(r)
}
test().catch(err => {
    console.log(err)
})