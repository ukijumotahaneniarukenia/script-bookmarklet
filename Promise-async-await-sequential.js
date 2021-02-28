function watchElapseTimeSeconds(waitTimeSeconds, watchTimeSeconds) {
  let elapsedTimeSeconds = 0
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      console.log('ElapsedTimeSeconds', ++elapsedTimeSeconds)
      if (waitTimeSeconds - 1 === elapsedTimeSeconds) {
        clearInterval(timer)
        resolve(++elapsedTimeSeconds)
      }
    }, watchTimeSeconds * 1000)
  })
}

function processAfterXXXSeconds(waitTimeSeconds) {
  console.log('Start processAfterXXXSeconds', waitTimeSeconds)
  return new Promise((resolve, reject) => {
    watchElapseTimeSeconds(waitTimeSeconds, 1).then((message) => {
      console.log('ElapsedTimeSeconds', message)
    })
    setTimeout(() => {
      resolve('resolved')
    }, waitTimeSeconds * 1000)
  })
}

async function main() {
  console.log('Start')
  const a = await processAfterXXXSeconds(5)
  console.log(a)
  const b = await processAfterXXXSeconds(3)
  console.log(b)
  const c = await processAfterXXXSeconds(2)
  console.log(c)
  console.log('End')
}

main()
