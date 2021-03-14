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

function executeMakeStyleDom() {
  return new Promise((resolve) => {
    makeStyleDom(getExternalCssLinkUrlList())
    console.log('executeMakeStyleDom is done')
    resolve()
  })
}

function executeGetSelectorList(targetSelectorName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let resultInfoList = getSelectorListBySelectorName(targetSelectorName)
      console.log('executeGetSelectorList is done')
      resolve(resultInfoList)
    }, 3000)
  })
}

function getSelectorListBySelectorName(targetSelectorName) {
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
            if (cssStyleRules[j].cssText.indexOf(targetSelectorName) !== -1 && cssStyleRules[j].selectorText !== undefined) {
              resultInfoList.push({
                cssText: cssStyleRules[j].cssText,
                cssSelectorText: cssStyleRules[j].selectorText,
                cssPropertyInfoList: extractCssPropertyInfoList(extractCssBlockText(cssStyleRules[j].cssText)),
              })
            }
          }
        }
      }
    }
  }
  return resultInfoList
}

async function main() {
  await executeMakeStyleDom()
  let resultInfoList = await executeGetSelectorList('*')
  let displayList = []
  for (let index = 0; index < resultInfoList.length; index++) {
    let displayInfo = {}
    let resultInfo = resultInfoList[index]
    for (let index = 0; index < resultInfo.cssPropertyInfoList.length; index++) {
      const cssPropertyInfo = resultInfo.cssPropertyInfoList[index]
      displayInfo = {
        cssText: resultInfo.cssText,
        cssSelectorText: resultInfo.cssSelectorText,
        cssPropertyName: cssPropertyInfo.propertyName,
        cssPropertyValue: cssPropertyInfo.propertyValue,
      }
      displayList.push(displayInfo)
    }
  }
  console.table(displayList)
}

// https://codyhouse.co/ds/docs/components
main()
