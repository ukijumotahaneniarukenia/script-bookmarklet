/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
/// <reference path="./type-manage/node_modules/@types/echarts/index.d.ts" />

// https://echarts.apache.org/en/index.html
// https://echarts.apache.org/en/cheat-sheet.html
// https://github.com/apache/incubator-echarts/tree/4.9.0/dist
// https://cdnjs.com/libraries/echarts

//https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po
async function setContentSecurityPolicy() {
  // void型のreturnのイメージ
  return new Promise((resolve, reject) => {
    let meta = document.createElement("meta");
    meta.setAttribute("http-equiv", "Content-Security-Policy");
    meta.setAttribute(
      "content",
      "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
    );
    document.head.appendChild(meta);
    resolve("setContentSecurityPolicy is OK");
  });
}

async function includeExternalLibrary() {
  return new Promise((resolve, reject) => {
    let scriptLibrary = document.createElement("script");
    scriptLibrary.setAttribute("type", "text/javascript");
    scriptLibrary.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.8.0/echarts.min.js"
    );
    document.head.appendChild(scriptLibrary);
    resolve("includeExternalLibrary is OK");
  });
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.createElement("div");
    targetDom.setAttribute("id", "targetElement");
    targetDom.setAttribute("style", "width: 600px;height:400px;");
    document.body.appendChild(targetDom);
    resolve("createTargetDom is OK");
  });
}

async function renderChart() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let targetChart = echarts.init(document.getElementById("targetElement"))
      targetChart.setOption({
        series: {
          type: "pie",
          data: [
            { name: "A", value: 1212 },
            { name: "B", value: 2323 },
            { name: "C", value: 1919 },
          ],
        },
      });
      resolve("renderChart is OK");
    }, 3000);
  });
}

async function main() {
  setContentSecurityPolicy()
    .then((res) => {
      console.log(res);
      return includeExternalLibrary();
    })
    .then((res) => {
      console.log(res);
      return createTargetDom();
    })
    .then((res) => {
      console.log(res);
      return renderChart();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      console.log("Done");
    });
}

main();
