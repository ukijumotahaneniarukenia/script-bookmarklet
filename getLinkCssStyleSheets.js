let cssLinkUrlList = [
  'https://static1.squarespace.com/static/ta/5134cbefe4b0c6fb04df8065/10632/assets/styles/components/feature-text.css?37dbeb6ef9c53c92665c57a7afa4f45b',
  'https://static1.squarespace.com/static/ta/5134cbefe4b0c6fb04df8065/10579/assets/styles/globals.css?10633',
]

function getCssContent(targetCssLinkUrl) {
  return new Promise((resolve, reject) => {
    fetch(targetCssLinkUrl)
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        resolve(data)
      })
  })
}

async function main() {
  let result = ''
  for (let index = 0; index < cssLinkUrlList.length; index++) {
    const cssLinkUrl = cssLinkUrlList[index]
    if (index === 0) {
      result = result + (await getCssContent(cssLinkUrl))
    } else {
      result = result + '\n' + (await getCssContent(cssLinkUrl))
    }
  }
  console.log(result)
}

main()
