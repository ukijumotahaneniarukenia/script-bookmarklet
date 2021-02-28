// ゴミ箱へ移動
// https://ja.javascript.info/bubbling-and-capturing
let targetDom = document.getElementById('bulk-action-selector-top')

targetDom.options[4].selected = true

let checkBoxInput = document.getElementById('cb-select-all-1')

checkBoxInput.click()

let submitButton = document.getElementById('doaction')

let mouseEvent = document.createEvent('MouseEvents')
mouseEvent.initEvent('click', false, true)
submitButton.dispatchEvent(mouseEvent)
