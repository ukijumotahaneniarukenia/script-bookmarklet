// https://stackoverflow.com/questions/15312529/resolve-circular-references-from-json-object
// オブジェクトの全プロパティを取得する関数が必要
// https://ja.javascript.info/getting-all-properties
// 再帰でオブジェクトが入れ子になっている場合はやはり難しい。dojoにライブラリがあるが、pureからは使いづらい。

// https://stackoverflow.com/questions/11547672/how-to-stringify-event-object

function stringifyObject(object, depth = 0, max_depth = 5) {
  // change max_depth to see more levels, for a touch event, 2 is good
  if (depth > max_depth) return 'Object'

  const obj = {}
  for (let key in object) {
    let value = object[key]
    if (value instanceof Node)
      // specify which properties you want to see from the node
      value = { id: value.id }
    else if (value instanceof Window) value = 'Window'
    else if (value instanceof Object) value = stringifyObject(value, depth + 1, max_depth)

    obj[key] = value
  }

  return depth ? obj : JSON.stringify(obj)
}
