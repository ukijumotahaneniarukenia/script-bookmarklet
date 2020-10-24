function openWindow(targetUrl, executeScript) {
  let targetHtml = document.body.innerHTML;
  let targetWindow = window.open(targetUrl);
  targetWindow.document.head.innerHTML = '<title>Hi</title></head>';
  targetWindow.document.body.innerHTML = '<body>' + targetHtml + '</body>';
  let targetScript = document.createElement('script');
  targetScript.textContent = executeScript;
  targetWindow.document.head.appendChild(targetScript);
}

let targetUrl = prompt('Please Input Url');

// Input Pattern 1 null >>> can execute
// Input Pattern 2 '' >>> can execute
// Input Pattern 3 'https://data.city.kyoto.lg.jp/' >>> can not execute
openWindow(targetUrl, '(function (){function NNN(b,a,e,c){if("html"===b.nodeName.toLocaleLowerCase()){b=b.children;for(var d=0;d<b.length;d++)a=e+"/"+b[d].nodeName.toLocaleLowerCase(),c.push(a),NNN(b[d],a,a,c)}else for(b=document.evaluate(a,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),d=0;d<b.snapshotLength;d++)for(var h=b.snapshotItem(d).children,f=0;f<h.length;f++){var k=h[f].nodeName.toLocaleLowerCase(),l=document.evaluate(e+"/"+k,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);if(1===l.snapshotLength)a=e+"/"+k,c.includes(a)||(c.push(a),NNN(h[f],a,a,c));else for(var g=0;g<l.snapshotLength;g++){var m=l.snapshotItem(g);a=e+"/"+k+"["+(g+1).toString()+"]";c.includes(a)||(c.push(a),NNN(m,a,a,c))}}}var xpathList=[],targetElement=document.querySelector("html"),xpath="/"+targetElement.nodeName.toLocaleLowerCase(),prevXpath="/"+targetElement.nodeName.toLocaleLowerCase();xpathList.push(xpath);NNN(targetElement,xpath,prevXpath,xpathList);console.log(xpathList.join("\\n"));})()')
