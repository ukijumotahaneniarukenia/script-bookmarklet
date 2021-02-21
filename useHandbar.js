function includeExternalLibrary() {
  let includScriptLibraryList = [
    "https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js",
  ];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includScriptLibraryList.length; index++) {
      let targetScriptLibrary = includScriptLibraryList[index];
      let scriptLibrary = document.createElement("script");
      scriptLibrary.setAttribute("type", "text/javascript");
      scriptLibrary.setAttribute("src", targetScriptLibrary);
      document.head.appendChild(scriptLibrary);
    }
    resolve("includeExternalLibrary is OK");
  });
}

function sketchScriptExecuteHook() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let template = Handlebars.compile("<div>{{doesWhat}}</div>");
      let result = template({ doesWhat: "rocks!" });
      console.log(result);
      let tmpDom = document.createElement("div");
      tmpDom.innerHTML = result;
      document.body.appendChild(tmpDom);
    }, 3000);
    resolve("sketchScriptExecuteHook Ready is OK");
  });
}

function main() {
  includeExternalLibrary()
    .then((res) => {
      console.log(res);
      return sketchScriptExecuteHook();
    })
    .then((res) => {
      console.log(res);
    })
    .finally(() => {
      console.log("Done");
    });
}

main();
