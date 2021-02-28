node 標準の型補完を導入

```
$ mkdir -p $HOME/script-bookmarklet/type-manage

$ cd $HOME/script-bookmarklet/type-manage

$ npm install --save @types/node
$ npm install --save @types/echart
$ npm install --save @types/d3
$ npm install --save @types/node-schedule
```

index.d.ts のファイルパスを調査

```
$ find -type f | grep index.d.ts | sort
./type-manage/node_modules/@types/node/index.d.ts
./type-manage/node_modules/@types/node/ts3.4/index.d.ts
./type-manage/node_modules/@types/node/ts3.6/index.d.ts
```

```
$ find type-manage -type f | grep index | ruby -F'/' -anle 'puts case when 5==$F.length;then $F.join("/") else nil end'|sed '/^$/d'
type-manage/node_modules/@types/zrender/index.d.ts
type-manage/node_modules/@types/node/index.d.ts
type-manage/node_modules/@types/echarts/index.d.ts
```

js スクリプトの先頭に以下を追加

```
/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
```

本家型定義ファイルは以下のレポジトリで管理されている

https://github.com/DefinitelyTyped/DefinitelyTyped
