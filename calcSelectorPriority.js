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

function supportQuierySelectorFlatten(targetSupportRule, targetCssRule, resultInfoList) {
  if (targetCssRule.cssRules === undefined) {
    resultInfoList.push({
      supportCssText: targetSupportRule.cssText,
      selectorText: targetCssRule.selectorText,
      cssText: targetCssRule.cssText,
    })
    return resultInfoList
  } else {
    let targetCssStyleRuleList = Array.from(targetCssRule.cssRules)
    for (let index = 0; index < targetCssStyleRuleList.length; index++) {
      const targetCssStyleRule = targetCssStyleRuleList[index]
      supportQuierySelectorFlatten(targetSupportRule, targetCssStyleRule, resultInfoList)
    }
  }
}

function keyframeQuierySelectorFlatten(targetKeyframeRule, targetCssRule, resultInfoList) {
  if (targetCssRule.cssRules === undefined) {
    resultInfoList.push({
      keyframeCssText: targetKeyframeRule.cssText,
      selectorText: targetCssRule.selectorText, // undefined
      cssText: targetCssRule.cssText,
    })
    return resultInfoList
  } else {
    let targetCssStyleRuleList = Array.from(targetCssRule.cssRules)
    for (let index = 0; index < targetCssStyleRuleList.length; index++) {
      const targetCssStyleRule = targetCssStyleRuleList[index]
      keyframeQuierySelectorFlatten(targetKeyframeRule, targetCssStyleRule, resultInfoList)
    }
  }
}

function extractCssBlockText(targetCssText) {
  let regexp = new RegExp(/\{.*\}/g)
  let matchResultList = { ...targetCssText.match(regexp) }
  return matchResultList[0]
}

function extractCssPropertyInfoList(targetCssBlockText) {
  return targetCssBlockText
    .replace(/\{/, '')
    .replace(/\}/, '')
    .split(/;/)
    .map((item) => {
      return item.split(/:/).filter((item2) => {
        return item2.length !== 0
      })
    })
    .filter((item) => {
      return item[0].trim().length !== 0
    })
    .map((item) => {
      return { propertyName: item[0].trim(), propertyValue: item.splice(1).join().trim() }
    })
}

function getSelectorListByPropertyName(targetPropertyName) {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null
  let resultInfoList = []
  for (let i in cssStyleSheetList) {
    if (typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].href === null) {
      if (cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules) {
        cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
        for (let j in cssStyleRules) {
          if (typeof cssStyleRules[j] === 'object' && cssStyleRules[j].selectorText !== undefined) {
            let cssPropertyInfoList = extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText))
            for (let index = 0; index < cssPropertyInfoList.length; index++) {
              const cssPropertyInfo = cssPropertyInfoList[index]
              if (cssPropertyInfo.propertyName === targetPropertyName) {
                resultInfoList.push({
                  cssText: cssStyleRules[j].cssText,
                  cssSelectorText: cssStyleRules[j].selectorText,
                  cssPropertyName: cssPropertyInfo.propertyName,
                  cssPropertyValue: cssPropertyInfo.propertyValue,
                })
              }
            }
          }
        }
      }
    }
  }
  return resultInfoList
}

function isMatchAnimation(targetAnimationName, animationPropertyInfoList) {
  let isMatch = false
  let matchSelector = null
  for (let index = 0; index < animationPropertyInfoList.length; index++) {
    const animationPropertyInfo = animationPropertyInfoList[index]
    if (animationPropertyInfo.cssPropertyValue.indexOf(targetAnimationName) !== -1) {
      isMatch = true
      matchSelector = animationPropertyInfo.cssSelectorText
    }
  }
  return [isMatch, matchSelector]
}

