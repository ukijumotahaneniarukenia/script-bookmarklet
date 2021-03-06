// 元ネタ https://www.perimeterx.com/tech-blog/2019/list-every-event-that-exists-in-the-browser/
// テキストベース https://medium.com/@weizmangal/list-every-event-that-exists-in-the-browser-b771579d9b04
// https://stackoverflow.com/questions/31054910/get-functions-methods-of-a-class
// https://stackoverflow.com/questions/31158902/is-it-possible-to-sort-a-es6-map-object/51242261
// https://stackoverflow.com/questions/30158515/list-down-all-prototype-properties-of-an-javascript-object
function sortMapKey(targetMap) {
  return new Map([...targetMap.entries()].sort())
}

function main(targetPrototypeName) {
  let resultMap = new Map()

  let windowDefinedPropertyList = Object.getOwnPropertyNames(window)

  for (let i = 0; i < windowDefinedPropertyList.length; i++) {
    const windowDefinedProperty = windowDefinedPropertyList[i]

    if (windowDefinedProperty !== targetPrototypeName) {
      continue
    }

    try {
      const windowDefinedObject = window[windowDefinedProperty]
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
      resultMap.set(windowDefinedProperty, Object.getOwnPropertyNames(windowDefinedObject['prototype']))
    } catch (error) {}
  }

  console.log(sortMapKey(resultMap))
}

// https://developer.mozilla.org/ja/docs/Web/API#interfaces
main('HTMLElement')
main('Window')
main('Document')
main('Math')
main('Date')
main('Array')
main('String')
main('XMLHttpRequest')
main('HTMLElement')
main('HTMLVideoElement')
main('HTMLScriptElement')
main('HTMLMediaElement')
