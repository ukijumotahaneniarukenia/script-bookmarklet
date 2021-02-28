let targetText = window.getSelection()

let copyToClipboard = function (e) {
  e.clipboardData.setData('text/plain', targetText)
  e.preventDefault()
  document.removeEventListener('copy', copyToClipboard)
}

document.addEventListener('copy', copyToClipboard)
