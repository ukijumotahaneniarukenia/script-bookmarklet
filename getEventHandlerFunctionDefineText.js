// 実行サイトなど

// https://www.youtube.com/watch?v=G8WGFw3iUfE

const getEventHandlerFunctionDefineText = (targetEventName) => {
  let targetRegisteredEventHandlerInfo = getEventListeners(window)
  let eventHandlerInfoList = new Array()
  targetRegisteredEventHandlerInfo[targetEventName].map((item) => {
    let pushItem = {
      eventName: `${targetEventName}`,
      eventHandler: item.listener.toString(),
    }
    eventHandlerInfoList.push(pushItem)
  })
  return eventHandlerInfoList
}

const result = getEventHandlerFunctionDefineText('scroll')

console.log(result)
