async function main() {

    const targetTableXpath = await checkInputTargetTableXpath()

    console.log(targetTableXpath)

    const downLoadFileName = await checkInputDownLoadFileName()

    console.log(downLoadFileName)

    const targetTableDom = await defineTargetDom(targetTableXpath)

    console.log(targetTableDom)

    await downloadCsv(downLoadFileName)

}

async function downloadCsv(downLoadFileName) {
    // ライブラリの読み込み
    // https://www.npmjs.com/package/excellentexport
    let scriptLibrary = document.createElement('script')
    scriptLibrary.setAttribute('type', 'text/javascript')
    scriptLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/excellentexport@3.4.3/dist/excellentexport.min.js')
    document.head.appendChild(scriptLibrary)

    // ライブラリの読み込み待ち時間
    // 3秒後にダウンロード開始
    setTimeout(function(){
        let downloadButton = document.createElement('a')

        downloadButton.setAttribute('download', downLoadFileName)

        downloadButton.setAttribute('href', '#')

        downloadButton.setAttribute('onclick', "return ExcellentExport.csv(this, 'targetTableId');")

        downloadButton.click()

        downloadButton.remove()
    },3000)

}

async function defineTargetDom(targetTableXpath) {
    let targetTableDom = document.evaluate(targetTableXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)

    // 対象DOMテーブルに一意のIDを付番
    targetTableDom.setAttribute('id', 'targetTableId')

    return targetTableDom
}

async function checkInputTargetTableXpath() {
    let targetTableXpath = prompt(
        "Please Input TargetTableXpath"
    )

    if (targetTableXpath === undefined || targetTableXpath === '') {
        alert('Must Input TargetTableXpath')
        (function(){
            return
        })()
    }

    return targetTableXpath
}

async function checkInputDownLoadFileName() {

    let downLoadFileName = prompt(
        "Please Input DownLoadFileName"
    )

    if (downLoadFileName === undefined || downLoadFileName === '') {
        downLoadFileName = 'sample.csv'
    }

    return downLoadFileName
}

main()
