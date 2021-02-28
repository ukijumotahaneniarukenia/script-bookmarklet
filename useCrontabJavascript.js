/// <reference path="./type-manage/node_modules/@types/node/index.d.ts" />
/// <reference path="./type-manage/node_modules/@types/node-schedule/index.d.ts" />

// https://www.npmjs.com/package/node-schedule
// https://www.jsdelivr.com/package/npm/node-schedule

//https://stackoverflow.com/questions/31211359/refused-to-load-the-script-because-it-violates-the-following-content-security-po
async function setContentSecurityPolicy() {
  // void型のreturnのイメージ
  return new Promise((resolve, reject) => {
    let meta = document.createElement('meta')
    meta.setAttribute('http-equiv', 'Content-Security-Policy')
    meta.setAttribute('content', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
    document.head.appendChild(meta)
    resolve('setContentSecurityPolicy is OK')
  })
}

async function setEncoding() {
  return new Promise((resolve, reject) => {
    let meta = document.createElement('meta')
    meta.setAttribute('charset', 'utf-8')
    document.head.appendChild(meta)
    resolve('setEncoding is OK')
  })
}

async function includeExternalLibrary() {
  let includScriptLibraryList = ['https://cdn.jsdelivr.net/npm/node-schedule@1.3.2/lib/schedule.min.js']
  return new Promise((resolve, reject) => {
    for (let index = 0; index < includScriptLibraryList.length; index++) {
      let targetScriptLibrary = includScriptLibraryList[index]
      let scriptLibrary = document.createElement('script')
      scriptLibrary.setAttribute('type', 'text/javascript')
      scriptLibrary.setAttribute('src', targetScriptLibrary)
      document.head.appendChild(scriptLibrary)
    }
    resolve('includeExternalLibrary is OK')
  })
}

async function main() {
  setContentSecurityPolicy()
    .then((res) => {
      console.log(res)
      return setEncoding()
    })
    .then((res) => {
      console.log(res)
      return includeExternalLibrary()
    })
    .then((res) => {
      console.log(res)
    })
    .catch((res) => {
      console.log(res)
    })
    .finally(() => {
      console.log('Done')
    })
}

main()
