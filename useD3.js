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
    let meta = document.createElement('meta')
    meta.setAttribute('http-equiv', 'Content-Security-Policy')
    meta.setAttribute('content', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    document.head.appendChild(meta)
    resolve('setContentSecurityPolicy is OK')
  })
}

async function setEncoding() {
  return new Promise((resolve, reject) => {
    let meta = document.createElement('meta')
    meta.setAttribute('charset', 'utf-8')
    document.head.appendChild(meta)
    resolve('setEncoding is OK')
  })
}

async function includeExternalLibrary() {
  let includScriptLibraryList = ['https://d3js.org/d3.v4.js']
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includScriptLibraryList.length; index++) {
      let targetScriptLibrary = includScriptLibraryList[index]
      let scriptLibrary = document.createElement('script')
      scriptLibrary.setAttribute('type', 'text/javascript')
      scriptLibrary.setAttribute('src', targetScriptLibrary)
      document.head.appendChild(scriptLibrary)
    }
    resolve('includeExternalLibrary is OK')
  })
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.createElement('div')
    targetDom.setAttribute('id', 'app')
    document.body.appendChild(targetDom)
    resolve('createTargetDom is OK')
  })
}

async function renderChart() {
  // https://www.d3-graph-gallery.com/graph/interactivity_zoom.html
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let svg = d3
        .select('#app')
        .append('svg')
        .attr('width', 460)
        .attr('height', 460)
        .call(
          d3.zoom().on('zoom', function () {
            svg.attr('transform', d3.event.transform)
          })
        )
        .append('g')

      svg.append('circle').attr('cx', 300).attr('cy', 300).attr('r', 40).style('fill', '#68b2a1')
      resolve('renderChart is OK')
    }, 3000)
  })
}

async function main() {
  setContentSecurityPolicy()
    .then((res) => {
      console.log(res)
      return setEncoding()
    })
    .then((res) => {
      console.log(res)
      return includeExternalLibrary()
    })
    .then((res) => {
      console.log(res)
      return createTargetDom()
    })
    .then((res) => {
      console.log(res)
      return renderChart()
    })
    .catch((res) => {
      console.log(res)
    })
    .finally(() => {
      console.log('Done')
    })
}

main()
