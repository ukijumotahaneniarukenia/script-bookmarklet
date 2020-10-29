let targetTableXpath = prompt(
    "Please Input TargetTableXpath"
)

if (targetTableXpath === undefined || targetTableXpath === '') {
    alert('Must Input TargetTableXpath')
    (function(){
        return
    })()
}

let downLoadFileName = prompt(
    "Please Input DownLoadFileName"
)

let targetTableDom = document.evaluate(targetTableXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)

// 対象DOMテーブルに一意のIDを付番
targetTableDom.setAttribute('id', 'targetTableId')

// ライブラリの読み込み
// https://www.npmjs.com/package/excellentexport
let scriptLibrary = document.createElement('script')
scriptLibrary.setAttribute('type', 'text/javascript')
scriptLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/excellentexport@3.4.3/dist/excellentexport.min.js')
document.head.appendChild(scriptLibrary)

let downloadButton = document.createElement('a')

if (downLoadFileName === undefined || downLoadFileName === '') {
    downLoadFileName = 'sample.csv'
}

downloadButton.setAttribute('download', downLoadFileName)

downloadButton.setAttribute('href', '#')

downloadButton.setAttribute('onclick', "return ExcellentExport.csv(this, 'targetTableId');")

downloadButton.click()

downloadButton.remove()