function getSelectorList(targetDom, resultListMap, animationPropertyInfoList) {
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
                // TODO 調べる
                break
              case cssStyleRules[j].FONT_FACE_RULE:
                // TODO URLは正規化しないとだめ サブドメインは異なることがある
                // https://developer.mozilla.org/ja/docs/Web/CSS/@font-face
                // https://css-tricks.com/snippets/css/using-font-face/
                // https://stackoverflow.com/questions/47897685/how-do-i-specify-which-font-weights-are-available-for-a-given-font-family
                if (cssStyleRules[j].cssText !== '' && cssStyleRules[j].cssText !== null && cssStyleRules[j].cssText !== undefined) {
                  let targetXpath = getXpath(targetDom)
                  if (resultListMap.has(targetXpath)) {
                    let targetResultInfo = resultListMap.get(targetXpath)
                    if (targetResultInfo.fontCssTextList === undefined) {
                      targetResultInfo = Object.assign(targetResultInfo, {
                        fontCssTextList: [cssStyleRules[j].cssText],
                      })
                    } else {
                      targetResultInfo.fontCssTextList.push(cssStyleRules[j].cssText)
                    }
                    resultListMap.set(targetXpath, targetResultInfo)
                  } else {
                    resultListMap.set(targetXpath, {
                      fontCssTextList: [cssStyleRules[j].cssText],
                    })
                  }
                }
                break
              case cssStyleRules[j].KEYFRAMES_RULE:
                let [isMatch, matchSelector] = isMatchAnimation(cssStyleRules[j].name, animationPropertyInfoList)
                if (isMatch) {
                  let keyframeQuierySelectorFlattenInfoList = []
                  keyframeQuierySelectorFlatten(cssStyleRules[j], cssStyleRules[j], keyframeQuierySelectorFlattenInfoList)
                  for (let index = 0; index < keyframeQuierySelectorFlattenInfoList.length; index++) {
                    const keyframeQuierySelectorFlattenInfo = keyframeQuierySelectorFlattenInfoList[index]
                    if (targetDom.matches(matchSelector)) {
                      let targetXpath = getXpath(targetDom)
                      if (resultListMap.has(targetXpath)) {
                        let targetResultInfo = resultListMap.get(targetXpath)
                        if (targetResultInfo.cssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            cssTextList: [keyframeQuierySelectorFlattenInfo.cssText],
                          })
                        } else {
                          targetResultInfo.cssTextList.push(keyframeQuierySelectorFlattenInfo.cssText)
                        }
                        if (targetResultInfo.keyframeCssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            keyframeCssTextList: [keyframeQuierySelectorFlattenInfo.keyframeCssText],
                          })
                        } else {
                          targetResultInfo.keyframeCssTextList.push(keyframeQuierySelectorFlattenInfo.keyframeCssText)
                        }
                        resultListMap.set(targetXpath, targetResultInfo)
                      } else {
                        resultListMap.set(targetXpath, {
                          keyframeCssTextList: [keyframeQuierySelectorFlattenInfo.keyframeCssText],
                          cssTextList: [keyframeQuierySelectorFlattenInfo.cssText],
                        })
                      }
                    }
                  }
                }
                break
              case cssStyleRules[j].KEYFRAME_RULE:
                // UNKO cssStyleRules[j].KEYFRAMES_RULEの子なので通らない想定
                break
              case cssStyleRules[j].MEDIA_RULE:
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
                // TODO 調べる
                break
              case cssStyleRules[j].PAGE_RULE:
                // TODO 調べる
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
                    if (targetResultInfo.cssTextList === undefined) {
                      targetResultInfo = Object.assign(targetResultInfo, {
                        cssTextList: [cssStyleRules[j].cssText],
                      })
                    } else {
                      targetResultInfo.cssTextList.push(cssStyleRules[j].cssText)
                    }
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
                // https://developer.mozilla.org/ja/docs/Web/CSS/@supports
                // https://developer.mozilla.org/ja/docs/Web/API/CSSSupportsRule
                // https://blog.kazu69.net/2016/09/14/using-at-rule-supports-development-with-css-property-of-future/
                if (CSS.supports(cssStyleRules[j].conditionText)) {
                  let supportQuierySelectorFlattenInfoList = []
                  supportQuierySelectorFlatten(cssStyleRules[j], cssStyleRules[j], supportQuierySelectorFlattenInfoList)
                  for (let index = 0; index < supportQuierySelectorFlattenInfoList.length; index++) {
                    const supportQuierySelectorFlattenInfo = supportQuierySelectorFlattenInfoList[index]
                    // MEMO プレミアム機能等で機能制限を実現するためににあえてセレクタに不一致するようなマスキングをしているので結果に出力されない
                    if (targetDom.matches(supportQuierySelectorFlattenInfo.selectorText)) {
                      let targetXpath = getXpath(targetDom)
                      if (resultListMap.has(targetXpath)) {
                        let targetResultInfo = resultListMap.get(targetXpath)
                        if (targetResultInfo.cssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            cssTextList: [supportQuierySelectorFlattenInfo.cssText],
                          })
                        } else {
                          targetResultInfo.cssTextList.push(supportQuierySelectorFlattenInfo.cssText)
                        }
                        if (targetResultInfo.supportCssTextList === undefined) {
                          targetResultInfo = Object.assign(targetResultInfo, {
                            supportCssTextList: [supportQuierySelectorFlattenInfo.supportCssText],
                          })
                        } else {
                          targetResultInfo.supportCssTextList.push(supportQuierySelectorFlattenInfo.supportCssText)
                        }
                        resultListMap.set(targetXpath, targetResultInfo)
                      } else {
                        resultListMap.set(targetXpath, {
                          supportCssTextList: [supportQuierySelectorFlattenInfo.supportCssText],
                          cssTextList: [supportQuierySelectorFlattenInfo.cssText],
                        })
                      }
                    }
                  }
                }
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

