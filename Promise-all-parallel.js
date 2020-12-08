// https://qiita.com/saka212/items/9b6cfe06b464580c2ee6#%E5%90%8C%E6%99%82%E3%81%AB%E5%AE%9F%E8%A1%8C---%E3%81%9D%E3%81%AE%EF%BC%91-%E4%B8%A6%E5%88%97


Promise.all([
  taskA(),  //同時に実行したい関数名
  taskB(),
  taskC()
]);

function taskA(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('taskA 完了!');
      resolve();
    }, 1000);
  });
}

function taskB(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('taskB 完了!');
      resolve();
    }, 3000);
  });
}

function taskC(){
  return new Promise((resolve, reject) => {
    console.log('taskC 完了!');
    resolve();
  });
}
