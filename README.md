# script-bookmarklet

呼び出せないから以下でコンパイルしてハードでペタリして管理する運用

https://closure-compiler.appspot.com/home


コンパイルしたコードをURLに登録
```
javascript: TOBE_REPLACE_MY_COMPILED_CODE
```


当てはめ後
```
javascript: alert("\u3046\u3093\u3053");console.log("\u3082\u308a\u3082\u308a");
```

importで呼び出せないもの

```
javascript: void (import('TOBE_REPLACE_IMPORT_JS_PROGRAM_URL').then(m => m.default()));
```

当てはめ後

```
javascript: void (import('https://github.com/ukijumotahaneniarukenia/script-bookmarklet/blob/main/test.js').then(m => m.default()));
```
