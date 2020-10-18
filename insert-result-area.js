let targetElement = document.getElementById('displayResultsArea')
if (targetElement !== undefined && targetElement !== null) {
  targetElement.outerHTML = ''
}
let div = document.createElement('textarea');
div.innerHTML = '差し込む文字列';
div.setAttribute("style", "position:fixed; width:100vh;height: 50vh; top: 100px; right: 100px;overflow: auto;resize: both;background-color: rgb(245,241,208);");
div.setAttribute('id', 'displayResultsArea');
document.body.appendChild(div);
