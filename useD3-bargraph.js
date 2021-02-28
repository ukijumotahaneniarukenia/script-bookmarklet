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
      // set the dimensions and margins of the graph
      var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      var svg = d3
        .select('#app')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // Parse the Data
      d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv', function (data) {
        // X axis
        var x = d3
          .scaleBand()
          .range([0, width])
          .domain(
            data.map(function (d) {
              return d.Country
            })
          )
          .padding(0.2)
        svg
          .append('g')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x))
          .selectAll('text')
          .attr('transform', 'translate(-10,0)rotate(-45)')
          .style('text-anchor', 'end')

        // Add Y axis
        var y = d3.scaleLinear().domain([0, 13000]).range([height, 0])
        svg.append('g').call(d3.axisLeft(y))

        // Bars
        svg
          .selectAll('mybar')
          .data(data)
          .enter()
          .append('rect')
          .attr('x', function (d) {
            return x(d.Country)
          })
          .attr('y', function (d) {
            return y(d.Value)
          })
          .attr('width', x.bandwidth())
          .attr('height', function (d) {
            return height - y(d.Value)
          })
          .attr('fill', '#69b3a2')
      })
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
