function getCssPropertyValue(targetDom, targetCssPropertyName) {
  return window.getComputedStyle(targetDom).getPropertyValue(targetCssPropertyName)
}

function isExistsDefaultCssPropertyName(targetCssPropertyName) {
  let allCssPropertyList = Array.from(
    new Set(
      [window.document.body.parentNode, window.document.body]
        .map((item) => {
          return getCssPropertyNameList(item)
        })
        .flat()
    )
  )
  let matchCount = allCssPropertyList.filter((item) => {
    return item === targetCssPropertyName
  }).length

  if (matchCount !== 0) {
    return true
  }
  return false
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
  let matchResultList = { ...targetCssText.match(regexp) }
  return matchResultList[0]
}

function extractCssPropertyList(targetCssBlockText) {
  return targetCssBlockText
    .replace(/\{/, '')
    .replace(/\}/, '')
    .split(/;/)
    .map((item) => {
      return item.split(/:/).filter((item2) => {
        return item2.length !== 0
      })[0]
    })
    .map((item) => {
      return item.trim()
    })
    .filter((item) => {
      return item.length !== 0
    })
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
      return { propertyName: item[0].trim(), propertyValue: item[1].trim() }
    })
}

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

function extractPureCssSelector(targetSelectorText) {
  let regexp = new RegExp(/[a-zA-Z0-9\-]+/g)
  let matchResultList = { ...targetSelectorText.match(regexp) }
  return matchResultList
}

