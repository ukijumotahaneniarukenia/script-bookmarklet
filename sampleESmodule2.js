class Unko {
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

class Unko2 {
  unko2() {
    let result = 'うんこ2'
    console.log(result)
    return result
  }

  addUnko2(event, targetText) {
    console.log('addUnko2')
    console.log(event)
    let targetDom = document.createElement('div')
    targetDom.innerHTML = targetText
    document.body.appendChild(targetDom)
  }
}

export { Unko, Unko2 }
