export class Unko {
  unko() {
    let result = 'うんこ'
    console.log(result)
    return result
  }

  addUnko(event, targetText) {
    console.log('addUnko')
    console.log(event)
    let targetDom = document.createElement('div')
    targetDom.innerHTML = targetText
    document.body.appendChild(targetDom)
  }
}
