let baseUrl = 'https://www.youtube.com/'

let xpath = '/html/body/ytd-app/div/ytd-page-manager/ytd-browse/ytd-two-column-browse-results-renderer/div[1]/ytd-rich-grid-renderer/div[5]/ytd-rich-item-renderer[18]/div/ytd-rich-grid-media/div[1]/div/div[1]/h3/a'

let iterator = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

let targetDom = iterator.snapshotItem(0)

let targetSubUrl = targetDom.getAttribute('href')

console.log(baseUrl + targetSubUrl)
