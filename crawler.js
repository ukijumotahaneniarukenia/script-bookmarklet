async function hoge(crawlPatternInfoList) {
  let xpathList = getAllXpath('/html')

  let resultMergeInfoList
  for (let crawlPatternIndex = 0; crawlPatternIndex < crawlPatternInfoList.length; crawlPatternIndex++) {
    const selectColumnInfoList = crawlPatternInfoList[crawlPatternIndex].selectColumnInfoList
    const downloadFileName = crawlPatternInfoList[crawlPatternIndex].downloadFileName

    for (let selectColumnInfoIndex = 0; selectColumnInfoIndex < selectColumnInfoList.length; selectColumnInfoIndex++) {
      const selectColumnInfo = selectColumnInfoList[selectColumnInfoIndex]

      let targetXpathList = []
      let resultInfoList = []
      for (let patternMatchIndex = 0; patternMatchIndex < selectColumnInfo.patternMatchList.length; patternMatchIndex++) {
        const patternMatchInfo = selectColumnInfo.patternMatchList[patternMatchIndex]

        let re = new RegExp(patternMatchInfo.filterRegPtn + '(.*?)', 'g')

        targetXpathList = targetXpathList.concat(
          xpathList.filter((e) => {
            return re.exec(e) != null
          })
        )

        resultInfoList = resultInfoList.concat(extractDetailInfo(targetXpathList, patternMatchInfo.selectColumn, selectColumnInfo.name))

        if (selectColumnInfoIndex === 0) {
          resultMergeInfoList = new Array(resultInfoList.length).fill({})
        }

        resultMergeInfoList = zipMerge(resultMergeInfoList, resultInfoList)
      }
    }

    download(resultMergeInfoList, downloadFileName)
  }

  function zip(...arys) {
    return arys[0].map((_, idx) => {
      return arys.map((ary) => {
        return ary[idx]
      })
    })
  }

  function merge(self, other) {
    return Object.assign(self, other)
  }

  function zipMerge(...arys) {
    return zip(...arys).map((columns) => {
      return columns.reduce(merge, {})
    })
  }

  function download(targetData, downloadFileName) {
    const blob = new Blob([JSON.stringify(targetData)], { type: 'text/plain' })

    const timeStamp = formatDateTime(new Date(), 'yyyy-MM-ddTHH-mm-ss')

    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')

    document.body.appendChild(a)

    a.download = `${downloadFileName + '-' + timeStamp + '.json'}`

    a.href = url

    a.click()

    a.remove()

    URL.revokeObjectURL(url)
  }

  function extractDetailInfo(targetXpathList, selectColumn, selectKeyName) {
    // ここはいずれラッパーになってほしい
    let resultList = []
    for (let xpathIndex = 0; xpathIndex < targetXpathList.length; xpathIndex++) {
      const xpath = targetXpathList[xpathIndex]

      let iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

      let targetDom = iterator.snapshotItem(0)
      let targetText = ''
      if (selectColumn === 'text') {
        targetText = targetDom.textContent
      } else {
        targetText = targetDom.getAttribute(selectColumn)
      }
      let entry = JSON.parse(`{"${selectKeyName}": "${targetText}"}`)
      resultList.push(entry)
    }
    return resultList
  }

  function formatDateTime(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
    return format
  }

  function listUpAllXpath(xpath, prevXpath, xpathList) {
    // タグ名が同一か問わず、同一階層に存在しているすべての子ノードリストを取得
    let iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) // それ自身単一の場合ないしそれ自身複数の場合

    for (let childIdx = 0; childIdx < iterator.snapshotLength; childIdx++) {
      // あれば通るしなければ以下は通らない

      let currentElement = iterator.snapshotItem(childIdx)

      let same_hierarchy_children_list = currentElement.children // それ自身の配下の子ノードを取得

      for (let hieIdx = 0; hieIdx < same_hierarchy_children_list.length; hieIdx++) {
        // あれば通るしなければ以下は通らない

        let childElement = same_hierarchy_children_list[hieIdx].nodeName.toLocaleLowerCase()

        // 同一タグ名に対して連番を付与するために取得
        let same_tag_hierarchy_children_list = document.evaluate(
          prevXpath + '/' + childElement,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        )

        if (same_tag_hierarchy_children_list.snapshotLength === 1) {
          // 単一の場合

          xpath = prevXpath + '/' + childElement

          // 前回訪問済みの場合はスキップ
          if (xpathList.includes(xpath)) {
            continue
          }

          xpathList.push(xpath)

          listUpAllXpath(xpath, xpath, xpathList)
        } else {
          // 複数の場合

          for (let sameIdx = 0; sameIdx < same_tag_hierarchy_children_list.snapshotLength; sameIdx++) {
            let currentElement = same_tag_hierarchy_children_list.snapshotItem(sameIdx)

            xpath = prevXpath + '/' + childElement + '[' + (sameIdx + 1).toString() + ']'

            // 前回訪問済みの場合はスキップ
            if (xpathList.includes(xpath)) {
              continue
            }

            xpathList.push(xpath)

            listUpAllXpath(xpath, xpath, xpathList)
          }
        }
      }
    }
  }

  function getAllXpath(entryXpath) {
    let xpathList = []
    let prevXpath = entryXpath

    xpathList.push(entryXpath)

    listUpAllXpath(entryXpath, prevXpath, xpathList)

    return xpathList
  }
}
hoge([
  {
    downloadFileName: 'gigazine',
    url: 'https://gigazine.net/',
    selectColumnInfoList: [
      {
        name: 'Link',
        patternMatchList: [
          {
            filterRegPtn: '\\/div\\/div\\[2\\]\\/time\\/a$',
            selectColumn: 'href',
          },
        ],
      },
      {
        name: 'DateTime',
        patternMatchList: [
          {
            filterRegPtn: '\\/div\\/div\\[2\\]\\/time\\/a$',
            selectColumn: 'text',
          },
        ],
      },
      {
        name: 'Title',
        patternMatchList: [{ filterRegPtn: '\\/div\\/h2\\/a\\/span$', selectColumn: 'text' }],
      },
      {
        name: 'Category',
        patternMatchList: [
          {
            filterRegPtn: '\\/div\\/div\\[2\\]\\/a\\/span$',
            selectColumn: 'text',
          },
        ],
      },
    ],
  },
  {
    downloadFileName: 'yakiniku',
    url: 'https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2',
    selectColumnInfoList: [
      {
        name: 'Link',
        patternMatchList: [
          {
            filterRegPtn: '\\/h2\\/a$',
            selectColumn: 'href',
          },
        ],
      },
      {
        name: 'Title',
        patternMatchList: [
          {
            filterRegPtn: '\\/h2\\/a$',
            selectColumn: 'title',
          },
        ],
      },
      {
        name: 'Price',
        patternMatchList: [
          {
            filterRegPtn: '\\/div\\[1\\]\\/span\\[1\\]$',
            selectColumn: 'text',
          },
        ],
      },
      {
        name: 'Star',
        patternMatchList: [
          {
            filterRegPtn: '\\/div\\[3\\]\\/div\\[3\\]\\/div\\/div\\/a\\/span\\[6\\]$',
            selectColumn: 'text',
          },
        ],
      },
    ],
  },
  {
    downloadFileName: 'ai-trend',
    url: 'https://ai-trend.jp/basic-study/#basic',
    selectColumnInfoList: [
      {
        name: 'Link',
        patternMatchList: [
          {
            filterRegPtn: '\\/ul\\[[0-9]+\\]\\/li\\[[0-9]+\\]\\/a$',
            selectColumn: 'href',
          },
        ],
      },
      {
        name: 'Title',
        patternMatchList: [
          {
            filterRegPtn: '\\/ul\\[[0-9]+\\]\\/li\\[[0-9]+\\]\\/a$',
            selectColumn: 'text',
          },
        ],
      },
    ],
  },
])
