node標準の型補完を導入

```
$ mkdir -p $HOME/script-bookmarklet/type-manage

$ cd $HOME/script-bookmarklet/type-manage

$ npm install --save @types/node
```

index.d.tsのファイルパスを調査

```
$ find -type f | grep index.d.ts | sort
./type-manage/node_modules/@types/node/index.d.ts
./type-manage/node_modules/@types/node/ts3.4/index.d.ts
./type-manage/node_modules/@types/node/ts3.6/index.d.ts
```

jsスクリプトの先頭に以下を追加

```
/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
```
