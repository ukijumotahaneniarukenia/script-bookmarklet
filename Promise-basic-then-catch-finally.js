let initPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('init item')
  }, 1000)
})

initPromise
  .then((response) => {
    console.log(response)
  })
  .finally(() => {
    console.log('teardown finally 1')
  })

initPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('error'))
  }, 1000)
})

initPromise
  .catch((response) => {
    console.log(response)
  })
  .finally(() => {
    console.log('teardown finally 2')
  })

initPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('error'))
  }, 1000)
})

initPromise
  .catch((response) => {
    console.log(response)
  })
  .finally(() => {
    console.log('teardown finally 3')
  })
