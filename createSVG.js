// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
async function createCircleSVG(targetMainDomText,startIndex,endIndex){
  return new Promise((resolve,reject)=>{
    let parser = new DOMParser();
    doc = parser.parseFromString(targetMainDomText, "text/html")
    let svgns = "http://www.w3.org/2000/svg"
    let targetSVG = doc.body.firstChild
    for (let x = 0; x < 500; x += 50) {
        for (let y = 0; y < 300; y += 50) {
            let circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cx', x);
            circle.setAttributeNS(null, 'cy', y);
            circle.setAttributeNS(null, 'r', 50);
            circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
            targetSVG.appendChild(circle);
        }
    }
    resolve(doc.body.firstChild)
  })
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    resolve("createTargetDom is OK");
  });
}

async function main(targetMainDomText,startIndex,endIndex){
  createTargetDom()
    .then(()=>{
      return createCircleSVG(targetMainDomText,startIndex,endIndex)
    })
    .then(res=>{
      console.log(res)
      document.body.appendChild(res)
    })
}

let targetMainDomText = `
<svg id="cont" height="1000" width="1000" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
</svg>
`

main(targetMainDomText,1,1)
