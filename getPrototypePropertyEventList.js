// 元ネタ https://www.perimeterx.com/tech-blog/2019/list-every-event-that-exists-in-the-browser/
// テキストベース https://medium.com/@weizmangal/list-every-event-that-exists-in-the-browser-b771579d9b04
// https://stackoverflow.com/questions/31054910/get-functions-methods-of-a-class
// https://stackoverflow.com/questions/31158902/is-it-possible-to-sort-a-es6-map-object/51242261
function sortMapKey(targetMap) {
  return new Map([...targetMap.entries()].sort())
}

function main(targetKeyword) {
  let resultMap = new Map()

  let windowDefinedPropertyList = Object.getOwnPropertyNames(window)

  for (let i = 0; i < windowDefinedPropertyList.length; i++) {
    const windowDefinedProperty = windowDefinedPropertyList[i]
    try {
      const windowDefinedObject = window[windowDefinedProperty]
      let matchKeywordList = Object.getOwnPropertyNames(windowDefinedObject['prototype']).filter((propertyName) => {
        let regexp = new RegExp(targetKeyword + '(.*?)', 'g')
        return propertyName.match(regexp) !== null
      })
      if (matchKeywordList.length !== 0) {
        resultMap.set(windowDefinedProperty, matchKeywordList)
      }
    } catch (error) {}
  }
  return sortMapKey(resultMap)
}

// main('duration')
main('loadstart')
