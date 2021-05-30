function range(n) {
  return [...Array(n).keys()].map((i) => {
    return i + 1;
  });
}
// https://hanoi.aimary.com/index_en.php
const hanoi = (count, src, free, dest, moveList) => {
  if (count === 1) {
    moveList.push({
      disk: 1,
      from: src,
      to: dest,
    });
  } else {
    hanoi(count - 1, src, dest, free, moveList);

    moveList.push({
      disk: count,
      from: src,
      to: dest,
    });

    hanoi(count - 1, free, src, dest, moveList);
  }
  return { movalInfoList: moveList };
};

function mover(removeItem, movalInfo, a, b, c) {
  if (movalInfo.to === "A") {
    a[movalInfo.to].list.splice(0, 0, removeItem);
  }
  if (movalInfo.to === "B") {
    b[movalInfo.to].list.splice(0, 0, removeItem);
  }
  if (movalInfo.to === "C") {
    c[movalInfo.to].list.splice(0, 0, removeItem);
  }
}

function getMoveItem(itemInfo, placeKeyName, movalInfo) {
  const removeItem = Number(
    itemInfo[placeKeyName].list
      .splice(itemInfo[placeKeyName].list.indexOf(movalInfo.disk), 1)
      .join()
  );
  return removeItem;
}

const stackNumber = Number(process.argv.splice(2)[0]);
if (Number.isNaN(stackNumber)) {
  process.exit(1);
}
const { movalInfoList } = hanoi(stackNumber, "A", "B", "C", []);
let a = { A: { list: range(stackNumber) } };
let b = { B: { list: [] } };
let c = { C: { list: [] } };
const tableInfoList = [];
movalInfoList.map((movalInfo, idx) => {
  const tableInfo = {
    step: idx,
    state: {
      A: a["A"]["list"].join(" "),
      B: b["B"]["list"].join(" "),
      C: c["C"]["list"].join(" "),
    },
  };
  tableInfoList.push(tableInfo);
  if (a[movalInfo.from]) {
    const removeItem = getMoveItem(a, "A", movalInfo);
    mover(removeItem, movalInfo, a, b, c);
  }
  if (b[movalInfo.from]) {
    const removeItem = getMoveItem(b, "B", movalInfo);
    mover(removeItem, movalInfo, a, b, c);
  }
  if (c[movalInfo.from]) {
    const removeItem = getMoveItem(c, "C", movalInfo);
    mover(removeItem, movalInfo, a, b, c);
  }
});
const tableInfo = {
  step: movalInfoList.length,
  state: {
    A: a["A"]["list"].join(" "),
    B: b["B"]["list"].join(" "),
    C: c["C"]["list"].join(" "),
  },
};
tableInfoList.push(tableInfo);
console.log(JSON.stringify(tableInfoList));
