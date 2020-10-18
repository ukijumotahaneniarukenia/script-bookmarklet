async function main(url) {
  const targetDocument = await getDocument(url);

  // console.log(targetDocument);

  let xpathList = [];
  let targetElement = targetDocument.querySelector("html");
  let xpath = "/" + targetElement.nodeName.toLocaleLowerCase();
  let prevXpath = "/" + targetElement.nodeName.toLocaleLowerCase();

  xpathList.push(xpath);

  listUpAllXpath(targetElement, xpath, prevXpath, xpathList);

  console.log(xpathList);

  async function getDocument(url) {
    const opts = {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "text/html",
      },
    };
    const response = await fetch(url, opts);
    let parser = new DOMParser();
    if (response.ok) {
      const textHtml = await response.text();
      let doc = parser.parseFromString(textHtml, "text/html");
      return doc;
    }
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

main("https://ukijumotahaneniarukenia.site/");

