const toConvert = function (val, fn) {
    return fn(val);
}

const addStr = function (val) {
    return val + "很帅";
}


console.log(toConvert('123', Number)) // 123


console.log(toConvert('td', addStr)) // "td很帅"