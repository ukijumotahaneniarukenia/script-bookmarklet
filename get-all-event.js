// https://github.com/alex2844/js-events
let allEventList = Object.keys(window).filter(key => /^on/.test(key))
console.log(allEventList)
