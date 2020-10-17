function listUpStaticMethods(instance) {
    let resultList = new Set();
    if (typeof(instance) !== 'object') {
        return
    }

    // デフォルトはオブジェクトで取りに行く
    let staticMethodsNameList = Object.getOwnPropertyNames(instance);

    if(staticMethodsNameList.length === 0) {
        // デフォで取れない場合はファンクション型で取りに行く
        staticMethodsNameList = Object.getOwnPropertyNames(instance.constructor);
    }

    for (let idx = 0; idx < staticMethodsNameList.length; idx++) {
        resultList.add(staticMethodsNameList[idx]);
    }

    return resultList;
}

let resultList

resultList = listUpStaticMethods(new Date());

console.log(Array.from(resultList));

resultList = listUpStaticMethods(window);

console.log(Array.from(resultList));
