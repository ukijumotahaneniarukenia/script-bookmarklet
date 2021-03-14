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

function mediaQuierySelectorFlatten(targetMediaRule, targetCssRule, resultInfoList) {
  // ルートメデイア情報は持ち回る
  if (targetCssRule.cssRules === undefined) {
    resultInfoList.push({
      mediaCssText: targetMediaRule.cssText,
      selectorText: targetCssRule.selectorText,
      cssText: targetCssRule.cssText,
    })
    return resultInfoList
  } else {
    let targetCssStyleRuleList = Array.from(targetCssRule.cssRules)
    for (let index = 0; index < targetCssStyleRuleList.length; index++) {
      const targetCssStyleRule = targetCssStyleRuleList[index]
      mediaQuierySelectorFlatten(targetMediaRule, targetCssStyleRule, resultInfoList)
    }
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
          if (typeof cssStyleRules[j] === 'object' && targetDom.nodeName !== '#text' && targetDom.nodeName !== '#comment') {
            let targetCssStyleType = cssStyleRules[j].type
            switch (targetCssStyleType) {
              case cssStyleRules[j].CHARSET_RULE:
                break
              case cssStyleRules[j].FONT_FACE_RULE:
                // TODO どういれこんだらいいかわからん
                // https://developer.mozilla.org/ja/docs/Web/CSS/@font-face
                if (cssStyleRules[j].cssText !== '' && cssStyleRules[j].cssText !== null && cssStyleRules[j].cssText !== undefined) {
                  let targetXpath = getXpath(targetDom)
                  // console.log(cssStyleRules[j].cssText)
                  // if (resultListMap.has(targetXpath)) {
                  //   let targetResultInfo = resultListMap.get(targetXpath)
                  //   targetResultInfo.cssTextList.push(cssStyleRules[j].cssText)
                  //   resultListMap.set(targetXpath, targetResultInfo)
                  // } else {
                  //   resultListMap.set(targetXpath, {
                  //     cssTextList: [cssStyleRules[j].cssText],
                  //   })
                  // }
                }
                break
              case cssStyleRules[j].KEYFRAMES_RULE:
                break
              case cssStyleRules[j].KEYFRAME_RULE:
                break
              case cssStyleRules[j].MEDIA_RULE:
                // TODO postcssとかでネストセレクタをフラットセレクタにマージしてくれたりするのだろうか
                // https://postcss.org/
                if (cssStyleRules[j].media.length !== 0 && window.matchMedia(cssStyleRules[j].conditionText).matches) {
                  let mediaQuierySelectorFlattenInfoList = []
                  mediaQuierySelectorFlatten(cssStyleRules[j], cssStyleRules[j], mediaQuierySelectorFlattenInfoList)
                  for (let index = 0; index < mediaQuierySelectorFlattenInfoList.length; index++) {
                    const mediaQuierySelectorFlattenInfo = mediaQuierySelectorFlattenInfoList[index]
                    if (targetDom.matches(mediaQuierySelectorFlattenInfo.selectorText)) {
                      let targetXpath = getXpath(targetDom)
                      if (resultListMap.has(targetXpath)) {
                        let targetResultInfo = resultListMap.get(targetXpath)
                        if (targetResultInfo.cssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            cssTextList: [mediaQuierySelectorFlattenInfo.cssText],
                          })
                        } else {
                          targetResultInfo.cssTextList.push(mediaQuierySelectorFlattenInfo.cssText)
                        }
                        if (targetResultInfo.mediaCssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            mediaCssTextList: [mediaQuierySelectorFlattenInfo.mediaCssText],
                          })
                        } else {
                          targetResultInfo.mediaCssTextList.push(mediaQuierySelectorFlattenInfo.mediaCssText)
                        }
                        resultListMap.set(targetXpath, targetResultInfo)
                      } else {
                        resultListMap.set(targetXpath, {
                          mediaCssTextList: [mediaQuierySelectorFlattenInfo.mediaCssText],
                          cssTextList: [mediaQuierySelectorFlattenInfo.cssText],
                        })
                      }
                    }
                  }
                }
                break
              case cssStyleRules[j].NAMESPACE_RULE:
                break
              case cssStyleRules[j].PAGE_RULE:
                break
              case cssStyleRules[j].STYLE_RULE:
                if (
                  cssStyleRules[j].selectorText !== '' &&
                  cssStyleRules[j].selectorText !== null &&
                  cssStyleRules[j].selectorText !== undefined &&
                  targetDom.matches(cssStyleRules[j].selectorText)
                ) {
                  let targetXpath = getXpath(targetDom)
                  if (resultListMap.has(targetXpath)) {
                    let targetResultInfo = resultListMap.get(targetXpath)
                    if (targetResultInfo.selectorTextList === undefined) {
                      targetResultInfo = Object.assign(targetResultInfo, {
                        selectorTextList: [cssStyleRules[j].selectorText],
                      })
                    } else {
                      targetResultInfo.selectorTextList.push(cssStyleRules[j].selectorText)
                    }
                    targetResultInfo.cssTextList.push(cssStyleRules[j].cssText)
                    resultListMap.set(targetXpath, targetResultInfo)
                  } else {
                    resultListMap.set(targetXpath, {
                      selectorTextList: [cssStyleRules[j].selectorText],
                      cssTextList: [cssStyleRules[j].cssText],
                    })
                  }
                }
                break
              case cssStyleRules[j].SUPPORTS_RULE:
                break
              default:
                break
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

function process(targetXpath) {
  makeStyleDom(getExternalCssLinkUrlList())
  return new Promise((resolve) => {
    setTimeout(() => {
      let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
      let resultList = executeTraverseDom(targetDom)
      resolve(addXpathInfo(resultList))
    }, 3000)
  })
}

async function main() {
  // https://mailchimp.com/pricing/
  let targetXpath = '/html/body/main/div/div/div[1]/div[2]'
  let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  let resultInfoList = await process(targetXpath)
  console.table(resultInfoList)
  let displayItem = ''
  for (let i = 0; i < resultInfoList.length; i++) {
    const resultInfo = resultInfoList[i]
    displayItem = displayItem + resultInfo.cssTextList.join('\n')
  }
  console.log(targetDom)
  console.log(displayItem)
}

main()
// このchrome拡張が目指すべきゴール 普通にやばい
// https://chrome.google.com/webstore/detail/css-used/cdopjfddjlonogibjahpnmjpoangjfff/related
// https://github.com/painty/CSS-Used-ChromeExt/blob/master/src/traversalCSSRuleList.js
