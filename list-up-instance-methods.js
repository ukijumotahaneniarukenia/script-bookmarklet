function listUpInstanceMethods(clazz) {
    let resultList = new Set();
    let instanceMethodsNameList = Object.getOwnPropertyNames(clazz.prototype);

    for (let idx = 0; idx < instanceMethodsNameList.length; idx++) {
        resultList.add(instanceMethodsNameList[idx]);
    }

    return resultList;
}

let resultList = listUpInstanceMethods(Date);

console.log(Array.from(resultList));
