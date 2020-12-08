// https://qiita.com/saka212/items/9b6cfe06b464580c2ee6#then%E3%81%A7%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%99%E9%96%A2%E6%95%B0%E3%81%AB%E5%BC%95%E6%95%B0%E3%82%92%E6%B8%A1%E3%81%99

// 1回目のプロミス解決結果を2回目のPromiseのコンテキストで暗黙的にもちわまることができる

Promise.resolve()
  .then(task1.bind(this, 'うんこ'))
  .then(task2.bind(this, ['モリモリ', {MORIOUGAI:'モリオウガイ'}], [{hiraMoriMori : 'もりもり', kanjiMoriOugai: '森鴎外'}], ['ｳﾝｺ' ,'ﾓﾘﾓﾘ', 'ﾓﾘｵｳｶﾞｲ'], {hello: 'こんにちは'}))
  .then((value) => {
    return new Promise((resolve, reject) => {
      console.log(value); // task2 完了!
      console.log('task3 完了!');
      resolve();
    });
  })

function task1(msg){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let item = {
        unko: "うんこ",
        morimori: "もりもり",
        ougai: "森鴎外",
      };
      console.log('task1 処理中...');
      console.log('task1 完了!');
      resolve([item, msg]); // 配列にして次の処理へ
    }, 1000);
  });
}

function task2(value0, value1, value2, value3, preprocessResultList){ // 前回のプロミス結果は末尾引数で受け取れる
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(preprocessResultList)
      preprocessResultList.map((item) => {
        console.log(item) // 0: {unko: "うんこ", morimori: "もりもり", ougai: "森鴎外"}, 1:うんこ
      })
      console.log('task2 処理中...');
      console.log(value0) //
      console.log(value0[0]);   //  モリモリ
      console.log(value0[1]);   //  {MORIOUGAI: "モリオウガイ"}
      console.log(value1) // 0: {hiraMoriMori: "もりもり", kanjiMoriOugai: "森鴎外"}
      console.log(value1[0]);  //  {hiraMoriMori: "もりもり", kanjiMoriOugai: "森鴎外"}
      console.log(value2) // ["ｳﾝｺ", "ﾓﾘﾓﾘ", "ﾓﾘｵｳｶﾞｲ"]
      console.log(value2[0]);  //  ｳﾝｺ
      console.log(value2[1]);  //  ﾓﾘﾓﾘ
      console.log(value2[2]);  //  ﾓﾘｵｳｶﾞｲ
      console.log(value3) // {hello: "こんにちは"}
      resolve('task2 完了!');
    }, 1000);
  });
}
