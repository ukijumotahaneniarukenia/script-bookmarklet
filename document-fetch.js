async function main(url) {

  const targetHtml = await getHtml(url)

  console.log(targetHtml)

  async function getHtml(url) {
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
      const textHtml = await response.text()
      let doc = parser.parseFromString(textHtml, "text/html");
      let html = doc.querySelector('html');
      return html
    }
  }
}

main("https://ukijumotahaneniarukenia.site/");

