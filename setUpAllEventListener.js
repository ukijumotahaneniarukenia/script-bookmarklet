// https://github.com/alex2844/js-events

function eventCatchLogger(event) {
  console.log(event.type, event)
}

let allEventList = [document, window]
  .map((item) => {
    return Object.keys(item).filter((property) => /^on/.test(property))
  })
  .reduce((result, item) => {
    return result.concat(Array.from(new Set(item)))
  })

allEventList.map((event) => {
  document.body.addEventListener(event.slice(2), eventCatchLogger, false)
})
