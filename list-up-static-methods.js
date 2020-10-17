function listUpStaticMethods(clazz) {
    let resultList = new Set();
    let staticMethodsNameList = Object.getOwnPropertyNames(clazz);

    for (let idx = 0; idx < staticMethodsNameList.length; idx++) {
        if (clazz[staticMethodsNameList[idx]].constructor === Function) {
            resultList.add(staticMethodsNameList[idx]);
        }
    }

    return resultList;
}

let resultList = listUpStaticMethods(Date);

console.log(Array.from(resultList));
