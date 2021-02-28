// サイトによってはユーザーにポップアップを許可してもらう必要がある
let targetUrlList = [
  '',
  // 'https://data.city.kyoto.lg.jp/',
  // 'https://reverseengineering.stackexchange.com/',
  // 'https://qiita.com/danishi/items/42d8adf6291515e62284'
]

let executeScript = 'console.log("うんこ")'

let targetUrlListCnt = targetUrlList.length

for (let index = 0; index < targetUrlListCnt; index++) {
  let targetUrl = targetUrlList[index]
  let newWindowName = 'PopUp' + String(index)
  let newWindow = window.open(targetUrl, newWindowName, 'scrollbars=1,menubar=1,resizable=1,width=300,height=400,left=100,top=100') // can open
  console.log(newWindow)
  let targetScript = document.createElement('script')
  targetScript.textContent = executeScript
  newWindow.document.head.appendChild(targetScript)
}
