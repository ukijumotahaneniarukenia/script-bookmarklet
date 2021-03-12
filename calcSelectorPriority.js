function getXpath(targetDom) {
  // 最下位のタグから最上位のタグへさかのぼって処理する
  if (targetDom && targetDom.parentNode) {
    let xpath = getXpath(targetDom.parentNode) + '/' + targetDom.tagName
    let sameHierarchyChildList = []
    for (let childIndex = 0; childIndex < targetDom.parentNode.childNodes.length; childIndex++) {
      // 対象のDOMが同一階層に複数存在する要素の一つである場合は何番目かを特定するため、親要素からみた子要素すべてのDOMを保持する
      let childNode = targetDom.parentNode.childNodes[childIndex]

      if (childNode.tagName == targetDom.tagName) {
        sameHierarchyChildList.push(childNode)
      }
    }

    if (1 < sameHierarchyChildList.length) {
      // 同一階層に複数存在する要素の一つである場合、インデックス番号を付与する
      for (let sameHierarchyChildIndex = 0; sameHierarchyChildIndex < sameHierarchyChildList.length; sameHierarchyChildIndex++) {
        if (sameHierarchyChildList[sameHierarchyChildIndex] === targetDom) {
          xpath += '[' + (sameHierarchyChildIndex + 1) + ']'
          break // 対象のDOMに対して処理できればよいので、それ以外は処理対象外にする
        }
      }
    }

    return xpath.toLowerCase()
  } else {
    return ''
  }
}

function getSelectorList(targetDom, resultListMap) {
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
              let targetXpath = getXpath(targetDom)
              if (resultListMap.has(targetXpath)) {
                let targetResultInfo = resultListMap.get(targetXpath)
                targetResultInfo.selectorTextList.push(cssStyleRules[j].selectorText)
                targetResultInfo.cssTextList.push(cssStyleRules[j].cssText)
                resultListMap.set(targetXpath, targetResultInfo)
              } else {
                resultListMap.set(targetXpath, {
                  selectorTextList: [cssStyleRules[j].selectorText],
                  cssTextList: [cssStyleRules[j].cssText],
                })
              }
            }
          }
        }
      }
    }
  }
  return resultListMap
}

function getCssContent(targetCssLinkUrl) {
  return new Promise((resolve, reject) => {
    fetch(targetCssLinkUrl)
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

async function makeStyleDom(targetExternalCssLinkUrlList) {
  let result = ''
  for (let index = 0; index < targetExternalCssLinkUrlList.length; index++) {
    const targetExternalCssLinkUrl = targetExternalCssLinkUrlList[index]
    if (index === 0) {
      result = result + (await getCssContent(targetExternalCssLinkUrl))
    } else {
      result = result + '\n' + (await getCssContent(targetExternalCssLinkUrl))
    }
  }
  let targetDom = document.createElement('style')
  targetDom.innerHTML = result
  let targetAppendDom = document.getElementsByTagName('head')[0]
  targetAppendDom.appendChild(targetDom)
}

function getExternalCssLinkUrlList() {
  let cssStyleSheetList = document.styleSheets
  let resultList = []
  for (let i in cssStyleSheetList) {
    if (typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].href !== null && cssStyleSheetList[i].href !== undefined) {
      resultList.push(cssStyleSheetList[i].href)
    }
  }
  return resultList
}

function traverseDom(targetDom, resultList, resultListMap) {
  let targetDomChildList = Array.from(targetDom.childNodes)
  if (targetDomChildList.length === 0) {
    return resultList
  }
  for (let index = 0; index < targetDomChildList.length; index++) {
    const targetDomChild = targetDomChildList[index]
    getSelectorList(targetDomChild, resultListMap)
    resultList.push(targetDomChild)
    traverseDom(targetDomChild, resultList, resultListMap)
  }
}

// https://gist.github.com/ssafejava/6605832#file-mozgetmatchedcssrules-js-L26
function countPatternMatch(targetSelectorTokenItem, targetPattern) {
  let matchList = targetSelectorTokenItem.match(targetPattern)
  if (matchList === null) {
    return 0
  }
  return matchList.length
}

// https://gist.github.com/ssafejava/6605832#file-mozgetmatchedcssrules-js-L32
function calculatePriorityScore(targetSelector) {
  // https://www.slideshare.net/yumi-uniq-ishizaki/css-13918388
  let priorityScore = [0, 0, 0]
  let selectorTokenList = targetSelector.split(' ')
  let matchCount = null
  for (let index = 0; index < selectorTokenList.length; index++) {
    let selectorTokenItem = selectorTokenList[index]
    // IDパタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, ID_PATTERN)
    priorityScore[0] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(ID_PATTERN, '')
    }
    // クラスパタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, CLASS_PATTERN)
    priorityScore[1] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(CLASS_PATTERN, '')
    }
    // 属性パタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, ATTR_PATTERN)
    priorityScore[1] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(ATTR_PATTERN, '')
    }
    // 疑似クラスパタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, PSEUDO_CLASSES_PATTERN)
    priorityScore[1] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(PSEUDO_CLASSES_PATTERN, '')
    }
    // 要素パタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, ELEMENT_PATTERN)
    priorityScore[2] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(ELEMENT_PATTERN, '')
    }
    // 疑似要素パタンマッチ
    matchCount = countPatternMatch(selectorTokenItem, PSEUDO_ELEMENTS_PATTERN)
    priorityScore[2] += matchCount
    // マッチ件数が0件でない場合は、マッチ評価トークンをセレクタから除去
    if (matchCount !== 0) {
      selectorTokenItem = selectorTokenItem.replace(PSEUDO_ELEMENTS_PATTERN, '')
    }
  }
  return Number.parseInt(priorityScore.join(''))
}

