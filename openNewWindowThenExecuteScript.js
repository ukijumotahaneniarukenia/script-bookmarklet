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
openWindow(targetUrl, 'console.log("うんこ")')
