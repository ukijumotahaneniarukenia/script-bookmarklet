// https://qiita.com/saka212/items/ff61a6de9c3e19810c5d#%E7%9B%B4%E5%88%97%E5%87%A6%E7%90%86%E3%82%92%E7%B9%B0%E3%82%8A%E8%BF%94%E3%81%99
// Promiseのコンテキストで繰り返し制御構造を実現

// 初期化宣言 このPromiseを持ち回ることがポイント
let initPromise = Promise.resolve();

let startIdx = 0;
let endIdx = 5;
let isSkip = false; // 変数を持ち回るときなどは便利

for (let idx = startIdx; idx < endIdx; idx++) {
  initPromise = initPromise
    .then(task1.bind(this, [idx, isSkip]))
    .then(task2)
    .finally(() => {
      console.log('teardown by for item')
    })
  ; // ループ継続時に再代入し続けることでメソッドチェーンを実現
}
initPromise
.then(function(){
  return new Promise(function (resolve, reject) {
    // ループ完了後に実行したい処理
    console.log('teardown last finally');
    resolve();
  });
})

// ループで実行する処理
function task1(itemList) {
  return new Promise((resolve, reject) => {
    let idx = itemList[0]
    let isSkip = itemList[1]
    setTimeout(() => {
      console.log("task1 : " + idx);
      if (idx % 2 === 0) {
        isSkip = true;
      }
      resolve([idx, isSkip]); // 複数引数を渡す
    }, 1000);
  });
}

function task2(itemList) {
  return new Promise((resolve, reject) => {
    let idx = itemList[0]
    let isSkip = itemList[1]
    setTimeout(() => {
      if (isSkip) {
        console.log("task2 is skip!![%d]", idx);
      } else {
        console.log("task2 : " + idx);
      }
      resolve();
    }, 1000);
  });
}
