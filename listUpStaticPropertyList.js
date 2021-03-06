function getClass(targetPrototypeName) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/eval#Don't_use_eval_needlessly!
  return Function('return (' + targetPrototypeName + ')')()
}

function getStaticPropertyList(targetPrototypeName) {
  let resultList = new Set()
  let targetPrototype = getClass(targetPrototypeName)
  let staticMethodsNameList = Object.getOwnPropertyNames(targetPrototype)

  for (let idx = 0; idx < staticMethodsNameList.length; idx++) {
    resultList.add(staticMethodsNameList[idx])
  }

  return Array.from(resultList)
}

function main(targetPrototypeName) {
  let resultList = getStaticPropertyList(targetPrototypeName)
  let item = {
    prototypeName: targetPrototypeName,
    staticPropertyList: resultList,
  }
  console.log(item)
}

// プロトタイプなのかインターフェースなのかどっちで呼ぶべきか
// main('HTMLElement')
// main('Window')
// main('Document')
// main('Math')
// main('Date')
// main('Array')
// main('String')
// main('XMLHttpRequest')
// main('HTMLElement')
// main('HTMLVideoElement')
// main('HTMLScriptElement')
// main('HTMLMediaElement')
main('TextRange')
