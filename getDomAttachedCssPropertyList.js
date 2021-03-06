// おすすめの実行サイト
// https://mailchimp.com/
function getCssPropertyValue(targetDom, targetCssPropertyName) {
  return window.getComputedStyle(targetDom).getPropertyValue(targetCssPropertyName)
}

function getCssPropertyNameList(targetDom) {
  return Array.from(window.getComputedStyle(targetDom))
}

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

function extractCssBlockText(targetCssText) {
  let regexp = new RegExp(/\{.*\}/g)
  let matchResult = { ...targetCssText.match(regexp) }
  return matchResult[0]
}

function extractCssPropertyList(targetCssBlockText) {
  return targetCssBlockText
    .replace(/\s/g, '')
    .replace(/\{/, '')
    .replace(/\}/, '')
    .split(/;/)
    .map((item) => {
      return item.split(/:/).filter((item2) => {
        return item2.length !== 0
      })[0]
    })
    .filter((item) => {
      return item
    })
}

function getDomAttachedCssText() {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null
  let resultList = []
  let resultExcludeList = []
  for (let i in cssStyleSheetList) {
    if (typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].href === null) {
      if (cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules) {
        // 外部ライブラリのCSSファイル以外を処理対象にする
        cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
        for (let j in cssStyleRules) {
          if (
            typeof cssStyleRules[j] === 'object' &&
            cssStyleRules[j].selectorText !== '' &&
            cssStyleRules[j].selectorText !== null &&
            cssStyleRules[j].selectorText !== undefined
          ) {
            let targetDom = document.querySelector(`${cssStyleRules[j].selectorText}`)
            if (targetDom !== null) {
              // ブラウザが評価可能なセレクタのみ追加
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: targetDom,
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
          }
        }
      }
    } else {
      if (cssStyleSheetList[i].href !== undefined) {
        resultExcludeList.push({
          cssExternalLibrary: cssStyleSheetList[i].href,
        })
      }
    }
  }
  return [resultExcludeList, sortList(resultList)]
}

let [resultExcludeList, resultInfoList] = getDomAttachedCssText()
let displayResultInfoList = []
for (let resultInfoIndex = 0; resultInfoIndex < resultInfoList.length; resultInfoIndex++) {
  const resultInfo = resultInfoList[resultInfoIndex]
  let cssPropertyNameList = getCssPropertyNameList(resultInfo.selectorDom)
  for (let cssPropertyNameIndex = 0; cssPropertyNameIndex < cssPropertyNameList.length; cssPropertyNameIndex++) {
    const cssPropertyName = cssPropertyNameList[cssPropertyNameIndex]
    const cssPropertyValue = getCssPropertyValue(resultInfo.selectorDom, cssPropertyName)
    if (resultInfo.cssDefinedPropertyList.includes(cssPropertyName)) {
      // developer defined css property value
      displayResultInfoList.push({
        selectorText: resultInfo.selectorText,
        cssPropertyName: cssPropertyName,
        cssPropertyValue: cssPropertyValue,
        cssBlockText: resultInfo.cssBlockText,
        selectorDom: resultInfo.selectorDom,
        cssDefinedPropertyList: resultInfo.cssDefinedPropertyList,
      })
    } else {
      // brawser default css property value
    }
  }
}

// selectorDom ないし cssPropertyName ないし selectorText でソート
console.table(displayResultInfoList)
console.log('cssExternalLibraryList', resultExcludeList)
