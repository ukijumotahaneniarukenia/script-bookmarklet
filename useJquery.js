// https://code.jquery.com/
let scriptLibrary = document.createElement('script')
scriptLibrary.setAttribute('type', 'text/javascript')
scriptLibrary.setAttribute('src', 'https://code.jquery.com/jquery-3.5.1.min.js')
scriptLibrary.setAttribute('integrity', 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=')
scriptLibrary.setAttribute('crossorigin', 'anonymous')
document.head.appendChild(scriptLibrary)

console.log(window.jQuery)
console.log($)

jQuery('body').css('background', 'orange')

$('body').css('background', 'whitesmoke')
