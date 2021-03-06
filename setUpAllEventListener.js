// https://github.com/alex2844/js-events
// https://stackoverflow.com/questions/30158515/list-down-all-prototype-properties-of-an-javascript-object
function getAllPropertyList(obj, resultList) {
  if (obj === null) {
    return Array.from(new Set(resultList))
  }
  resultList.push(...Object.getOwnPropertyNames(obj))
  getAllPropertyList(Object.getPrototypeOf(obj), resultList)
}

function dumpEventInfo(event, whatYouWant) {
  whatYouWant = whatYouWant || 'number'
  let propertyNameList = new Array()
  getAllPropertyList(event, propertyNameList)
  let resultInfo = {}
  for (let index = 0; index < propertyNameList.length; index++) {
    const propertyName = propertyNameList[index]
    let propertyType = typeof event[propertyName]
    if (propertyType !== 'function') {
      if (propertyType === 'number' && whatYouWant === 'number') {
        resultInfo = Object.assign(resultInfo, {
          eventName: event.type,
          [propertyName]: event[propertyName],
        })
      }
      if (propertyType === 'boolean' && whatYouWant === 'boolean') {
        resultInfo = Object.assign(resultInfo, {
          eventName: event.type,
          [propertyName]: event[propertyName],
        })
      }
      if (propertyType === 'object' && whatYouWant === 'object') {
        // 挙動がなぞなので、ハンドリング
        resultInfo = Object.assign(resultInfo, {
          eventName: event.type,
          [propertyName]: event[propertyName],
        })
      }
    }
  }
  if (whatYouWant === 'object') {
    let newResultInfo = {}
    for (let resultKey in resultInfo) {
      try {
        let resultType = typeof resultInfo[resultKey]
        if (resultType === 'object' || resultKey === 'eventName') {
          newResultInfo[resultKey] = resultInfo[resultKey]
        }
      } catch (error) {}
    }
    resultInfo = newResultInfo
  }
  console.log(resultInfo)
}

let allEventList = [document, window]
  .map((item) => {
    return Object.keys(item).filter((property) => /^on/.test(property))
  })
  .reduce((result, item) => {
    return result.concat(Array.from(new Set(item)))
  })

allEventList.map((event) => {
  document.body.addEventListener(
    event.slice(2),
    (event) => {
      dumpEventInfo(event)
      dumpEventInfo(event, 'boolean')
      dumpEventInfo(event, 'object')
    },
    false
  )
})
