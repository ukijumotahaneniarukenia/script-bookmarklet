function getClass(className) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  // http://nmi.jp/archives/488
  return new Function('return (' + className + ')')()
}

function listUpInstanceMethods(className) {
  let resultList = new Set()
  let targetClass = getClass(className)
  let targetInstance
  try {
    targetInstance = new targetClass()
    console.log('unko')
  } catch (error) {
    try {
      targetInstance = Object.create(targetClass.prototype)
      console.log('unkomorimori')
    } catch (error) {
      targetInstance = Object.create(targetClass)
      console.log('unkomorimoriougai')
    }
  }
  let instanceMethodsNameList = Object.getOwnPropertyNames(Object.getPrototypeOf(targetInstance))

  for (let idx = 0; idx < instanceMethodsNameList.length; idx++) {
    resultList.add(instanceMethodsNameList[idx])
  }

  return Array.from(resultList)
}

function main(targetClassName) {
  let eventList = listUpInstanceMethods(targetClassName)
  console.log(eventList)
}

// https://developer.mozilla.org/ja/docs/Web/API/GlobalEventHandlers
//https://developer.mozilla.org/ja/docs/Web/API#interfaces
// ドキュメントの読み方ではコンストラクタがあるかないかで分類
// あればnewできて、なければnewできない
main('UIEvent')
main('Navigator')
main('MediaStream')
