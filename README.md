# script-bookmarklet

- CSS命名などのメタないい感じの話
  - https://qiita.com/Takazudo/items/5180f5eb6d798a52074f

- 単一のDOMに複数のイベントハンドラを設定する
  - https://stackoverflow.com/questions/11845678/adding-multiple-event-listeners-to-one-element

- Javascript Performance
  - https://ics.media/entry/190731/

- web rtc仕組み
  - https://www.google.com/amp/s/blog.jxck.io/entries/2020-09-01/webcodecs-webtransport-chat.amp.html

- 素のイベントをラップした独自イベントを使用しているのでdata-属性を使っていれば大丈夫そう
  - https://stackoverflow.com/questions/37639122/using-event-target-with-react-components
  - https://ja.reactjs.org/docs/events.html#gatsby-focus-wrapper

- データ属性などのプロパティにアクセス
  - https://qiita.com/Statham/items/8a07104153973bb25d64

- vanillaのthis挙動 bind必要
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

- イベント処理
  - https://ja.reactjs.org/docs/handling-events.html

- ダイナミックインポート
  - https://ja.reactjs.org/docs/code-splitting.html

- 動的なcssスタイルの生成手法など
  - https://qiita.com/lightnet328/items/218eb1c4a347302cc340

- React複雑なイベントハンドラ関連と名前空間とスコープなど調べたい Fsharpに一瞬見えた
  - https://qiita.com/baby-degu/items/e183b20dd20b20920e00

- Object と DOM区別方法
  - https://stackoverflow.com/questions/9979172/difference-between-node-object-and-element-object

- 遅延読み込み
  - https://web.dev/lazy-loading-video/
  - https://web.dev/lazy-loading-images/
  - https://github.com/malchata/yall.js
  - https://github.com/ApoorvSaxena/lozad.js

- canvasタグをちょっといろいろ使い勝手調べたい
  - https://ja.javascript.info/blob
  - https://github.com/niklasvh/html2canvas
  - https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
  - https://stackoverflow.com/questions/27251953/how-to-create-file-object-from-blob

- 迷路で遊べる
  - https://algoful.com/Archive/Algorithm/LifeGame

- ブラウザのキャッシュ
  - https://qiita.com/hkusu/items/d40aa8a70bacd2015dfa

- いい感じのスレ
  - https://jp.quora.com/%E6%9C%80%E8%BF%91jQuery%E3%82%88%E3%82%8A%E3%82%82React%E3%81%A8%E8%81%9E%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B-%E3%81%93%E3%82%8C%E3%81%AF%E6%AD%A3%E8%A7%A3%E3%81%A7%E3%81%99%E3%81%8B/answers/128799664?ch=10&share=fcb95d36&srid=A4DrS

- JavaScript スタイルガイド
  - https://google.github.io/styleguide/jsguide.html

- CSSセレクタをidとclass両方で指定できる ハンディそうなパタンだ
  - http://var.blog.jp/archives/26950294.html

- styleノードはremoveじゃなくてproperty単位でremove
  - https://stackoverflow.com/questions/18691655/remove-style-on-element

- pure js remove event handler
  - https://webkatu.com/201405152355-remove-eventlistener/
  - https://stackoverflow.com/questions/5660131/how-to-removeeventlistener-that-is-addeventlistener-with-anonymous-function#answer-5660165

- イベント間引き
  - https://www.webprofessional.jp/throttle-scroll-events/

- 実装している人すごすぎ
  - https://www.google.com/search?q=how+to+extract+applyed+css&oq=how+to+extract+applyed+css+&aqs=chrome..69i57.14568j1j1&sourceid=chrome&ie=UTF-8

- SCSS記法
  - https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1

- Chrome Dev Tool
  - https://www.keycdn.com/blog/chrome-devtools

- セレクタ点数
  - https://www.slideshare.net/mobile/yumi-uniq-ishizaki/css-13918388
  - https://specificity.keegan.st/

- 便利そう ポリフィルいろんなのある
  - https://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
  - https://stackoverflow.com/questions/2952667/find-all-css-rules-that-apply-to-an-element
  - https://gist.github.com/ssafejava/6605832
  - http://www.brothercake.com/site/resources/scripts/cssutilities/
  - https://gist.github.com/search?q=%22getMatchedCSSRules%22&ref=searchresults

- 胸熱な実装
  - https://gist.github.com/PaulKinlan/6284142
  - 便利そうなファンクション名だ
    - createTreeWalker
    - getMatchedCSSRules

- DOMにスタイル割り付ける
  - https://davidwalsh.name/css-variables-javascript

- 外部CSSファイルをブラウザ上でコピってDOMに手動でstyleタグに追加する
  - https://css-tricks.com/can-you-view-print-stylesheets-applied-directly-in-the-browser/

- deep dom

  - https://github.com/dontcallmedom/webidlpedia

- dom 継承関係図 参考になりそう

  - https://stackoverflow.com/questions/39344977/the-dom-inheritance-structure

- Css プロパティのグルーピングは tailwindcss から逆算したほうが早そうで便利そう
  - 各フレームワークごとにコンポーネント単位で串チェックするとパターン見えてきそう
    - https://tailwindcss.com/
    - https://tailwindcss.com/docs/container
    - https://qiita.com/cubenoy22/items/3ccce86cf128c96a079d
    - https://primer.style/css/components/timeline
    - https://qiita.com/shierote/items/047dd9ab483b4a7bec6f
  - アウトプットイメージ
    - https://github.com/avigoldman/css-groups

- Css リンタを使った逆算

  - https://qiita.com/oh_rusty_nail/items/12e5783a9630a6905b1e

- Tab UI すごい

  - https://web.dev/building-a-tabs-component/

- UI 参考になる

  - https://wave.video/
  - https://wave.video/blog/royalty-free-music/

- モバイル向けフレームワーク

  - https://ja.onsen.io/

- 各ベンダ開発ブログ

  - https://dev.opera.com/

- css セレクタ

  - https://www.w3schools.com/cssref/css_selectors.asp
  - https://css-tricks.com/almanac/selectors/

- Vue Composition

  - https://qiita.com/ryo2132/items/f055679e9974dbc3f977#comments

- コーデックの調べ方

  - https://stackoverflow.com/questions/22996665/unable-to-get-mediasource-working-with-mp4-format-in-chrome
  - http://var.blog.jp/archives/82006076.html
  - https://medium.com/@JackPu/how-js-get-video-codec-548a33cf7454

- Web Component

  - https://techtekt.persol-career.co.jp/entry/tech/200707_01
  - https://ja.javascript.info/webcomponents-intro
  - https://laboradian.com/web-components-samples/
  - https://developer.mozilla.org/ja/docs/Web/API/CustomElementRegistry
  - https://nulab.com/ja/blog/cacoo/web-components/

- css でエラトステネス

  - https://takamos.ooo/css-prime-number/

- web component pure 実装サンプル集

  - https://webparts.cman.jp/string/back/

- デバイスサイズの向き検知

  - https://stackoverflow.com/questions/4917664/detect-viewport-orientation-if-orientation-is-portrait-display-alert-message-ad

- 複雑なイベントハンドラの実行順序制御例

  - https://stackoverflow.com/questions/15101243/how-should-i-make-complex-sequential-events-in-javascript

- ビデオは load メソッドを呼ぶとイベント発火をいろいろかくにんできる

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
