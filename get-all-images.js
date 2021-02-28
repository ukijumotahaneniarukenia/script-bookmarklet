function formatDateTime(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

let targetrList = document.querySelectorAll('img')

let linkList = []

for (let ele of targetrList) {
  let result = {
    title: ele.title,
    link: ele.src,
    height: ele.height,
    width: ele.width,
    title: ele.title,
    sizes: ele.sizes,
  }
  linkList.push(result)
}

let resultList = Array.from(new Set(linkList))

let timeStamp = formatDateTime(new Date(), 'yyyy-MM-ddTHH-mm-ss')

let blob = new Blob([JSON.stringify(resultList)], { type: 'text/plain' })

let url = URL.createObjectURL(blob)

let a = document.createElement('a')

document.body.appendChild(a)

a.download = 'xpath-info-' + timeStamp + '.json'

a.href = url

a.click()

a.remove()

URL.revokeObjectURL(url)
