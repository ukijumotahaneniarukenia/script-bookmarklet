import merge from 'deepmerge'

let a = {}

let b = []

console.log(merge(a, b)) // []

let c = []

let d = {}

console.log(merge(c, d)) // {}

let x = {
  foo: { bar: 3 },
  array: [
    {
      does: 'work',
      too: [1, 2, 3],
    },
  ],
}

let y = {
  foo: { baz: 4 },
  quux: 5,
  array: [
    {
      does: 'work',
      too: [4, 5, 6],
    },
    {
      really: 'yes',
    },
  ],
}

console.log(merge(x, y))

let xx = { bar: 3 }

let yy = { baz: 4 }

console.log(merge(xx, yy)) // { bar: 3, baz: 4 }
