// https://qiita.com/saka212/items/ff61a6de9c3e19810c5d#%E7%9B%B4%E5%88%97%E5%87%A6%E7%90%86%E3%82%92%E7%B9%B0%E3%82%8A%E8%BF%94%E3%81%99
// Promiseのコンテキストで繰り返し制御構造を実現

// 初期化宣言 このPromiseを持ち回ることがポイント
let initPromise = Promise.resolve()

let startIdx = 0
let endIdx = 5
// for (let idx = startIdx; idx < endIdx; idx++) {
//   initPromise = initPromise
//     .then(task1.bind(this, idx))
//     .then(task2)
//   ; // ループ継続時に再代入し続けることでメソッドチェーンを実現
// }

// 再代入せずに実現
for (let idx = startIdx; idx < endIdx; idx++) {
  await task1(idx)
  await task2(idx)
}

// ループで実行する処理
function task1(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task1 : ' + item)
      resolve(item) // 単一の引数を渡す
    }, 1000)
  })
}

function task2(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('task2 : ' + item)
      resolve()
    }, 1000)
  })
}
