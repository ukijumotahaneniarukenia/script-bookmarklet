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

function getSelectorListByCssType(targetCssType) {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null
  let resultInfoList = []
  for (let i in cssStyleSheetList) {
    if (typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].href === null) {
      if (cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules) {
        cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
        for (let j in cssStyleRules) {
          if (typeof cssStyleRules[j] === 'object') {
            if (cssStyleRules[j].type === targetCssType) {
              resultInfoList.push({
                cssAnimationText: cssStyleRules[j].cssText,
                keyframeName: cssStyleRules[j].name,
              })
            }
          }
        }
      }
    }
  }
  return resultInfoList
}

function executeMakeStyleDom() {
  return new Promise((resolve) => {
    makeStyleDom(getExternalCssLinkUrlList())
    console.log('executeMakeStyleDom is done')
    resolve()
  })
}

function executeGetSelectorList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let resultInfoList = getSelectorListByCssType(CSSRule.KEYFRAMES_RULE)
      console.log('executeGetSelectorList is done')
      resolve(resultInfoList)
    }, 3000)
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
          if (typeof cssStyleRules[j] === 'object') {
            let targetCssPropertyInfoList = extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText))
            for (let j = 0; j < targetCssPropertyInfoList.length; j++) {
              const targetCssPropertyInfo = targetCssPropertyInfoList[j]
              if (targetCssPropertyInfo.propertyName.indexOf(targetPropertyName) !== -1) {
                resultInfoList.push({
                  cssText: cssStyleRules[j].cssText,
                  cssSelectorText: cssStyleRules[j].selectorText,
                  cssPropertyName: targetCssPropertyInfo.propertyName,
                  cssPropertyValue: targetCssPropertyInfo.propertyValue,
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

function getMatchAnimationSelectorInfoList(targetKeyFrameName) {
  let resultInfoList = []
  let selectorInfoList = getSelectorListByPropertyName('animation')
  for (let index = 0; index < selectorInfoList.length; index++) {
    const selectorInfo = selectorInfoList[index]
    if (selectorInfo.cssPropertyValue.indexOf(targetKeyFrameName) !== -1) {
      resultInfoList.push({
        cssText: selectorInfo.cssText,
        cssSelectorText: selectorInfo.cssSelectorText,
        cssPropertyName: selectorInfo.cssPropertyName,
        cssPropertyValue: selectorInfo.cssPropertyValue,
      })
    }
  }
  return resultInfoList
}

async function main() {
  await executeMakeStyleDom()
  let resultInfoList = await executeGetSelectorList()
  let displayInfoList = []
  for (let i = 0; i < resultInfoList.length; i++) {
    const resultInfo = resultInfoList[i]
    let matchAnimationSelectorInfoList = getMatchAnimationSelectorInfoList(resultInfo.keyframeName)
    if (matchAnimationSelectorInfoList.length !== 0) {
      for (let j = 0; j < matchAnimationSelectorInfoList.length; j++) {
        let matchAnimationSelectorInfo = matchAnimationSelectorInfoList[j]
        matchAnimationSelectorInfo = Object.assign(matchAnimationSelectorInfo, { ...resultInfo })
        displayInfoList.push(matchAnimationSelectorInfo)
      }
    }
  }
  console.table(displayInfoList)
}

// https://codyhouse.co/ds/docs/components
main()
