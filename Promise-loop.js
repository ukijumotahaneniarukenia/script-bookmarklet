// https://qiita.com/saka212/items/ff61a6de9c3e19810c5d
// Promiseのコンテキストで繰り返し制御構造を実現

// 初期化宣言
let initPromise = Promise.resolve()

let startIdx = 0
let endIdx = 5
for (let idx = startIdx; idx < endIdx; idx++) {
  console.log(idx)
  initPromise = initPromise.then(task1.bind(this, idx)) // ループ継続時に再代入し続けることでメソッドチェーンを実現
}

// ループで実行する処理
function task1(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task1 : ' + val)
      resolve() // このresolveは必須 Promiseを返却すること
    }, 1000)
  })
}

// 再代入せずに実現
for (let idx = startIdx; idx < endIdx; idx++) {
  console.log(idx)
  await task1(idx)
}
