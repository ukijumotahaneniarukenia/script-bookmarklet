function main(isSkipMajorityColor) {
  let resultInfo = {};
  let targetPropertyList = [
    "background-color",
    "color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
  ];
  let skipColorInfo = {
    "rgb(0, 0, 0)": true,
    "rgba(0, 0, 0, 0)": true,
    "rgb(255, 255, 255)": true,
  };
  let targetDomList = Array.from(document.querySelectorAll("*"));
  for (
    let targetDomIndex = 0;
    targetDomIndex < targetDomList.length;
    targetDomIndex++
  ) {
    const targetDom = targetDomList[targetDomIndex];
    for (
      let targetPropertyIndex = 0;
      targetPropertyIndex < targetPropertyList.length;
      targetPropertyIndex++
    ) {
      const targetProperty = targetPropertyList[targetPropertyIndex];
      let color = window
        .getComputedStyle(targetDom)
        .getPropertyValue(targetProperty);
      if (!resultInfo[color]) {
        resultInfo[color] = {
          count: 0,
          nodeList: [],
        };
      }
      if (isSkipMajorityColor && skipColorInfo[color]) {
        continue;
      }
      resultInfo[color].count++;
      resultInfo[color].nodeList.push(targetDom);
    }
  }

  function rgbTextToRgbList(rgbText) {
    return rgbText
      .replace(/\s/g, "")
      .match(/\d+,\d+,\d+/)[0]
      .split(",")
      .map((targetNumberString) => {
        return Number.parseInt(targetNumberString, 10);
      });
  }

  function dec2hex(targetDecimalNumber) {
    let targetHexaDecimalNumber = targetDecimalNumber.toString(16);
    return targetHexaDecimalNumber.length == 1
      ? "0" + targetHexaDecimalNumber
      : targetHexaDecimalNumber;
  }

  function rgbToHex(targetRGBList) {
    let r = targetRGBList[0];
    let g = targetRGBList[1];
    let b = targetRGBList[2];
    return "#" + dec2hex(r) + dec2hex(g) + dec2hex(b);
  }

  let resultInfoList = [];
  for (let targetRGBText in resultInfo) {
    let rgbList = rgbTextToRgbList(targetRGBText);
    let targetColorHex = rgbToHex(rgbList);

    resultInfoList.push({
      rgbText: targetRGBText,
      itemInfo: resultInfo[targetRGBText],
      colorHex: targetColorHex,
    });
  }

  // 出現頻度降順で並び替え
  resultInfoList = resultInfoList.sort((a, b) => {
    return b.itemInfo.count - a.itemInfo.count;
  });

  let nameStyle = "font-weight:normal;";
  let countStyle = "font-weight:bold;";
  function colorStyle(color) {
    return (
      "background:" + color + ";color:" + color + ";border:1px solid #333;"
    );
  }

  function outputMessageTemplate(targetPage, targetColorCount) {
    return `
${targetPage} is used total ${targetColorCount} colors
`;
  }

  // メイングループ表示開始
  console.group(
    outputMessageTemplate(
      window.location.href,
      isSkipMajorityColor
        ? resultInfoList.length - Object.keys(skipColorInfo).length
        : resultInfoList.length
    )
  );
  resultInfoList.map((resultInfo) => {
    // サブグループ表示開始
    console.groupCollapsed(
      "%c    %c " +
        resultInfo.rgbText +
        " " +
        resultInfo.colorHex +
        " %c(" +
        resultInfo.itemInfo.count +
        " times)",
      colorStyle(resultInfo.rgbText),
      nameStyle,
      countStyle
    );
    // サブグループ詳細表示
    resultInfo.itemInfo.nodeList.map((targetNode) => {
      console.log(targetNode);
    });
    // サブグループ表示終了
    console.groupEnd();
  });
  // メイングループ表示終了
  console.groupEnd();
}

// 実行サイトなど
// https://mailchimp.com/
// main(false);
main(true);
