function sumByCall() {
  function add(a, b) {
    return a + b
  }
  console.log(arguments)
  return [].reduce.call(arguments, add)
}

console.log(sumByCall(1, 2, 3, 4, 5)) // 15
console.log(sumByCall(1, 3, 5, 7)) // 16
console.log(sumByCall(...[1, 3, 5, 7, 9, 11, 13, 15])) // 64

function sumByCall2(...targetList) {
  function add(a, b) {
    return a + b
  }
  console.log(...targetList)
  return [].reduce.call([...targetList], add)
}

console.log(sumByCall2(1, 2, 3, 4, 5)) // 15
console.log(sumByCall2(1, 3, 5, 7)) // 16
console.log(sumByCall2(...[1, 3, 5, 7, 9, 11, 13, 15])) // 64

function sumByApply(targetList) {
  function add(...args) {
    // apply適用時は可変長引数で対応 単一処理関数がapplyしやすい 繰り返し処理関数は applyしにくい
    return [...args].reduce((a, c) => {
      return a + c
    })
  }
  return add.apply(null, targetList)
}

console.log(sumByApply([1, 2, 3, 4, 5])) // 15
console.log(sumByApply([1, 3, 5, 7])) // 16
console.log(sumByApply([1, 3, 5, 7, 9, 11, 13, 15])) // 64

let calc = {
  add: function (a, b) {
    return a + b
  },
  sum: function () {
    console.log('sum', arguments)
    return [].reduce.call(arguments, this.add)
  },
  sum2: function (...targetList) {
    console.log('sum2', ...targetList)
    console.log('sum2', [...targetList].flat())
    return [].reduce.call([...targetList].flat(), this.add)
  },
  sum3: function (...targetList) {
    console.log('sum3', ...targetList)
    return [].reduce.call([...targetList], this.add)
  },
}

let func = calc.sum.bind(calc, 1, 2, 3)

let func2 = calc.sum2.bind(calc, [1, 2, 3])

let func3 = calc.sum3.bind(calc, 1, 2, 3)

console.log(func()) // 6

console.log(func2()) // 6

console.log(func3()) // 6

console.log(func(4, 5)) // 15

console.log(func2([4, 5])) // 15

console.log(func3(4, 5)) // 15

console.log(func(4, 5, 6)) // 21

console.log(func2([4, 5], [6])) // 21

console.log(func3(4, 5, 6)) // 21
