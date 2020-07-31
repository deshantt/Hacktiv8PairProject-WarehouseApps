function firstToCaps(string){
    let arrValue = string.split(' ')

    let result = []
    for (let i = 0; i < arrValue.length; i++) {
        result.push(arrValue[i].charAt(0).toUpperCase() + arrValue[i].slice(1))   
    }

    return result.join(' ')
}

module.exports = firstToCaps