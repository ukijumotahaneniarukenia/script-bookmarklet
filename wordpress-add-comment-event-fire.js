const commentContentTextarea = document.getElementById('comment')
const commentAuthorTextarea = document.getElementById('author')
const commentEmailTextarea = document.getElementById('email')
const commentSubmitButton = document.getElementById('submit')

function addItem(comment, author, email) {
  commentContentTextarea.value = comment
  commentAuthorTextarea.value = author
  commentEmailTextarea.value = email
  let mouseEvent = document.createEvent('MouseEvents')
  mouseEvent.initEvent('click', false, true)
  commentSubmitButton.dispatchEvent(mouseEvent)
}

addItem('javascriptからコメント追加 うんこ', 'unko man', 'just.another.unko.press@example.com')
