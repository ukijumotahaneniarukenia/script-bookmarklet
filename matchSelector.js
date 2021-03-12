let targetDom = document.createElement("div");

targetDom.setAttribute("class", "hoge");

function matcher(targetDom, targetSelector) {
  if (targetDom.mozMatchesSelector !== undefined && targetDom.mozMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.matchesSelector !== undefined && targetDom.matchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.webkitMatchesSelector !== undefined && targetDom.webkitMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.oMatchesSelector !== undefined && targetDom.oMatchesSelector(targetSelector)) {
    return targetSelector
  }
  if (targetDom.msMatchesSelector !== undefined && targetDom.msMatchesSelector(targetSelector)) {
    return targetSelector
  }
  return null
}

console.log(matcher(targetDom, '.hoge')) // .hoge

console.log(matcher(targetDom, '.unko')) // null
