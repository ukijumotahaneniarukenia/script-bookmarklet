// おすすめの実行対象サイト
// https://www.youtube.com/
// https://www.nytimes.com/interactive/2020/09/09/world/middleeast/beirut-explosion.html

let result = [document, window]
  .concat([...document.querySelectorAll('*')])
  .map((targetElement) => {
    let targetEventListenerList = getEventListeners(targetElement)
    return {
      element: targetElement,
      eventList: Object.keys(targetEventListenerList).join(','),
      eventListCount: Object.keys(targetEventListenerList).length,
      eventListenerList: targetEventListenerList,
    }
  })
  .filter((item) => {
    return item.eventList.length !== 0
  })
// console.log(result)
console.table(result)
