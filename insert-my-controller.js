async function setUpMetaDom() {
  return new Promise((resolve, reject) => {
    let meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1");
    document.head.appendChild(meta);
    resolve("setUpMetaDom is OK");
  });
}

async function setUpEncoding() {
  return new Promise((resolve, reject) => {
    let meta = document.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    document.head.appendChild(meta);
    resolve("setUpEncoding is OK");
  });
}

async function setUpExternalLinkLibrary() {
  let includLinkLibraryList = [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
  ];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includLinkLibraryList.length; index++) {
      let targetLinkLibrary = includLinkLibraryList[index];
      let linkLibrary = document.createElement("link");
      linkLibrary.setAttribute("rel", "stylesheet");
      linkLibrary.setAttribute("href", targetLinkLibrary);
      document.head.appendChild(linkLibrary);
    }
    resolve("setUpExternalLinkLibrary is OK");
  });
}

async function setUpStyleDom() {
  let targetStyleDomList = [];
  let myControllerStyle = `
#my-modal {
  position: absolute;
  z-index: 9;
  height: 600px;
  width: 300px;
  background-color: whitesmoke;
  text-align: center;
  border: 1px solid #d3d3d3;
  top: 0;
  right: 0;
}
#my-modal-header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #bbbbbb;
  color: #555555;
}
`;
  let mdiStyle = `
/* https://google.github.io/material-design-icons/ */
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}
.material-icons.md-18 {
  font-size: 18px;
}
.material-icons.md-24 {
  font-size: 24px;
}
.material-icons.md-36 {
  font-size: 36px;
}
.material-icons.md-48 {
  font-size: 48px;
}
  `;
  targetStyleDomList.push(myControllerStyle);
  targetStyleDomList.push(mdiStyle);
  return new Promise((resolve, reject) => {
    for (let index = 0; index < targetStyleDomList.length; index++) {
      let targetStyleDom = targetStyleDomList[index];
      let styleDom = document.createElement("style");
      styleDom.innerHTML = targetStyleDom;
      document.head.appendChild(styleDom);
    }
    resolve("setUpStyleDom is OK");
  });
}

async function setUpMyControllerDom() {
  let myControllerDom = `
<div id="app">
  <div style="position: fixed; top: 10px; right: 10px; z-index: 2147483647">
    <div id="my-modal">
      <div id="my-modal-header">MY CONTROLLER</div>
      <div style="margin: 5px">
        <button
          @click="removeAds($event)"
          class="button is-outlined is-rounded is-info is-fullwidth"
        >
          <span class="material-icons md-24" style="margin-right:5px">music_note</span>
          Info
        </button>
      </div>
    </div>
  </div>
</div>
`;
  return new Promise((resolve, reject) => {
    let tmpDom = document.createElement("div");
    tmpDom.innerHTML = myControllerDom;
    targetMyControllerDom = tmpDom.firstElementChild;
    document.body.appendChild(targetMyControllerDom);
    resolve("setUpMyControllerDom is OK");
  });
}

async function setUpExternalScriptLibrary() {
  let includScriptLibraryList = [
    "https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js",
  ];
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includScriptLibraryList.length; index++) {
      let targetScriptLibrary = includScriptLibraryList[index];
      let scriptLibrary = document.createElement("script");
      scriptLibrary.setAttribute("src", targetScriptLibrary);
      document.body.appendChild(scriptLibrary);
    }
    resolve("setUpExternalScriptLibrary is OK");
  });
}

