function calc(val){
    let arrValue = val.toString().split('').reverse()

    let newArrValue = []
    for (let i = 0; i < arrValue.length; i++) {
        let data = ''
        if((i + 1) % 3 === 0 && i !== arrValue.length - 1){
            data += '.'
        }
        newArrValue.push(data + arrValue[i])
    }
    newArrValue.reverse()

    return `Rp ${newArrValue.join('')},00`
}

// console.log(calc(250000))
module.exports = calc