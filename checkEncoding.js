import { readFileSync } from "fs";
import isUtf8 from "is-utf8";

let fileList = ["test-ASCII.txt", "test-UTF-8.txt", "test-SHIFT_JIS.txt"];

fileList.map((item) => {

  console.log(item)

  let buffer = readFileSync(item);
  console.log(buffer);

  console.log(isUtf8(buffer));
});