async function setUpClean() {
  let removeDomList = [];
  let removeScriptDom = `
Array.from(document.querySelectorAll('script')).map(item=>{item.parentNode.removeChild(item)})
`;
  let removeMetaDom = `
  Array.from(document.querySelectorAll('meta')).map(item=>{item.parentNode.removeChild(item)})
  `;
  let removeStyleDom = `
  Array.from(document.querySelectorAll('style')).map(item=>{item.parentNode.removeChild(item)})
  `;
  let removeNoScriptDom = `
  Array.from(document.querySelectorAll('noscript')).map(item=>{item.parentNode.removeChild(item)})
  `;
  let removeLinkDom = `
  Array.from(document.querySelectorAll('link')).map(item=>{item.parentNode.removeChild(item)})
  `;
  // removeDomList.push(removeScriptDom);
  // removeDomList.push(removeMetaDom);
  // removeDomList.push(removeStyleDom);
  // removeDomList.push(removeNoScriptDom);
  // removeDomList.push(removeLinkDom);
  return new Promise((resolve, reject) => {
    for (let index = 0; index < removeDomList.length; index++) {
      let targetRemoveDom = removeDomList[index];
      let scriptDom = document.createElement("script");
      scriptDom.innerHTML = targetRemoveDom;
      document.body.appendChild(scriptDom);
    }
    resolve("setUpHeadClean is OK");
  });
}

async function setUpVueConfig() {
  let myVueConfigDom = `
new Vue({
  el: "#app",
  data: function () {
    return {};
  },
  mounted() {
    this.dragElement(document.getElementById("my-modal"));
    Array.from(document.querySelectorAll("*")).map(targetDom => {
      targetDom.addEventListener("mouseover", (event) => this.removeAds(event))
      window.addEventListener("scroll", (event) => this.removeAds(event))
    })
  },
  methods: {
    removeAds(event) {
      console.log("removeAds");
      console.log(event);
      Array.from(document.querySelectorAll('iframe[id*=google]')).map(item=>{item.parentNode.removeChild(item)})
      Array.from(document.querySelectorAll('iframe')).map(item=>{item.parentNode.removeChild(item)})
      Array.from(document.querySelectorAll('div[class*=Google]')).map(item=>{item.parentNode.removeChild(item)})
      Array.from(document.querySelectorAll('div[id=bnr]')).map(item=>{item.parentNode.removeChild(item)})
      Array.from(document.querySelectorAll('div[id=banner]')).map(item=>{item.parentNode.removeChild(item)})
    },
    dragElement(targetElement) {
      let moveX = 0,
        moveY = 0,
        prevClientX = 0,
        prevClientY = 0;
      if (document.getElementById(targetElement.id + "header")) {
        document.getElementById(
          targetElement.id + "header"
        ).onmousedown = dragStart;
      } else {
        targetElement.onmousedown = dragStart;
      }
      function dragStart(event) {
        event = event || window.event;
        event.preventDefault();
        prevClientX = event.clientX;
        prevClientY = event.clientY;
        document.onmouseup = dragEnd;
        document.onmousemove = dragOver;
      }
      function dragOver(event) {
        event = event || window.event;
        event.preventDefault();
        moveX = prevClientX - event.clientX;
        moveY = prevClientY - event.clientY;
        prevClientX = event.clientX;
        prevClientY = event.clientY;
        targetElement.style.top = targetElement.offsetTop - moveY + "px";
        targetElement.style.left =
          targetElement.offsetLeft - moveX + "px";
      }
      function dragEnd() {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },
  },
});
`;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let scriptDom = document.createElement("script");
      scriptDom.innerHTML = myVueConfigDom;
      document.body.appendChild(scriptDom);
      resolve("setUpVueConfig is OK");
    }, 3000);
  });
}

async function main() {
  setUpClean()
    .then((res) => {
      console.log(res);
      return setUpMetaDom();
    })
    .then((res) => {
      console.log(res);
      return setUpEncoding();
    })
    .then((res) => {
      console.log(res);
      return setUpExternalLinkLibrary();
    })
    .then((res) => {
      console.log(res);
      return setUpStyleDom();
    })
    .then((res) => {
      console.log(res);
      return setUpMyControllerDom();
    })
    .then((res) => {
      console.log(res);
      return setUpExternalScriptLibrary();
    })
    .then((res) => {
      console.log(res);
      return setUpVueConfig();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      console.log("Finish Set up Nak5 Controller!");
    });
}

//https://ezgif.com このサイトに仕込んでおくと捗る
main();
