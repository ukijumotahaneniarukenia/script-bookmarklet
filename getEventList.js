// 元ネタ https://www.perimeterx.com/tech-blog/2019/list-every-event-that-exists-in-the-browser/
// テキストベース https://medium.com/@weizmangal/list-every-event-that-exists-in-the-browser-b771579d9b04
function getEventList(targetPrototypeObject) {
  // https://github.com/alex2844/js-events
  return Object.keys(targetPrototypeObject).filter((key) => /^on/.test(key))
}

function getPrototypeName(targetPrototypeObject) {
  return targetPrototypeObject.toString().slice(8).slice(0, -1)
}

// https://stackoverflow.com/questions/31158902/is-it-possible-to-sort-a-es6-map-object/51242261
function sortMapKey(targetMap) {
  return new Map([...targetMap.entries()].sort())
}

function main() {
  let resultMap = new Map()

  let windowDefinedPropertyList = Object.getOwnPropertyNames(window)

  for (let i = 0; i < windowDefinedPropertyList.length; i++) {
    const windowDefinedProperty = windowDefinedPropertyList[i]

    try {
      const windowDefinedObject = window[windowDefinedProperty]

      if (!windowDefinedObject || !windowDefinedObject['prototype']) {
        // windowにオブジェクトが未定義済みないしはプロトタイプが存在しないものはスキップ
        continue
      }

      let prototypeObject = windowDefinedObject['prototype']

      let eventList = getEventList(prototypeObject)
      if (eventList.length !== 0) {
        resultMap.set(getPrototypeName(prototypeObject), getEventList(prototypeObject))
      }
    } catch (error) {}
  }
  return sortMapKey(resultMap)
}

main()
