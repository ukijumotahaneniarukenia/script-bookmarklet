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

function listUpAllXpath(xpath, prevXpath, xpathList) {
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

        listUpAllXpath(xpath, xpath, xpathList);
      } else {
        // 複数の場合

        for (
          let sameIdx = 0;
          sameIdx < same_tag_hierarchy_children_list.snapshotLength;
          sameIdx++
        ) {
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

          listUpAllXpath(xpath, xpath, xpathList);
        }
      }
    }
  }
}

function getAllXpath(entryXpath) {
  let xpathList = [];
  let prevXpath = entryXpath;

  xpathList.push(entryXpath);

  listUpAllXpath(entryXpath, prevXpath, xpathList);

  let domJsonizeHashList = [];
  for (let xpathIdx = 0; xpathIdx < xpathList.length; xpathIdx++) {
    let hash = {};
    let targetXpath = xpathList[xpathIdx];
    let iterator = document.evaluate(
      targetXpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    let targetElement = iterator.snapshotItem(0);
    hash = {
      targetUrl: window.location.href,
      targetXpath: targetXpath,
      targetElement: targetElement.outerHTML,
    };
    domJsonizeHashList.push(hash);
  }
  return domJsonizeHashList;
}

function waitTime(waitTimeSeconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(waitTimeSeconds);
    }, waitTimeSeconds * 1000);
  });
}

function limitCondtion(currentWindowAvaliableScrollYCoordinate, currentWindowYCoordinate, previousWindowYCoordinate) {
  return new Promise((resolve) => {
    resolve(currentWindowAvaliableScrollYCoordinate === currentWindowYCoordinate &&  currentWindowYCoordinate === previousWindowYCoordinate);
  });
}

function download() {
  return new Promise((resolve) => {
    let targetXpath = "/html";

    let resultList = getAllXpath(targetXpath);

    let timeStamp = formatDateTime(new Date(), "yyyy-MM-ddTHH-mm-ss");

    let blob = new Blob([JSON.stringify(resultList)], { type: "text/plain" });

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");

    document.body.appendChild(a);

    a.download = "xpath-info-" + timeStamp + ".json";

    a.href = url;

    a.click();

    a.remove();

    URL.revokeObjectURL(url);
    resolve(resultList);
  });
}

window.addEventListener("DOMContentLoaded", function () {
  urls = [
    "//yoheim.net/image/s156.png",
    "//yoheim.net/image/s157.png",
    "//yoheim.net/image/s158.png",
  ];

  var ul = document.getElementById("imageRoot");
  ul.innerHTML = "";

  urls.forEach(function (url) {
    var image = new Image();
    image.src = url;
    ul.appendChild(image);
  });
});

async function main(
  prevWindowYCoordinate,
  scrollYCoordinatePixel,
  waitTimeSeconds
) {
  let elapsedTime = 0;
  console.log("Elapsed Time:%s[seconds]", String(elapsedTime));
  for (;;) {
    console.log(window.scrollY, prevWindowYCoordinate);
    if (await limitCondtion(document.body.scrollHeight, window.scrollY, prevWindowYCoordinate)) {
      //メディアのフェッチで失敗したときに
      //現在の位置をローカルストレージに保持しておき、リロード後、前回の位置まで移動する。
      // https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage
      // window.localStorage.setItem('previousScrollY', window.scrollY);
      // window.location.reload()
      // window.scroll(0,window.localStorage.getItem('previousScrollY'))

      //ネットワークの混雑状況によりメディアのフェッチに時間がかかっている場合、同じ座標になってしまいループから抜けてしまうので、いい感じにしたい
      // レンダリングの完了待ち状態を知りたい
      //現在の位置をローカルストレージに保持しておき、リロード後、前回の位置まで移動する。

      // TODO fetch がコケていることを検知したい
      console.log("end");

      break;
    } else {
      prevWindowYCoordinate = window.scrollY;
      window.scrollTo(0, prevWindowYCoordinate + scrollYCoordinatePixel);
    }
    elapsedTime = elapsedTime + (await waitTime(waitTimeSeconds));
    console.log("Elapsed Time:%s[seconds]", String(elapsedTime));
  }
  await download();
}

main(-1, 300, 4);
