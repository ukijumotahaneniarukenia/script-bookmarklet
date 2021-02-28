let targetUrl = prompt('Input Url')

let response = await fetch(targetUrl)

for (let [k, v] of response.headers) {
  console.log(k, v)
}
