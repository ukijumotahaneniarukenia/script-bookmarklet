function getClass(className) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  // http://nmi.jp/archives/488
  return Function('return (' + className + ')')()
}

function listUpInstanceMethods(className) {
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

function main(targetClassName) {
  let eventList = listUpInstanceMethods(targetClassName).filter((key) => /^on/.test(key))
  if (eventList.length === 0) {
    eventList = listUpInstanceMethods(targetClassName)
  }
  console.log(eventList)
}

// https://developer.mozilla.org/ja/docs/Web/API/GlobalEventHandlers
// main('HTMLElement')
// main('window')
// main('Document')
// main('Math')
// main('Date')
// main('Array')
// main('String')
main('XMLHttpRequest')
