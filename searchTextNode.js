function searchTextNode(searchKeyword) {
    // 対象ドキュメントの全テキストノードを取得
    // 検索ワードがあればそれで絞る
    let allTextNodeList = document.evaluate(
        searchKeyword ? `//text()[contains(., "${searchKeyword}")]` : "//text()",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    // 単一分割代入
    let { snapshotLength } = allTextNodeList;
    for (let textIndex = 0; textIndex < snapshotLength; textIndex++) {
        const targetTextNode = allTextNodeList.snapshotItem(textIndex);
        console.log(targetTextNode, typeof targetTextNode);
    }
}
