// https://www.jsdelivr.com/package/npm/lodash
let scriptLibrary = document.createElement('script')
scriptLibrary.setAttribute('type', 'text/javascript')
scriptLibrary.setAttribute('src', 'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js')
document.head.appendChild(scriptLibrary)

// https://lodash.com/docs/4.17.15
_.chunk(['a', 'b', 'c', 'd'], 2)
