async function hoge(url) {
  const opts = {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "text/html",
    },
  };
  const response = await fetch(url, opts);
  if (response.ok) {
    response.text().then(function (text) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(text, "text/html");
      console.log(doc);
    });
  }
}

hoge("https://ukijumotahaneniarukenia.site/");

