function getSelectorList(targetDom, resultList) {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null
  for (let i in cssStyleSheetList) {
    if (typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].href === null) {
      if (cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules) {
        cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
        for (let j in cssStyleRules) {
          if (
            typeof cssStyleRules[j] === 'object' &&
            cssStyleRules[j].selectorText !== '' &&
            cssStyleRules[j].selectorText !== null &&
            cssStyleRules[j].selectorText !== undefined &&
            targetDom.nodeName !== '#text' &&
            targetDom.nodeName !== '#comment'
          ) {
            if (targetDom.matches(cssStyleRules[j].selectorText)) {
              resultList.push(cssStyleRules[j].selectorText)
            }
          }
        }
      }
    }
  }
  return resultList
}

function traverseDom(targetDom, resultList, selectorList) {
  let targetDomChildList = Array.from(targetDom.childNodes)
  if (targetDomChildList.length === 0) {
    return resultList
  }
  for (let index = 0; index < targetDomChildList.length; index++) {
    const targetDomChild = targetDomChildList[index]
    getSelectorList(targetDomChild, selectorList)
    resultList.push(targetDomChild)
    traverseDom(targetDomChild, resultList, selectorList)
  }
}

function executeTraverseDom(targetDom) {
  let tmpList = new Array()
  let selectorList = new Array()
  getSelectorList(targetDom, selectorList)
  traverseDom(targetDom, tmpList, selectorList)
  return Array.from(new Set(selectorList))
}

let targetDom = document
  .evaluate('/html/body/div[2]/div[1]/div[2]/span/div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
  .snapshotItem(0)

let resultList = executeTraverseDom(targetDom)

console.log(resultList)
