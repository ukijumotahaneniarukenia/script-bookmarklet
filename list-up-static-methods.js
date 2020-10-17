function listUpStaticMethods(instance) {
    let resultList = new Set();
    let staticMethodsNameList

    if (typeof(instance) === 'object') {
        // デフォルトはオブジェクトで取りに行く
        staticMethodsNameList = Object.getOwnPropertyNames(instance);

        if(staticMethodsNameList.length === 0) {
            // デフォで取れない場合はファンクション型で取りに行く
            staticMethodsNameList = Object.getOwnPropertyNames(instance.constructor);
        }

    } else if (typeof(instance) === 'function') {

        staticMethodsNameList = Object.getOwnPropertyNames(instance.prototype);

    } else {
        return
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

resultList = listUpStaticMethods(Array);

console.log(Array.from(resultList));
