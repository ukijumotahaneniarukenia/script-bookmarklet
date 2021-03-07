function extractClassList(targetDom, resultList, classAttributeInfoList) {
  let targetDomChildList = Array.from(targetDom.childNodes)
  if (targetDomChildList.length === 0) {
    return resultList
  }
  for (let index = 0; index < targetDomChildList.length; index++) {
    const targetDomChild = targetDomChildList[index]
    if (targetDomChild.nodeName !== '#text' && targetDomChild.nodeName !== '#comment') {
      classAttributeInfoList.push({
        dom: targetDomChild,
        classList: targetDomChild.getAttribute('class').split(/ /),
      })
    } else {
      classAttributeInfoList.push({
        dom: targetDomChild,
        classList: '',
      })
    }
    resultList.push(targetDomChild)
    extractClassList(targetDomChild, resultList, classAttributeInfoList)
  }
}

function executeExtractClassList(targetDom) {
  let resultList = new Array()
  let classAttributeInfoList = new Array()
  extractClassList(targetDom, resultList, classAttributeInfoList)
  return classAttributeInfoList
}

function main(targetXpath) {
  let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  let resultList = executeExtractClassList(targetDom)
  console.log(resultList)
}

// おすすめの実行サイト
// https://tailwindcss.com/docs
main('/html/body/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div[3]/div[1]')
