/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
/// <reference path="./type-manage/node_modules/@types/mathjs/index.d.ts" />

// https://mathjs.org/download.html
// https://plotly.com/javascript/
// https://plotly.com/

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
  let includScriptLibraryList = ['https://cdn.jsdelivr.net/npm/mathjs@8.0.0/lib/browser/math.min.js', 'https://cdn.plot.ly/plotly-latest.min.js']
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
    let targetApp = document.createElement('div')
    targetApp.setAttribute('id', 'app')
    document.body.appendChild(targetApp)

    let targetForm = document.createElement('form')
    targetForm.setAttribute('id', 'form')

    let targetLabel = document.createElement('label')
    targetLabel.setAttribute('for', 'eq')
    targetLabel.textContent = 'Please Input Math Expression'
    targetForm.appendChild(targetLabel)

    let targetInput = document.createElement('input')
    targetInput.setAttribute('id', 'eq')
    targetInput.setAttribute('type', 'text')
    targetInput.setAttribute('value', '4 * sin(x) + 5 * cos(x/2)')
    targetForm.appendChild(targetInput)

    let targetSubmit = document.createElement('input')
    targetSubmit.setAttribute('value', 'Draw')
    targetSubmit.setAttribute('type', 'submit')
    targetForm.appendChild(targetSubmit)

    document.body.appendChild(targetForm)

    resolve('createTargetDom is OK')
  })
}

async function renderChart() {
  // https://www.d3-graph-gallery.com/graph/interactivity_zoom.html
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      function draw() {
        try {
          // compile the expression once
          const expression = document.getElementById('eq').value
          const expr = math.compile(expression)

          // evaluate the expression repeatedly for different values of x
          const xValues = math.range(-10, 10, 0.5).toArray()
          const yValues = xValues.map((x) => {
            return expr.evaluate({ x: x })
          })

          // render the plot using plotly
          const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter',
          }
          const data = [trace1]
          Plotly.newPlot('app', data)
        } catch (err) {
          console.error(err)
          alert(err)
        }
      }

      document.getElementById('form').addEventListener('submit', (event) => {
        event.preventDefault()
        draw()
      })

      draw()

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
