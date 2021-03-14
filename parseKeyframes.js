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

function getSelectorList(targetCssType) {
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
                cssText: cssStyleRules[j].cssText,
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
      let resultInfoList = getSelectorList(CSSRule.KEYFRAMES_RULE)
      console.log('executeGetSelectorList is done')
      resolve(resultInfoList)
    }, 3000)
  })
}

async function main() {
  await executeMakeStyleDom()
  let resultInfoList = await executeGetSelectorList()
  console.log(resultInfoList)
}

// https://codyhouse.co/ds/docs/components
main()
