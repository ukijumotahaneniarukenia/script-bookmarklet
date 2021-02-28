function getDomAttachedCssProperty(targetSelector) {
  // https://stackoverflow.com/questions/7251804/cssStyleSheetList-javascript-get-a-list-of-cssStyleSheetList-custom-attributes
  let cssStyleSheetList = document.styleSheets
  let cssStyleRules = null

  for (let i in cssStyleSheetList) {
    if ((typeof cssStyleSheetList[i] === 'object' && cssStyleSheetList[i].rules) || cssStyleSheetList[i].cssRules) {
      cssStyleRules = cssStyleSheetList[i].rules || cssStyleSheetList[i].cssRules
      for (let j in cssStyleRules) {
        if (
          typeof cssStyleRules[j] === 'object' &&
          cssStyleRules[j].selectorText !== '' &&
          cssStyleRules[j].selectorText !== null &&
          cssStyleRules[j].selectorText !== undefined &&
          cssStyleRules[j].selectorText.indexOf(targetSelector) !== -1
        ) {
          console.log(cssStyleRules[j].selectorText, cssStyleRules[j].cssText)
        }
      }
    }
  }
}
getDomAttachedCssProperty('.test')
getDomAttachedCssProperty('#test')
