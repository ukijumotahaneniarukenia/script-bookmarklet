// https://developer.mozilla.org/ja/docs/Web/API/Element/mouseup_event
// https://stackoverflow.com/questions/3545018/selected-text-event-trigger-in-javascript
// https://stackoverflow.com/questions/20951014/getting-selection-colors-in-javascript
async function setUpColorizeSelectedText() {
  return new Promise((resolve, reject) => {
    let style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerText = `
    ::selection {
      background: burlywood;
    };
    ::-moz-selection {
      background: burlywood;
    };
    `
    document.head.append(style);
    resolve("setUpColorizeSelectedText is OK");
  });
}

await setUpColorizeSelectedText();
