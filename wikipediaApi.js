// https://stackoverflow.com/questions/8555320/is-there-a-wikipedia-api-just-for-retrieve-content-summary
// 要約
// CORSエラーを緩めるため、呼び出し時に「origin=*」を追加
fetch('https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=すべてがFになる')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2))
  })

// 写真
fetch('https://ja.wikipedia.org/api/rest_v1/page/summary/すべてがFになる?origin=*')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2))
  })
