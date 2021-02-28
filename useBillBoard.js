// https://naver.github.io/billboard.js/
// https://naver.github.io/billboard.js/demo/
// https://www.jsdelivr.com/package/npm/chart.js

//window.open('')してから実行

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

async function includeExternalLibrary() {
  return new Promise((resolve, reject) => {
    let scriptLibrary = document.createElement('script')
    scriptLibrary.setAttribute('type', 'text/javascript')
    scriptLibrary.setAttribute('src', 'https://naver.github.io/billboard.js/release/latest/dist/billboard.pkgd.js')
    document.head.appendChild(scriptLibrary)

    let linkLibrary = document.createElement('link')
    linkLibrary.setAttribute('rel', 'stylesheet')
    linkLibrary.setAttribute('href', 'https://naver.github.io/billboard.js/release/latest/dist/theme/insight.css')
    document.head.appendChild(linkLibrary)
    resolve('includeExternalLibrary is OK')
  })
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.createElement('div')
    targetDom.setAttribute('id', 'bubbleChart')
    document.body.appendChild(targetDom)
    resolve('createTargetDom is OK')
  })
}

async function renderChart() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var chart = bb.generate({
        data: {
          columns: [
            ['data1', 30, 350, 200, 380, 150, 250, 50, 80, 55, 220],
            ['data2', 130, 100, 10, 200, 80, 50, 200, 123, 185, 98],
            ['data3', 230, 153, 85, 300, 250, 120, 5, 84, 99, 289],
          ],
          type: 'bubble', // for ESM specify as: bubble()
          labels: true,
        },
        bubble: {
          maxR: 50,
        },
        axis: {
          x: {
            type: 'category',
          },
          y: {
            max: 450,
          },
        },
        bindto: '#bubbleChart',
      })

      setTimeout(function () {
        chart.load({
          columns: [['data1', 100, 50, 150, 200, 100, 350, 58, 210, 80, 126]],
        })
      }, 1000)

      setTimeout(function () {
        chart.load({
          columns: [['data2', 305, 350, 55, 25, 335, 29, 258, 310, 180, 226]],
        })
      }, 2000)

      setTimeout(function () {
        chart.load({
          columns: [['data3', 223, 121, 259, 247, 53, 159, 95, 111, 307, 337]],
        })
      }, 3000)
      resolve('renderChart is OK')
    }, 3000)
  })
}

async function main() {
  setContentSecurityPolicy()
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
