function main() {
  let request = new XMLHttpRequest();
  request.open("HEAD", window.location, true);

  request.onload  = () => {
    let responseHeaders = request.getAllResponseHeaders();
    let responseHeaderInfo = responseHeaders
      .split("\n")
      .map((item) => {
        const responseHeaderItemList = item.split(": ");
        return {
          Key: responseHeaderItemList[0],
          Value: responseHeaderItemList[1],
        };
      })
      .filter((item) => {
        return item.Value !== undefined;
      });
  request.onerror = () => {
    console.error("request error")
  }

    console.group("Request Headers");
    console.log(window.location);
    console.log(responseHeaders);
    console.table(responseHeaderInfo);
    console.groupEnd("Request Headers");
  };
  request.send(null);
}

main();
