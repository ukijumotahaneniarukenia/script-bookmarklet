function formatDateTime(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
}

function listUpAllXpath(targetElement, xpath, prevXpath, xpathList) {

  if (targetElement.nodeName.toLocaleLowerCase() === 'html') {
    // 初回の場合

    let firstSameHierarchyList = targetElement.children

    for (let firstSameIdx = 0; firstSameIdx < firstSameHierarchyList.length; firstSameIdx++) {

      xpath = prevXpath + '/' + firstSameHierarchyList[firstSameIdx].nodeName.toLocaleLowerCase()

      xpathList.push(xpath)

      // パラレル展開(headとbodyの2つへの分岐展開)
      listUpAllXpath(firstSameHierarchyList[firstSameIdx], xpath, xpath, xpathList)
    }
  } else {
    // 2回目以降の場合

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
        let same_tag_hierarchy_children_list = document.evaluate(prevXpath + '/' + childElement, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

        if (same_tag_hierarchy_children_list.snapshotLength === 1) {
          // 単一の場合

          xpath = prevXpath + '/' + childElement

          // 前回訪問済みの場合はスキップ
          if (xpathList.includes(xpath)) {
            continue
          }

          xpathList.push(xpath)

          listUpAllXpath(same_hierarchy_children_list[hieIdx], xpath, xpath, xpathList)

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

            listUpAllXpath(currentElement, xpath, xpath, xpathList)
          }
        }
      }
    }
  }
}

let xpathList = []
let targetElement = document.querySelector('html')
let xpath = '/' + targetElement.nodeName.toLocaleLowerCase()
let prevXpath = '/' + targetElement.nodeName.toLocaleLowerCase()

xpathList.push(xpath)

listUpAllXpath(targetElement, xpath, prevXpath, xpathList)

let domJsonizeHashList = []
for (let xpathIdx = 0; xpathIdx < xpathList.length; xpathIdx++) {
  let hash = {}
  let targetXpath = xpathList[xpathIdx];
  let iterator = document.evaluate(targetXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  let targetElement = iterator.snapshotItem(0)
  hash = {targetUrl: window.location.href, targetXpath: targetXpath, targetElement: targetElement.outerHTML}
  domJsonizeHashList.push(hash)
}

const timeStamp = formatDateTime(new Date(), "yyyy-MM-ddTHH-mm-ss");

const blob = new Blob([JSON.stringify(domJsonizeHashList)], { type: "text/plain" });

const url = URL.createObjectURL(blob);

const a = document.createElement("a");

document.body.appendChild(a);

a.download = "dom-jsonize-" + timeStamp + ".json";

a.href = url;

a.click();

a.remove();

URL.revokeObjectURL(url);