function traverseDom(targetDom, resultList, resultListMap, animationPropertyInfoList) {
  let targetDomChildList = Array.from(targetDom.childNodes)
  if (targetDomChildList.length === 0) {
    return resultList
  }
  for (let index = 0; index < targetDomChildList.length; index++) {
    const targetDomChild = targetDomChildList[index]
    getSelectorList(targetDomChild, resultListMap, animationPropertyInfoList)
    resultList.push(targetDomChild)
    traverseDom(targetDomChild, resultList, resultListMap, animationPropertyInfoList)
  }
}

function executeTraverseDom(targetDom) {
  let tmpList = new Array()
  let domListMap = new Map()
  let animationPropertyInfoList = getSelectorListByPropertyName('animation')
  console.log(animationPropertyInfoList)
  getSelectorList(targetDom, domListMap, animationPropertyInfoList)
  traverseDom(targetDom, tmpList, domListMap, animationPropertyInfoList)
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
  // https://www.starbucks.com/rewards
  // let targetXpath = '/html/body/div[2]/div/div[3]/main/div[4]/div'
  // https://codyhouse.co/ds/components/app/circular-progress-card
  // let targetXpath = '/html/body/div/div' // @supportで機能制限する例が豊富
  let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  let resultInfoList = await process(targetXpath)
  console.table(resultInfoList)
  let displayItem = ''
  for (let i = 0; i < resultInfoList.length; i++) {
    const resultInfo = resultInfoList[i]
    if (resultInfo.cssTextList !== undefined) {
      displayItem = displayItem + resultInfo.cssTextList.join('\n')
    }
  }
  if (resultInfoList[0].fontCssTextList !== undefined) {
    displayItem = displayItem + resultInfoList[0].fontCssTextList.join('\n')
  }
  console.log(targetDom)
  console.log(displayItem)
}

main()
// このchrome拡張が普通にやばい
// https://chrome.google.com/webstore/detail/css-used/cdopjfddjlonogibjahpnmjpoangjfff/related
// https://github.com/painty/CSS-Used-ChromeExt/blob/master/src/traversalCSSRuleList.js
