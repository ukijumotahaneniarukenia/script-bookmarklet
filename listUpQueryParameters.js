function main() {
  let url = location;
  let queryParametersString = location.search.slice(1);
  let queryStringInfo = queryParametersString.split("&").map((item) => {
    let queryItemInfoList = item.split("=");
    return {
      key: queryItemInfoList[0],
      value: queryItemInfoList[1],
      prettyValue: decodeURIComponent(queryItemInfoList[1]),
    };
  });

  console.group("QueryParametersString");
  console.log("URL: " + url);
  console.log("QPS: " + queryParametersString);
  console.table(queryStringInfo);
  console.groupEnd("QueryParametersString");
}

main();
