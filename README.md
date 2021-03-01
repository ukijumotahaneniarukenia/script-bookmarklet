# script-bookmarklet
- cssでエラトステネス
  - https://takamos.ooo/css-prime-number/

- web component pure実装サンプル集
  - https://webparts.cman.jp/string/back/

- デバイスサイズの向き検知
  - https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad

- 複雑なイベントハンドラの実行順序制御例
  - https://stackoverflow.com/questions/15101243/how-should-i-make-complex-sequential-events-in-javascript

- ビデオはloadメソッドを呼ぶとイベント発火をいろいろかくにんできる
  - https://stackoverflow.com/questions/13864795/wait-until-an-html5-video-loads

- イベントの完了を待ち合わせするためにプロミスでラップハンドリングするとハンディに制御できそう async function for statement await
  - https://qiita.com/sin_tanaka/items/b17a099d2a6a5e9a94b7

- dom に割りついている CSS プロパティリストを取得できる 便利

  - https://stackoverflow.com/questions/7251804/css-javascript-get-a-list-of-css-custom-attributes

- for 文のインデックスを引数に渡しプロミス化して配列に持ち直す。そのあと Promise.all で処理を解決して実行結果をコールバックで受け取る。

  - 実行順序不同で計算結果のみ受け取りたい場合は便利そう
  - https://qiita.com/progre/items/5666f4a333cc2d032d15#

- サーバサイドでブラウザのオブジェクトを使用したい場合

  - デフォ ssr で dom 単位で部分適用できるらしい
    - https://qiita.com/su_mi1228/items/4e39c2ae5f45413a85be

- Mobx の図

  - https://mobx.js.org/README.html#a-quick-example

- ビデオのカットフレーム

  - https://stackoverflow.com/questions/32699721/javascript-extract-video-frames-reliably

- データバインド機能のフレームワーク

  - https://knockoutjs.com/examples/helloWorld.html

- data 属性の活用

  - https://developer.mozilla.org/ja/docs/Learn/HTML/Howto/Use_data_attributes

- スクロールスピードの制御

  - https://stackoverflow.com/questions/7408100/can-i-change-the-scroll-speed-using-css-or-jquery

- スクリプトタグの属性など。基本 defer でいいと思う。type module との兼ね合い。

  - https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6

- ブックマークレットの作り方

  - https://gist.github.com/caseywatts/c0cec1f89ccdb8b469b1

- 縦スクロールと横スクロールのスウィッチ

  - https://danielcwilson.com/blog/2015/07/animations-part-1/

- DOM の構造チェック

  - https://validator.w3.org/

- UX 等の吟味するサンプルサイト

  - https://codemyui.com/tag/video/

- 画像のレスポンシブ表示

  - https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

- プログラム内での Event 発生

  - https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually

- video 関連のタグ説明

  - https://hakuhin.jp/js/video.html

- サンプル集

  - https://bgrins.github.io/devtools-snippets/

- ディレクトリ構成サンプル

  - https://github.com/testem/testem/tree/master/examples/jshint

- XMLHttpRequest と FetchAPI の比較

  - https://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574

- ショートハンド

  - https://www.webprofessional.jp/shorthand-javascript-techniques/

- スクリプトの定期実行 CHROME 拡張ツール

  - [ScriptAutoRunner](https://chrome.google.com/webstore/detail/scriptautorunner/gpgjofmpmjjopcogjgdldidobhmjmdbm?hl=ja-jp)

- zip merge 関数など

  - https://stackoverrun.com/ja/q/10621834

- javascript の正規表現

  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions

- 音声データの録音
  - https://www.google.com/amp/s/ics.media/entry/200427/

コンパイルしたコードを TOBE_REPLACE_CODE と置き換えブックマークレットに登録

- https://closure-compiler.appspot.com/home

```
javascript: (function (){TOBE_REPLACE_CODE})()
```

chrome bookmark json ファイルが存在するディレクトリ

|   OS    |                               PATH                               |
| :-----: | :--------------------------------------------------------------: |
| windows |   HOME\AppData\Local\Google\Chrome\User Data\Default\bookmarks   |
| darwin  | HOME/Library/Application Support/Google/Chrome/Default/Bookmarks |
|  linux  |                HOME/.config/google-chrome/Default                |
