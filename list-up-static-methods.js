function getClass(className) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  return Function('return (' + className + ')')()
}

async function listUpStaticMethods(className) {
  // listUpStaticMethods("Date")
  // listUpStaticMethods("Array")
  // listUpStaticMethods("String")
  // listUpStaticMethods("Window")
  // listUpStaticMethods("Math")
  let resultList = new Set()
  let targetClass = getClass(className)
  let staticMethodsNameList = Object.getOwnPropertyNames(targetClass)

  for (let idx = 0; idx < staticMethodsNameList.length; idx++) {
    resultList.add(staticMethodsNameList[idx])
  }

  return Array.from(resultList)
}

let targetClassName = prompt('List Up Static Methods. Please Input Class Name. Ex.) Date Array String Window Math')

listUpStaticMethods(targetClassName).then(function (resultList) {
  console.log(resultList)
})
