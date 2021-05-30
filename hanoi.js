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

const stackNumber = 3
const { movalInfoList } = hanoi(stackNumber, "A", "B", "C", []);
let a = { A: { list: range(stackNumber) } };
let b = { B: { list: [] } };
let c = { C: { list: [] } };
movalInfoList.map((movalInfo, idx) => {
  // console.log(idx, movalInfo,movalInfo.from,movalInfo.to);
  console.log(idx, a, b, c);
  if (a[movalInfo.from]) {
    const removeItem = Number(
      a.A.list.splice(a.A.list.indexOf(movalInfo.disk), 1).join()
    );
    mover(removeItem, movalInfo, a, b, c);
  }
  if (b[movalInfo.from]) {
    const removeItem = Number(
      b.B.list.splice(b.B.list.indexOf(movalInfo.disk), 1).join()
    );
    mover(removeItem, movalInfo, a, b, c);
  }
  if (c[movalInfo.from]) {
    const removeItem = Number(
      c.C.list.splice(c.C.list.indexOf(movalInfo.disk), 1).join()
    );
    mover(removeItem, movalInfo, a, b, c);
  }
});
console.log(movalInfoList.length, a, b, c);
