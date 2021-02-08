# script-bookmarklet

- ブックマークレットの作り方
  - https://gist.github.com/caseywatts/c0cec1f89ccdb8b469b1

- 縦スクロールと横スクロールのスウィッチ
  - https://danielcwilson.com/blog/2015/07/animations-part-1/

- DOMの構造チェック
  - https://validator.w3.org/

- UX等の吟味するサンプルサイト
  - https://codemyui.com/tag/video/

- 画像のレスポンシブ表示
  - https://developer.mozilla.org/ja/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

- プログラム内でのEvent発生
  - https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually

- video関連のタグ説明
  - https://hakuhin.jp/js/video.html

- サンプル集
  - https://bgrins.github.io/devtools-snippets/

- ディレクトリ構成サンプル
  - https://github.com/testem/testem/tree/master/examples/jshint

- XMLHttpRequestとFetchAPIの比較
  - https://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574

- ショートハンド
  - https://www.webprofessional.jp/shorthand-javascript-techniques/

- スクリプトの定期実行CHROME拡張ツール
  - [ScriptAutoRunner](https://chrome.google.com/webstore/detail/scriptautorunner/gpgjofmpmjjopcogjgdldidobhmjmdbm?hl=ja-jp)

- zip merge関数など
  - https://stackoverrun.com/ja/q/10621834

- javascriptの正規表現
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions

- 音声データの録音
  - https://www.google.com/amp/s/ics.media/entry/200427/


コンパイルしたコードをTOBE_REPLACE_CODEと置き換えブックマークレットに登録

- https://closure-compiler.appspot.com/home

```
javascript: (function (){TOBE_REPLACE_CODE})()
```

chrome bookmark jsonファイルが存在するディレクトリ

|OS|PATH|
|:-:|:-:|
|windows|HOME\AppData\Local\Google\Chrome\User Data\Default\bookmarks|
|darwin|HOME/Library/Application Support/Google/Chrome/Default/Bookmarks|
|linux|HOME/.config/google-chrome/Default|
