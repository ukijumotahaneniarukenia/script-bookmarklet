let excludeDomList = ['script']

function isMatch(targetText, searchKeyword) {
  if (searchKeyword === '' || searchKeyword === undefined || searchKeyword === null) {
    return true
  }
  const re = new RegExp(searchKeyword + '(.*?)', 'g')
  return re.exec(targetText) !== null
}

function listUpAllXpath(xpath, prevXpath, xpathList, searchKeyword) {
  let iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

  for (let childIdx = 0; childIdx < iterator.snapshotLength; childIdx++) {
    let currentElement = iterator.snapshotItem(childIdx)

    let same_hierarchy_children_list = currentElement.children

    for (let hieIdx = 0; hieIdx < same_hierarchy_children_list.length; hieIdx++) {
      let childElement = same_hierarchy_children_list[hieIdx].nodeName.toLocaleLowerCase()

      if (excludeDomList.includes(childElement)) {
        continue
      }

      let same_tag_hierarchy_children_list = document.evaluate(
        prevXpath + '/' + childElement,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      )

      if (same_tag_hierarchy_children_list.snapshotLength === 1) {
        xpath = prevXpath + '/' + childElement

        if (xpathList.includes(xpath)) {
          continue
        }
        let targetDom = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
        if (targetDom.children.length === 0 && isMatch(targetDom.textContent, searchKeyword)) {
          xpathList.push(xpath)
        }

        listUpAllXpath(xpath, xpath, xpathList, searchKeyword)
      } else {
        for (let sameIdx = 0; sameIdx < same_tag_hierarchy_children_list.snapshotLength; sameIdx++) {
          xpath = prevXpath + '/' + childElement + '[' + (sameIdx + 1).toString() + ']'

          if (xpathList.includes(xpath)) {
            continue
          }

          let targetDom = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
          if (targetDom.children.length === 0 && isMatch(targetDom.textContent, searchKeyword)) {
            xpathList.push(xpath)
          }

          listUpAllXpath(xpath, xpath, xpathList, searchKeyword)
        }
      }
    }
  }
}

function getAllXpath(entryXpath, searchKeyword) {
  let xpathList = []
  let prevXpath = entryXpath

  listUpAllXpath(entryXpath, prevXpath, xpathList, searchKeyword)

  return xpathList
}

let startTime = performance.now()

let resultXpathList = getAllXpath('/html/body', 'うんこ')

console.log(resultXpathList)

let endTime = performance.now()

console.log(String((endTime - startTime) / 1000) + '秒')
