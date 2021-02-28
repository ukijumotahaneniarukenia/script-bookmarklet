// https://www.chartjs.org/docs/latest/
// https://github.com/chartjs/Chart.js

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
    scriptLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js')
    document.head.appendChild(scriptLibrary)
    resolve('includeExternalLibrary is OK')
  })
}

async function createTargetDom() {
  return new Promise((resolve, reject) => {
    let targetDom = document.createElement('canvas')
    targetDom.setAttribute('id', 'target-chart')
    targetDom.setAttribute('style', 'width: 400px;height:400px;')
    document.body.appendChild(targetDom)
    resolve('createTargetDom is OK')
  })
}

async function renderChart() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let ctx = document.getElementById('target-chart').getContext('2d')
      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      })
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
