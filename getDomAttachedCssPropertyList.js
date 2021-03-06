// おすすめの実行サイト
// https://mailchimp.com/
function sortList(targetList) {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  targetList.sort((a, b) => {
    let selectorTextA = a.selectorText.toUpperCase() // 大文字と小文字を無視する
    let selectorTextB = b.selectorText.toUpperCase() // 大文字と小文字を無視する
    if (selectorTextA < selectorTextB) {
      return -1
    }
    if (selectorTextA > selectorTextB) {
      return 1
    }
    return 0
  })
  return targetList
}

function getDomAttachedCssPropertyList() {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null
  let resultList = []
  for (let i in cssStyleSheetList) {
    if ((typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].rules) || cssStyleSheetList[i].cssRules) {
      cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
      for (let j in cssStyleRules) {
        if (
          typeof cssStyleRules[j] === 'object' &&
          cssStyleRules[j].selectorText !== '' &&
          cssStyleRules[j].selectorText !== null &&
          cssStyleRules[j].selectorText !== undefined
        ) {
          let targetDomList = [...document.querySelectorAll(`${cssStyleRules[j].selectorText}`)]
          if (targetDomList.length !== 0) {
            // ブラウザが評価可能なセレクタのみ追加
            resultList.push({
              selectorText: cssStyleRules[j].selectorText,
              selectorDomListCount: targetDomList.length,
              selectorDomList: targetDomList,
              cssText: cssStyleRules[j].cssText,
            })
          }
        }
      }
    }
  }
  return sortList(resultList)
}

let resultInfo = getDomAttachedCssPropertyList()

// console.log(resultInfo)
console.table(resultInfo)
