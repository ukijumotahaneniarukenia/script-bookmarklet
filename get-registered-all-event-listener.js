// https://developers.google.com/web/tools/chrome-devtools/console/utilities#geteventlisteners

// ドキュメントオブジェクトに登録されているすべてのイベントリスナーをリストアップ
let registeredEventList = getEventListeners(document)

console.log(registeredEventList)

// 指定したオブジェクトに登録されているすべてのイベントリスナーをリストアップ
let targetDom = document.querySelector('form')

let registeredEventList2 = getEventListeners(targetDom)

console.log(registeredEventList2)
