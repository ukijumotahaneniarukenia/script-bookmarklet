/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
/// <reference path="./type-manage/node_modules/@types/d3/index.d.ts" />

// https://cdnjs.com/libraries/d3
// https://github.com/d3/d3
// https://github.com/d3/d3/blob/master/API.md
// https://www.d3-graph-gallery.com/intro_d3js.html

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

async function setEncoding() {
  return new Promise((resolve, reject) => {
    let meta = document.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    document.head.appendChild(meta);
    resolve("setEncoding is OK");
  });
}

async function includeExternalLibrary() {
  let includScriptLibraryList = [
    "https://d3js.org/d3.v4.js",
    "https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js",
  ];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includScriptLibraryList.length; index++) {
      let targetScriptLibrary = includScriptLibraryList[index];
      let scriptLibrary = document.createElement("script");
      scriptLibrary.setAttribute("type", "text/javascript");
      scriptLibrary.setAttribute("src", targetScriptLibrary);
      document.head.appendChild(scriptLibrary);
    }
    resolve("includeExternalLibrary is OK");
  });
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.createElement("div");
    targetDom.setAttribute("id", "app");
    document.body.appendChild(targetDom);
    resolve("createTargetDom is OK");
  });
}

async function renderChart() {
  // https://www.d3-graph-gallery.com/graph/interactivity_zoom.html
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let myWords = [
        { word: "Running", size: "10" },
        { word: "Surfing", size: "20" },
        { word: "Climbing", size: "50" },
        { word: "Kiting", size: "30" },
        { word: "Sailing", size: "20" },
        { word: "Snowboarding", size: "60" },
      ];

      // set the dimensions and margins of the graph
      let margin = { top: 10, right: 10, bottom: 10, left: 10 };
      let width = 450 - margin.left - margin.right;
      let height = 450 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      let svg = d3
        .select("#app")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
      // Wordcloud features that are different from one word to the other must be here
      let layout = d3.layout
        .cloud()
        .size([width, height])
        .words(
          myWords.map((item) => {
            return { text: item.word, size: item.size };
          })
        )
        .padding(5) //space between words
        .rotate(() => {
          return ~~(Math.random() * 2) * 90;
        })
        .fontSize((item) => {
          return item.size;
        }) // font size of words
        .on("end", draw);
      layout.start();

      // This function takes the output of 'layout' above and draw the words
      // Wordcloud features that are THE SAME from one word to the other can be here
      function draw(words) {
        svg
          .append("g")
          .attr(
            "transform",
            "translate(" +
              layout.size()[0] / 2 +
              "," +
              layout.size()[1] / 2 +
              ")"
          )
          .selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (item) => {
            return item.size;
          })
          .style("fill", "#69b3a2")
          .attr("text-anchor", "middle")
          .style("font-family", "Impact")
          .attr("transform", (item) => {
            return (
              "translate(" + [item.x, item.y] + ")rotate(" + item.rotate + ")"
            );
          })
          .text((item) => {
            return item.text;
          });
      }

      resolve("renderChart is OK");
    }, 3000);
  });
}

async function main() {
  setContentSecurityPolicy()
    .then((res) => {
      console.log(res);
      return setEncoding();
    })
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
