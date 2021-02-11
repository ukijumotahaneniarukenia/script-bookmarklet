let techList = [
  {
    id: 1,
    name: "techA",
    percent: 33,
    ctgList: [
      { id: 1, name: "ctgA" },
      { id: 2, name: "ctgB" },
      { id: 3, name: "ctgC" },
    ],
  },
  {
    id: 2,
    name: "techB",
    percent: 53,
    ctgList: [
      { id: 1, name: "ctgA" },
      { id: 3, name: "ctgC" },
    ],
  },
  {
    id: 3,
    name: "techC",
    percent: 73,
    ctgList: [
      { id: 1, name: "ctgA" },
      { id: 2, name: "ctgB" },
    ],
  },
  { id: 4, name: "techD", percent: 23, ctgList: [{ id: 2, name: "ctgB" }] },
  { id: 5, name: "techE", percent: 93, ctgList: [] },
];
// console.log(JSON.stringify(techList));

let newCtgList = Object.values(
  techList
    .filter(({ percent }) => {
      return percent >= 20;
    })
    .reduce((newCtg, tech) => {
      tech.ctgList.map((ctg) => {
        newCtg[ctg.id] = newCtg[ctg.id] || { ...ctg, techList: [] };
        newCtg[ctg.id].techList.push(tech);
      });
      return newCtg;
    }, {}),
);

console.log(JSON.stringify(newCtgList));
