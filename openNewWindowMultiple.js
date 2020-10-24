let targetUrlList = [
  'https://data.city.kyoto.lg.jp/',
  'https://reverseengineering.stackexchange.com/',
  'https://qiita.com/danishi/items/42d8adf6291515e62284'
]

function openWindow(targetUrl, executeScript) {
  let targetHtml = document.body.innerHTML;
  let targetWindow = window.open(targetUrl);
  targetWindow.document.head.innerHTML = '<title>Hi</title></head>';
  targetWindow.document.body.innerHTML = '<body>' + targetHtml + '</body>';
  let targetScript = document.createElement('script');
  targetScript.textContent = executeScript;
  targetWindow.document.head.appendChild(targetScript);
}

async function getHtml(url) {
  const response = await fetch(url);
  let parser = new DOMParser();
  if (response.ok) {
    const textHtml = await response.text()
    let doc = parser.parseFromString(textHtml, "text/html");
    let html = doc.querySelector('html');
    return html
  }
}

let targetUrlListCnt = targetUrlList.length

for (let index = 0; index < targetUrlListCnt; index++) {
  let targetUrl = targetUrlList[index];

  console.log(targetUrl)

  window.open("https://data.city.kyoto.lg.jp/",targetUrl,'PopUp','scrollbars=1,menubar=1,resizable=1');


}

