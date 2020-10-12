async function hoge(targetUrl, regptn) {
  let targetHtmlText = await getText(targetUrl)

  //console.log(targetHtmlText)

  let links = await extractLinks(targetHtmlText, regptn)

  console.log(links)

  async function getText(executeUrl) {

    //サーバーへリクエスト開始
    let response = await fetch(executeUrl)

    //レスポンスWEBページの取得
    let htmlText = await response.text()

    return htmlText
  }

  async function extractLinks(targetHtmlText, regptn) {

    // 正規表現の変数化などしていきたい
    // let regptn = '<a.*?>.*?</a>'

    let re = new RegExp(regptn + '(.*?)' , 'g')

    let match
    let matches = []

    while ((match = re.exec(targetHtmlText)) != null) {
      matches.push(match[0])
    }

    return matches
  }
}
hoge('https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2', '<a.*?>.*?</a>')
