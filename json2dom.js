let decoder = {}

decoder.getJsonToHtmlString = function (json_string) {
  return decoder.getArrayToHtmlString(JSON.parse(json_string))
}

decoder.getArrayToHtmlString = function (dom_array) {
  // https://qiita.com/wakisuke/items/f51729b28c7e1f7325f5
  /*
   * decoder.getArrayToHtmlString(dom_array)
   *
   * dom_arrayから、element, attribute, textを基にdomを生成、
   * childrenが存在している場合再帰させ、dhildren要素を作成後にdomへ子要素として追加
   */
  let getDomDomelement = function (dom_array) {
    let element = null

    if (typeof dom_array['element'] !== 'undefined') {
      element = document.createElement(dom_array['element'])

      if (typeof dom_array['text'] !== 'undefined') element.innerText = dom_array['text']

      if (typeof dom_array['attribute'] !== 'undefined') {
        for (let attributekey_string in dom_array['attribute']) {
          let node = document.createAttribute(attributekey_string)
          node.value = dom_array['attribute'][attributekey_string]

          element.setAttributeNode(node)
        }
      }

      if (typeof dom_array['children'] !== 'undefined') {
        if (Array.isArray(dom_array['children'])) {
          for (let childelement_num in dom_array['children']) {
            element.appendChild(
              // ここでgetDomDomelementを再帰呼び出し
              // TODO 結果DOMを持ち回るように修正
              arguments.callee(dom_array['children'][childelement_num])
            )
          }
        }
      }
    }

    return element
  }

  let main = function (dom_array) {
    let root = document.createElement('root')

    if (Array.isArray(dom_array)) {
      for (let key in dom_array) {
        root.appendChild(getDomDomelement(dom_array[key]))
      }
    }

    return root
  }

  return main(dom_array).innerHTML
}

let jsondata_string = `
[
  {
    "element": "div",
    "attribute": {
      "id": "top",
      "class": "text"
    },
    "children": [
      {
        "element": "div",
        "attribute": {
          "class": "text",
          "data-test_data": "test data !"
        },
        "children": [
          {
            "element": "p",
            "text": "No.",
            "children": [
              {
                "element": "b",
                "text": "1"
              }
            ]
          }
        ]
      },
      {
        "element": "div",
        "attribute": {
          "class": "text",
          "data-test_data": "test data !!"
        },
        "children": [
          {
            "element": "p",
            "text": "No.",
            "children": [
              {
                "element": "b",
                "text": "2"
              }
            ]
          }
        ]
      },
      {
        "element": "div",
        "attribute": {
          "class": "text",
          "data-test_data": "test data !!!"
        },
        "children": [
          {
            "element": "p",
            "text": "No.",
            "children": [
              {
                "element": "b",
                "text": "3"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "element": "p",
    "attribute": {
      "id": "end"
    },
    "text": "JSON TO HTML SAMPLE"
  }
]
`

let jsondata_object = [
  {
    element: 'div',
    attribute: {
      id: 'top',
      class: 'text',
    },
    children: [
      {
        element: 'div',
        attribute: {
          class: 'text',
          'data-test_data': 'test data !',
        },
        children: [
          {
            element: 'p',
            text: 'No.',
            children: [
              {
                element: 'b',
                text: '1',
              },
            ],
          },
        ],
      },
      {
        element: 'div',
        attribute: {
          class: 'text',
          'data-test_data': 'test data !!',
        },
        children: [
          {
            element: 'p',
            text: 'No.',
            children: [
              {
                element: 'b',
                text: '2',
              },
            ],
          },
        ],
      },
      {
        element: 'div',
        attribute: {
          class: 'text',
          'data-test_data': 'test data !!!',
        },
        children: [
          {
            element: 'p',
            text: 'No.',
            children: [
              {
                element: 'b',
                text: '3',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: 'p',
    attribute: {
      id: 'end',
    },
    text: 'JSON TO HTML SAMPLE',
  },
]

let tmpDom = document.createElement('div')
tmpDom.innerHTML = decoder.getJsonToHtmlString(jsondata_string)
document.body.appendChild(tmpDom)

console.log(decoder.getJsonToHtmlString(jsondata_string))
