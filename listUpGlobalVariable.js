function main() {
  function getIframe() {
    let targetIframe = document.createElement("iframe");
    targetIframe.style.display = "none";
    document.body.appendChild(targetIframe);
    let targetIframeWindow = targetIframe.contentWindow;
    document.body.removeChild(targetIframe);
    return targetIframeWindow;
  }

  function detectGlobals() {
    let targetIframe = getIframe();
    // console.log(targetIframe)
    // console.log(window)
    // iframeとwindowで保持しているプロパティの差分処理
    let result = {};
    for (let prop in window) {
      if (!(prop in targetIframe)) {
        result[prop] = window[prop];
      }
    }

    return result;
  }

  console.log(detectGlobals());
}

main();
