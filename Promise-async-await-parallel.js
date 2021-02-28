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
      resolve('resolved after ' + waitTimeSeconds + ' Seconds')
    }, waitTimeSeconds * 1000)
  })
}

async function main() {
  console.log('Start')

  Promise.all([processAfterXXXSeconds(5), processAfterXXXSeconds(3), processAfterXXXSeconds(2)])
    .then((message) => {
      console.log(message[0])
      console.log(message[1])
      console.log(message[2])
    })
    .then(() => {
      console.log('End')
    })
}

main()
