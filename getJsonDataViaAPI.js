let targetUrl = prompt('Please Input Url')

console.log(targetUrl)

async function getData(targetUrl) {
  const response = await fetch(targetUrl)
  return response.json()
}

getData(targetUrl).then((data) => {
  console.log(data)
})