function isEnableSelector(targetDom, targetSelector) {
  if (targetDom.mozMatchesSelector !== undefined && targetDom.mozMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.matchesSelector !== undefined && targetDom.matchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.webkitMatchesSelector !== undefined && targetDom.webkitMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.oMatchesSelector !== undefined && targetDom.oMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.msMatchesSelector !== undefined && targetDom.msMatchesSelector(targetSelector)) {
    return targetSelector
  }
  return null
}

// https://gist.github.com/ssafejava/6605832#file-mozgetmatchedcssrules-js-L70
function specifyPriorityScore(targetDom, targetSelector) {
  let selectorTokenList = targetSelector.split(',')
  let currentPriorityScore = 0
  let resultPriorityScore = 0
  for (let index = 0; index < selectorTokenList.length; index++) {
    const selectorToken = selectorTokenList[index]
    if (isEnableSelector(targetDom, selectorToken)) {
      currentPriorityScore = calculatePriorityScore(selectorToken)
      resultPriorityScore = currentPriorityScore > resultPriorityScore ? currentPriorityScore : resultPriorityScore
    }
  }
  return resultPriorityScore
}

// https://gist.github.com/ssafejava/6605832#file-mozgetmatchedcssrules-js-L82
function sortByPriorityScore(targetSelectorPriorityScoreList) {
  return targetSelectorPriorityScoreList.sort((a, b) => {
    return b - a
  })
}

function executeSortByPriorityScore(targetItemList) {
  for (let index = 0; index < targetItemList.length; index++) {
    let targetItem = targetItemList[index]
    sortByPriorityScore(targetItem.selectorPriorityScoreList)
  }
  return targetItemList
}

function executeTraverseDom(targetDom) {
  let tmpList = new Array()
  let domListMap = new Map()
  getSelectorList(targetDom, domListMap)
  traverseDom(targetDom, tmpList, domListMap)
  return Array.from(new Set(domListMap))
}

function addXpathInfo(targetItemList) {
  let resultList = []
  for (let index = 0; index < targetItemList.length; index++) {
    const targetItem = targetItemList[index]
    targetItem[1]['xpath'] = targetItem[0]
    resultList.push(targetItem[1])
  }
  return resultList
}

function reformat(targetItemList) {
  let resultList = []
  for (let index = 0; index < targetItemList.length; index++) {
    const targetItem = targetItemList[index]
    for (let index = 0; index < targetItem.selectorTextList.length; index++) {
      let pushItem = {
        xpath: targetItem.xpath,
        cssText: targetItem.cssTextList[index],
        selectorText: targetItem.selectorTextList[index],
        selectorPriorityScore: targetItem.selectorPriorityScoreList[index],
      }
      resultList.push(pushItem)
    }
  }
  return resultList
}

function main(targetXpath) {
  makeStyleDom(getExternalCssLinkUrlList())
  let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)

  let resultList = executeTraverseDom(targetDom)

  for (let index = 0; index < resultList.length; index++) {
    const [_, domInfo] = resultList[index]
    for (let index = 0; index < domInfo.selectorTextList.length; index++) {
      const selectorText = domInfo.selectorTextList[index]
      if (domInfo.selectorPriorityScoreList) {
        domInfo.selectorPriorityScoreList.push(calculatePriorityScore(selectorText))
      } else {
        domInfo.selectorPriorityScoreList = [calculatePriorityScore(selectorText)]
      }
    }
  }

  return reformat(executeSortByPriorityScore(addXpathInfo(resultList)))
}

// https://gist.github.com/ssafejava/6605832
let ELEMENT_PATTERN = /[\w-]+/g
let ID_PATTERN = /#[\w-]+/g
let CLASS_PATTERN = /\.[\w-]+/g
let ATTR_PATTERN = /\[[^\]]+\]/g
let PSEUDO_CLASSES_PATTERN = /(?<!:):(?!(not))[\w-]+(\(.*\))?/g
let PSEUDO_ELEMENTS_PATTERN = /::(root|after|before|first-letter|first-line|selection)/g

// https://specificity.keegan.st/
// let resultInfoList = main('/html/body/div[2]/div[1]/div[2]/span/div[1]/div')
let resultInfoList = main('/html/body/div[2]/div[1]/div[2]/span/div[1]/dl/span[2]')

console.log(resultInfoList)
