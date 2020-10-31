let injectLinkLibraryList = [
  'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
  'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css',
  'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'
]

for (let libIdx = 0; libIdx < injectLinkLibraryList.length; libIdx++) {
  let linkLibraryUrl = injectLinkLibraryList[libIdx];
  linkLibrary = document.createElement('link')
  linkLibrary.setAttribute('rel', 'stylesheet')
  linkLibrary.setAttribute('href', linkLibraryUrl)
  document.head.appendChild(linkLibrary)
}

let injectScriptList = [
  'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js',
  'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js'
]

for (let scriptIdx = 0; scriptIdx < injectScriptList.length; scriptIdx++) {
  let scriptLibraryUrl = injectScriptList[scriptIdx];
  let scriptLibrary = document.createElement('script')
  scriptLibrary.setAttribute('type', 'text/javascript')
  scriptLibrary.setAttribute('src', scriptLibraryUrl)
  document.body.appendChild(scriptLibrary)
}

let entryDom = document.createElement('div')
entryDom.setAttribute('id', 'entryId')

// let domparser = new DOMParser()
​​
// let parseTargetDomText = `
// <template>
//   <div id="component_root">
//     <div>子要素1</div>
//     <div>子要素2</div>
//     <div>子要素3</div>
//   </div>
// </template>
// `
// let doc = domparser.parseFromString(parseTargetDomText, 'text/html')
// console.log(doc)
// document.body.appendChild(entryDom)


// let mainScript = document.createElement('script')
// mainScript.textContent = `
// new Vue({
//   el: '#targetTableId',
//   vuetify: new Vuetify(),
// })
// `
// document.body.appendChild(mainScript)
