// https://dev.to/ycmjason/javascript-fetch-retry-upon-failure-3p6g
async function fetchRetry(url, options, n, cnt) {
  try {
    console.log('[ %d ]回目', cnt)
    if (3 !== getRandom(1, 5)) {
      throw new Error('Exception')
    }
    return await fetch(url, options)
  } catch (error) {
    if (n === 1) {
      throw new Error('Max Retry Count End...')
    }
    cnt++
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve() // resolve()を返すのがミソ
      }, 1000)
    )
    return await fetchRetry(url, options, n - 1, cnt)
  }
}

function getRandom(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

fetchRetry('https://httpbin.org/get', {}, 10, 1).then((response) => {
  console.log(response)
})
