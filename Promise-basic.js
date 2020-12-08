let initPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('init item')
  }, 1000)
})


await initPromise

initPromise // 上記でプロミスを解決しているので、init itemは２回でない
  .then((response) => {
    console.log('うんこ')
    console.log(response)
  })
