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

  // let targetWindow = window.open(targetUrl);

  window.open("https://data.city.kyoto.lg.jp/","_blank",'PopUp','scrollbars=1,menubar=0,resizable=1,width=850,height=500');


  // openWindow(targetUrl, '(function (){function NNN(c,b,f,d){if("html"===c.nodeName.toLocaleLowerCase()){c=c.children;for(var e=0;e<c.length;e++)b=f+"/"+c[e].nodeName.toLocaleLowerCase(),d.push(b),NNN(c[e],b,b,d)}else for(c=document.evaluate(b,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),e=0;e<c.snapshotLength;e++)for(var k=c.snapshotItem(e).children,g=0;g<k.length;g++){var l=k[g].nodeName.toLocaleLowerCase(),m=document.evaluate(f+"/"+l,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);if(1===m.snapshotLength)b= f+"/"+l,d.includes(b)||(d.push(b),NNN(k[g],b,b,d));else for(var h=0;h<m.snapshotLength;h++){var n=m.snapshotItem(h);b=f+"/"+l+"["+(h+1).toString()+"]";d.includes(b)||(d.push(b),NNN(n,b,b,d))}}}var xpathList=[],targetElement=document.querySelector("html"),xpath="/"+targetElement.nodeName.toLocaleLowerCase(),prevXpath="/"+targetElement.nodeName.toLocaleLowerCase();xpathList.push(xpath);NNN(targetElement,xpath,prevXpath,xpathList); var blob=new Blob([JSON.stringify(xpathList)],{type:"text/plain"}),url=URL.createObjectURL(blob),a=document.createElement("a");document.body.appendChild(a);a.download="xpath-all.json";a.href=url;a.click();a.remove();URL.revokeObjectURL(url);})()')
}

