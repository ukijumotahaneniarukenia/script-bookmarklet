function getClass(className) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  return Function('return (' + className + ')')()
}

async function listUpInstanceMethods(className) {
  // listUpInstanceMethods("Date")
  // listUpInstanceMethods("Array")
  // listUpInstanceMethods("String")
  // listUpInstanceMethods("Window")
  // listUpInstanceMethods("Math")
  let resultList = new Set()
  let targetClass = getClass(className)
  let targetInstance
  try {
    targetInstance = new targetClass()
  } catch (error) {
    try {
      targetInstance = Object.create(targetClass.prototype)
    } catch (error) {
      targetInstance = Object.create(targetClass)
    }
  }
  // グローバルなオブジェクトも受け取れるようにインスタンスからプロトタイプを逆引き
  let instanceMethodsNameList = Object.getOwnPropertyNames(Object.getPrototypeOf(targetInstance))

  for (let idx = 0; idx < instanceMethodsNameList.length; idx++) {
    resultList.add(instanceMethodsNameList[idx])
  }

  return Array.from(resultList)
}

let targetClassName = prompt('List Up Instance Methods. Please Input Class Name. Ex.) Date Array String Window Math')

listUpInstanceMethods(targetClassName).then(function (resultList) {
  console.log(resultList)
})
