//https://github.com/olifolkerd/tabulator

let scriptLibrary = document.createElement("script");
scriptLibrary.setAttribute("type", "text/javascript");
scriptLibrary.setAttribute(
  "src",
  "https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"
);
document.head.appendChild(scriptLibrary);

let linkLibrary = document.createElement("link");
linkLibrary.setAttribute("rel", "stylesheet");
linkLibrary.setAttribute(
  "href",
  "https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css"
);
document.head.appendChild(linkLibrary);

let columnsHeaderList = []
let columnsDataList

await fetch("https://tetsudo.rti-giken.jp/free/delay.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    columnsDataList = data
    Object.keys(data[0]).map((e) => {
      columnsHeaderList.push({ title: e.slice(0).toUpperCase(), field: e });
    });
  });

let targetDom = document.createElement("div");
targetDom.setAttribute("id", "target-table");
document.body.appendChild(targetDom);

let dataTable = new Tabulator("#target-table", {
  data:columnsDataList,
  layout:"fitColumns",
  columns:columnsHeaderList,
})
