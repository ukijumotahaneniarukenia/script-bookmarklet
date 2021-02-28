// https://qiita.com/saka212/items/9b6cfe06b464580c2ee6#%E8%A4%87%E6%95%B0%E3%81%AE%E5%80%A4%E3%82%92%E5%8F%97%E3%81%91%E6%B8%A1%E3%81%99

let initPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(['うんこ', 'もりもり', '森鴎外'])
  }, 1000)
})

initPromise
  .then((itemList) => {
    console.log(itemList[0]) // うんこ
    console.log(itemList[1]) // もりもり
    console.log(itemList[2]) // 森鴎外
  })
  .finally(() => {
    console.log('teardown finally 1')
  })

initPromise = new Promise((resolve, reject) => {
  let itemList = ['うんこ', 'もりもり', '森鴎外']
  setTimeout(() => {
    resolve(itemList)
  }, 1000)
})

initPromise
  .then((itemList) => {
    let itemCnt = itemList.length
    for (let index = 0; index < itemCnt; index++) {
      const item = itemList[index]
      console.log(item)
    }
  })
  .finally(() => {
    console.log('teardown finally 2')
  })

// 一度プロミスを解決すると再割当てが必要
initPromise = new Promise((resolve, reject) => {
  let itemList = ['うんこ', 'もりもり', '森鴎外']
  setTimeout(() => {
    resolve(itemList)
  }, 1000)
})

initPromise
  .then((itemList) => {
    console.log(itemList[0]) // うんこ
    console.log(itemList[1]) // もりもり
    console.log(itemList[2]) // 森鴎外
  })
  .finally(() => {
    console.log('teardown finally 3')
  })

initPromise = new Promise((resolve, reject) => {
  let item = {
    unko: 'うんこ',
    morimori: 'もりもり',
    ougai: '森鴎外',
  }
  setTimeout(() => {
    resolve(item)
  }, 1000)
})

initPromise
  .then((item) => {
    console.log(item['unko']) // うんこ
    console.log(item['morimori']) // もりもり
    console.log(item['ougai']) // 森鴎外
  })
  .finally(() => {
    console.log('teardown finally 4')
  })

// 一度プロミスを解決すると再割当てが必要
initPromise = new Promise((resolve, reject) => {
  let item = {
    unko: 'うんこ',
    morimori: 'もりもり',
    ougai: '森鴎外',
  }
  setTimeout(() => {
    resolve(item)
  }, 1000)
})

initPromise
  .then((item) => {
    Object.keys(item).map((itemKey) => {
      console.log(item[itemKey])
    })
  })
  .finally(() => {
    console.log('teardown finally 5')
  })
