// https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
function listToTree(data, options) {
  options = options || {}
  let ID_KEY = options.idKey || 'id'
  let PARENT_KEY = options.parentKey || 'parent'
  let CHILDREN_KEY = options.childrenKey || 'children'

  let tree = [],
    childrenOf = {}
  let item, id, parentId

  for (let i = 0, length = data.length; i < length; i++) {
    item = data[i]
    id = item[ID_KEY]
    parentId = item[PARENT_KEY] || 0
    // every item may have children
    childrenOf[id] = childrenOf[id] || []
    // init its children
    item[CHILDREN_KEY] = childrenOf[id]
    if (parentId != 0) {
      // init its parent's children object
      childrenOf[parentId] = childrenOf[parentId] || []
      // push it into its parent's children object
      childrenOf[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

let list = [
  {
    id: '12',
    parentId: '0',
    text: 'Man',
    level: '1',
    children: null,
  },
  {
    id: '6',
    parentId: '12',
    text: 'Boy',
    level: '2',
    children: null,
  },
  {
    id: '7',
    parentId: '12',
    text: 'Other',
    level: '2',
    children: null,
  },
  {
    id: '9',
    parentId: '0',
    text: 'Woman',
    level: '1',
    children: null,
  },
  {
    id: '11',
    parentId: '9',
    text: 'Girl',
    level: '2',
    children: null,
  },
]

let tree = listToTree(list, {
  idKey: 'id',
  parentKey: 'parentId',
  childrenKey: 'children',
})
console.log(JSON.stringify(tree, null, ' '))
