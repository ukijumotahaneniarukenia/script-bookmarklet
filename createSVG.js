// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
async function createCircleSVG(targetMainDomText, endX, endY, delta) {
  return new Promise((resolve, reject) => {
    let parser = new DOMParser();
    doc = parser.parseFromString(targetMainDomText, "text/html");
    let svgns = "http://www.w3.org/2000/svg";
    let targetSVG = doc.body.firstChild;
    for (let x = 0; x < endX; x += delta) {
      for (let y = 0; y < endY; y += delta) {
        let circle = document.createElementNS(svgns, "circle");
        circle.setAttributeNS(null, "cx", x);
        circle.setAttributeNS(null, "cy", y);
        circle.setAttributeNS(null, "r", delta);
        circle.setAttributeNS(
          null,
          "style",
          "fill: none; stroke: blue; stroke-width: 1px;"
        );
        targetSVG.appendChild(circle);
      }
    }
    resolve(doc.body.firstChild);
  });
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    document.body.innerHTML = "";
    resolve("createTargetDom is OK");
  });
}

async function stylingTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.getElementById("app");
    targetDom.setAttribute(
      "style",
      "position: absolute;top: 100px;left:100px;"
    );
    resolve("stylingTargetDom is OK");
  });
}

async function createTargetMainDomText(targetMainDomText, height, width) {
  return new Promise((resolve, reject) => {
    console.log('createTargetMainDomText is OK')
    resolve(
      targetMainDomText
        .replace(/TOBE_REPLACE_HEIGHT/, height)
        .replace(/TOBE_REPLACE_WIDTH/, width)
    );
  });
}


async function main(
  targetMainDomText,
  height,
  width,
  startIndex,
  endIndex,
  delta
) {
  createTargetDom()
    .then(() => {
      return createTargetMainDomText(targetMainDomText, height, width);
    })
    .then((res) => {
      return createCircleSVG(res, startIndex, endIndex, delta);
    })
    .then((res) => {
      document.body.appendChild(res);
      return stylingTargetDom();
    })
    .then((res) => {
      console.log(res);
    });
}

let targetMainDomText = `
<svg id="app" height="TOBE_REPLACE_HEIGHT" width="TOBE_REPLACE_WIDTH" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
</svg>
`;


main(targetMainDomText,1000,1000,500,100,5)
main(targetMainDomText,1000,1000,500,200,10)
main(targetMainDomText,1000,1000,500,300,15)
main(targetMainDomText,1000,1000,500,400,20)
main(targetMainDomText,1000,1000,500,500,25)
main(targetMainDomText,1000,1000,100,500,5)
main(targetMainDomText,1000,1000,200,500,10)
main(targetMainDomText,1000,1000,300,500,15)
main(targetMainDomText,1000,1000,400,500,20)
main(targetMainDomText,1000,1000,500,500,25)
