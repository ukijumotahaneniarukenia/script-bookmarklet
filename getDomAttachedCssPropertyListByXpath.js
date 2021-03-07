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
            let regexp = new RegExp(escapeXpath(targetXpath) + '(.*?)', 'g')
            if (targetDom !== null && getXpath(targetDom).match(regexp) !== null) {
              // ブラウザが評価可能なセレクタかつ指定したXPATHに前方一致するセレクタのみ追加
              resultList.push({
                selectorText: cssStyleRules[j].selectorText,
                selectorDom: targetDom,
                xpath: getXpath(targetDom),
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

function escapeXpath(targetXpath) {
  return targetXpath.replace(/\//g, '\\/').replace(/\[/g, '\\[').replace(/\]/g, '\\]')
}

function mergePropertyInfo(targetPropertyInfoList, targetPropertyName) {
  let resultInfo = ''
  for (let index = 0; index < targetPropertyInfoList.length; index++) {
    const targetPropertyInfo = targetPropertyInfoList[index]
    if (index === 0) {
      resultInfo = resultInfo + targetPropertyInfo[targetPropertyName]
    } else {
      resultInfo = resultInfo + '\n' + targetPropertyInfo[targetPropertyName]
    }
  }
  return resultInfo
}

function main(targetXpath) {
  let [resultExcludeList, resultInfoList] = getDomAttachedCssText(targetXpath)
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
          cssText: resultInfo.cssText,
          cssBlockText: resultInfo.cssBlockText,
          xpath: resultInfo.xpath,
          selectorDom: resultInfo.selectorDom,
          cssDefinedPropertyList: resultInfo.cssDefinedPropertyList,
        })
      } else {
        // browser default css property value
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
// https://tailwindcss.com/docs
main('/html/body/div[1]/div[2]/div/div[2]/div/div[1]/div[2]/div[3]/div[1]')
