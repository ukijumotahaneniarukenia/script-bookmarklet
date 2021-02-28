let hoge = function (event) {
  //初期化処理
  document.removeEventListener('copy', hoge, true)
  event.preventDefault()
  let clipboardData = event.clipboardData

  //ここにメイン処理

  //メイン処理結果をクリップボードに貼り付け
  clipboardData.setData('text/plain', 'ほげほげほげ')

  //ログ出力
  console.log('ほげほげほげ')
}

//コピーイベントにhogeハンドラをバンドル
document.addEventListener('copy', hoge, true)

//コピーイベント実行
document.execCommand('copy')
