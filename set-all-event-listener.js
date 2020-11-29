// https://github.com/alex2844/js-events

// オブジェクトの全プロパティを取得する関数が必要

// https://stackoverflow.com/questions/11547672/how-to-stringify-event-object
function eventCatchLogger(event) {
  console.log(event);
  console.log(stringifyObject(event));
}

// https://stackoverflow.com/questions/15312529/resolve-circular-references-from-json-object

function stringifyObject(object, depth=0, max_depth=5) {
  // change max_depth to see more levels, for a touch event, 2 is good
  if (depth > max_depth)
      return 'Object';

  const obj = {};
  for (let key in object) {
      let value = object[key];
      if (value instanceof Node)
          // specify which properties you want to see from the node
          value = {id: value.id};
      else if (value instanceof Window)
          value = 'Window';
      else if (value instanceof Object)
          value = stringifyObject(value, depth+1, max_depth);

      obj[key] = value;
  }

  return depth? obj: JSON.stringify(obj);
}

let allEventList = Object.keys(window).filter((key) => /^on/.test(key));

allEventList.map((event) => {
  document.body.addEventListener(event.slice(2), eventCatchLogger);
});
