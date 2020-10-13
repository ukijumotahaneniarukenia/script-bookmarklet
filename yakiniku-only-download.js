let zip = (...arys) => {
  return arys[0].map((_, idx) => {
    return arys.map((ary) => {
      return ary[idx];
    });
  });
};

let merge = (self, other) => {
  return Object.assign(self, other);
};

let zipMerge = (...arys) => {
  return zip(...arys).map((columns) => {
    return columns.reduce(merge, {});
  });
};

async function hoge(selectColumnInfoList) {
  let xpathList = [];
  let targetElement = document.querySelector("html");
  let xpath = "/" + targetElement.nodeName.toLocaleLowerCase();
  let prevXpath = "/" + targetElement.nodeName.toLocaleLowerCase();

  xpathList.push(xpath);

  await listUpAllXpath(targetElement, xpath, prevXpath, xpathList);

  let resultMergeInfoList;
  for (
    let infoIndex = 0;
    infoIndex < selectColumnInfoList.length;
    infoIndex++
  ) {
    const selectColumnInfo = selectColumnInfoList[infoIndex];

    let re = new RegExp(selectColumnInfo.filterRegPtn + "(.*?)", "g");

    let targetXpathList = xpathList.filter((e) => re.exec(e) != null);

    let resultInfoList = await extractDetailInfo(
      targetXpathList,
      selectColumnInfo
    );

    if (infoIndex === 0) {
      resultMergeInfoList = new Array(resultInfoList.length).fill({});
    }

    resultMergeInfoList = zipMerge(resultMergeInfoList, resultInfoList);
  }

  // console.log(resultMergeInfoList);
  await download(resultMergeInfoList, "yakiniku.json");

  async function download(targetData, downloadFileName) {
    const blob = new Blob([JSON.stringify(targetData)], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    document.body.appendChild(a);

    a.download = `${downloadFileName}`;

    a.href = url;

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
  }

  async function extractDetailInfo(targetXpathList, selectColumnInfo) {
    // ここはいずれラッパーになってほしい
    let resultList = [];
    for (
      let xpathIndex = 0;
      xpathIndex < targetXpathList.length;
      xpathIndex++
    ) {
      const xpath = targetXpathList[xpathIndex];

      let iterator = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      let targetDom = iterator.snapshotItem(0);

      let resultEntry = {};
      for (
        let columnIndex = 0;
        columnIndex < selectColumnInfo.selectColumnList.length;
        columnIndex++
      ) {
        const selectColumn = selectColumnInfo.selectColumnList[columnIndex];
        if (selectColumn === "text") {
          const targetText = targetDom.textContent;
          let entry = JSON.parse(
            `{"${selectColumnInfo.name}": "${targetText}"}`
          );
          resultEntry = Object.assign(resultEntry, entry);
        } else {
          const targetText = targetDom.getAttribute(selectColumn);
          let entry = JSON.parse(
            `{"${selectColumnInfo.name}": "${targetText}"}`
          );
          resultEntry = Object.assign(resultEntry, entry);
        }
      }
      resultList.push(resultEntry);
    }
    return resultList;
  }

  async function getText(executeUrl) {
    //サーバーへリクエスト開始
    let response = await fetch(executeUrl);

    //レスポンスWEBページの取得
    let htmlText = await response.text();

    return htmlText;
  }

  async function extractLinks(targetHtmlText, extractRegPtn) {
    let re = new RegExp(extractRegPtn + "(.*?)", "g");

    let match;
    let matches = [];

    while ((match = re.exec(targetHtmlText)) != null) {
      matches.push(match[0]);
    }

    return matches;
  }

  async function listUpAllXpath(targetElement, xpath, prevXpath, xpathList) {
    if (targetElement.nodeName.toLocaleLowerCase() === "html") {
      // 初回の場合

      let firstSameHierarchyList = targetElement.children;

      for (
        let firstSameIdx = 0;
        firstSameIdx < firstSameHierarchyList.length;
        firstSameIdx++
      ) {
        xpath =
          prevXpath +
          "/" +
          firstSameHierarchyList[firstSameIdx].nodeName.toLocaleLowerCase();

        xpathList.push(xpath);

        // パラレル展開(headとbodyの2つへの分岐展開)
        listUpAllXpath(
          firstSameHierarchyList[firstSameIdx],
          xpath,
          xpath,
          xpathList
        );
      }
    } else {
      // 2回目以降の場合

      // タグ名が同一か問わず、同一階層に存在しているすべての子ノードリストを取得
      let iterator = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      ); // それ自身単一の場合ないしそれ自身複数の場合

      for (let childIdx = 0; childIdx < iterator.snapshotLength; childIdx++) {
        // あれば通るしなければ以下は通らない

        let currentElement = iterator.snapshotItem(childIdx);

        let same_hierarchy_children_list = currentElement.children; // それ自身の配下の子ノードを取得

        for (
          let hieIdx = 0;
          hieIdx < same_hierarchy_children_list.length;
          hieIdx++
        ) {
          // あれば通るしなければ以下は通らない

          let childElement = same_hierarchy_children_list[
            hieIdx
          ].nodeName.toLocaleLowerCase();

          // 同一タグ名に対して連番を付与するために取得
          let same_tag_hierarchy_children_list = document.evaluate(
            prevXpath + "/" + childElement,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
          );

          if (same_tag_hierarchy_children_list.snapshotLength === 1) {
            // 単一の場合

            xpath = prevXpath + "/" + childElement;

            // 前回訪問済みの場合はスキップ
            if (xpathList.includes(xpath)) {
              continue;
            }

            xpathList.push(xpath);

            listUpAllXpath(
              same_hierarchy_children_list[hieIdx],
              xpath,
              xpath,
              xpathList
            );
          } else {
            // 複数の場合

            for (
              let sameIdx = 0;
              sameIdx < same_tag_hierarchy_children_list.snapshotLength;
              sameIdx++
            ) {
              let currentElement = same_tag_hierarchy_children_list.snapshotItem(
                sameIdx
              );

              xpath =
                prevXpath +
                "/" +
                childElement +
                "[" +
                (sameIdx + 1).toString() +
                "]";

              // 前回訪問済みの場合はスキップ
              if (xpathList.includes(xpath)) {
                continue;
              }

              xpathList.push(xpath);

              listUpAllXpath(currentElement, xpath, xpath, xpathList);
            }
          }
        }
      }
    }
  }
}
hoge([
  {
    name: "Link",
    filterRegPtn: "\\/h2\\/a$",
    selectColumnList: ["href"],
    url: "https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2",
  },
  {
    name: "Title",
    filterRegPtn: "\\/h2\\/a$",
    selectColumnList: ["title"],
    url: "https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2",
  },
  {
    name: "Price",
    filterRegPtn: "\\/div\\[1\\]\\/span\\[1\\]$",
    selectColumnList: ["text"],
    url: "https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2",
  },
  {
    name: "Star",
    filterRegPtn: "\\/div\\[3\\]\\/div\\[3\\]\\/div\\/div\\/a\\/span\\[6\\]$",
    selectColumnList: ["text"],
    url: "https://search.rakuten.co.jp/search/mall/%E8%82%89/100227/?v=2",
  },
]);