function extractCssSelector(targetSelectorText) {
  // https://www.w3schools.com/cssref/css_selectors.asp
  // 実現できる範囲で実装範囲を調整
  let regexp = new RegExp(/[a-zA-Z0-9\-\.#>,+]+/g)
  let matchResultList = { ...targetSelectorText.match(regexp) }
  return matchResultList
}

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
  let resultList = new Array() // fake list
  let classAttributeInfoList = new Array()
  extractClassList(targetDom, resultList, classAttributeInfoList)
  resultList = []
  for (let index = 0; index < classAttributeInfoList.length; index++) {
    const classAttributeInfo = classAttributeInfoList[index]
    if (classAttributeInfo['classList'] !== '') {
      resultList = resultList.concat(classAttributeInfo['classList'])
    }
  }
  return resultList
}

function getDomAttachedCssText(targetXpath) {
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
            // TODO ここでDOMに割ついているセレクタを再帰的に取得し、クラス名からプロパティを逆引きしながらリストにマージする
            let regexp = new RegExp(escapeXpath(targetXpath) + '(.*?)', 'g')
            if (targetDom !== null && getXpath(targetDom).match(regexp) !== null) {
              // ブラウザが評価可能なセレクタかつ指定したXPATHに前方一致するセレクタのみ追加
              console.log(
                extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssStyleRules[j].cssText,
                cssStyleRules[j].selectorText,
                extractCssSelector(cssStyleRules[j].selectorText),
                extractPureCssSelector(cssStyleRules[j].selectorText),
                executeExtractClassList(targetDom),
              )
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: targetDom,
                xpath: getXpath(targetDom),
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === 'html') {
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === 'body') {
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === '*') {
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            // ここはCSSプロパティを割りつけることができる疑似要素、疑似クラスごとに追記していく感じになる
            // https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-elements#index_of_standard_pseudo-elements
            // https://developer.mozilla.org/ja/docs/Web/CSS/Pseudo-classes#index_of_standard_pseudo-classes
            if (cssStyleRules[j].selectorText === ':root') {
              // https://developer.mozilla.org/ja/docs/Web/CSS/:root
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === ':before') {
              // https://developer.mozilla.org/ja/docs/Web/CSS/::before
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === ':after') {
              // https://developer.mozilla.org/ja/docs/Web/CSS/::after
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === '::before') {
              // https://developer.mozilla.org/ja/docs/Web/CSS/::before
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
            if (cssStyleRules[j].selectorText === '::after') {
              // https://developer.mozilla.org/ja/docs/Web/CSS/::after
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: '',
                xpath: '',
                cssText: cssStyleRules[j].cssText,
                cssBlockText: extractCssBlockText(cssStyleRules[j].cssText),
                cssDefinedPropertyList: extractCssPropertyList(extractCssBlockText(cssStyleRules[j].cssText)),
                cssDefinedPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
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

function escapeXpath(targetXpath) {
  return targetXpath.replace(/\//g, '\\/').replace(/\[/g, '\\[').replace(/\]/g, '\\]')
}

function mergePropertyInfo(targetPropertyInfoList, targetPropertyName) {
  return Array.from(
    new Set(
      targetPropertyInfoList.map((item) => {
        return item[targetPropertyName]
      })
    )
  ).join('\n')
}

function main(targetXpath) {
  let [resultExcludeList, resultInfoList] = getDomAttachedCssText(targetXpath)
  let displayResultInfoList = []
  for (let resultInfoIndex = 0; resultInfoIndex < resultInfoList.length; resultInfoIndex++) {
    const resultInfo = resultInfoList[resultInfoIndex]
    let cssPropertyNameList = []
    if (resultInfo.xpath !== '') {
      cssPropertyNameList = getCssPropertyNameList(resultInfo.selectorDom)
      for (let cssPropertyNameIndex = 0; cssPropertyNameIndex < cssPropertyNameList.length; cssPropertyNameIndex++) {
        const cssPropertyName = cssPropertyNameList[cssPropertyNameIndex]
        let cssPropertyValue = getCssPropertyValue(resultInfo.selectorDom, cssPropertyName)
        if (resultInfo.cssDefinedPropertyList.includes(cssPropertyName)) {
          displayResultInfoList.push({
            cssPropertyType: 'browserDefaultCssProperty',
            selectorText: resultInfo.selectorText,
            cssPropertyName: cssPropertyName,
            cssPropertyValue: cssPropertyValue,
            cssText: resultInfo.cssText,
            cssBlockText: resultInfo.cssBlockText,
            xpath: resultInfo.xpath,
            selectorDom: resultInfo.selectorDom,
            cssDefinedPropertyList: resultInfo.cssDefinedPropertyList,
          })
        }
      }
    } else {
      for (let index = 0; index < resultInfo.cssDefinedPropertyInfoList.length; index++) {
        const cssDefinedPropertyName = resultInfo.cssDefinedPropertyInfoList[index].propertyName
        const cssDefinedPropertyValue = resultInfo.cssDefinedPropertyInfoList[index].propertyValue
        displayResultInfoList.push({
          // なるほどmarginなどはエイリアス名の扱いか Array.from(window.getComputedStyle(window.document.body)).filter(item=>{return item==="margin"})
          cssPropertyType: isExistsDefaultCssPropertyName(cssDefinedPropertyName) ? 'browserDefaultCssProperty' : 'userDefinedCssProperty',
          selectorText: resultInfo.selectorText,
          cssPropertyName: cssDefinedPropertyName,
          cssPropertyValue: cssDefinedPropertyValue,
          cssText: resultInfo.cssText,
          cssBlockText: resultInfo.cssBlockText,
          xpath: resultInfo.xpath,
          selectorDom: resultInfo.selectorDom,
          cssDefinedPropertyList: resultInfo.cssDefinedPropertyList,
        })
      }
    }
  }
  // selectorDom ないし cssPropertyName ないし selectorText でソート
  let targetDom = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
  console.log('targetDom', targetDom)
  console.table(displayResultInfoList)
  console.log(mergePropertyInfo(displayResultInfoList, 'cssText'))
  console.log('cssExternalLibraryList', resultExcludeList)
}

// おすすめの実行サイト
// 若干漏れているが判明 → DOMに割ついているセレクタを再帰的に取得してないだけか
// chrome拡張のcopy stylesで取得したstyles propertyの結果と比較

// 外部ライブラリのCSSファイルを参照している場合はCHROMEのNetworkタブから該当CSSファイルを選択し、プレビューモードでCSSをコピーしてDOMのheadタグ内の任意のstyleタグに埋め込んでから実行
// https://tailwindcss.com/docs
main('/html/body/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div[3]/div[1]')
