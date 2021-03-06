function getClass(className) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  // http://nmi.jp/archives/488
  return new Function('return (' + className + ')')()
}

function listUpStaticMethods(className) {
  let resultList = new Set()
  let targetClass = getClass(className)
  let staticMethodsNameList = Object.getOwnPropertyNames(targetClass)

  for (let idx = 0; idx < staticMethodsNameList.length; idx++) {
    resultList.add(staticMethodsNameList[idx])
  }

  return Array.from(resultList)
}

function main(targetClassName) {
  let eventList = listUpStaticMethods(targetClassName)
  console.log(eventList)
}

main('MouseEvent')
