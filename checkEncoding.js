#!/usr/bin/env node
import { readFileSync, existsSync } from "fs";
import isUtf8 from "is-utf8";

//https://nodejs.org/docs/latest/api/fs.html#fs_fs_existssync_path
let filePathList = [
  "test-ASCII.txt",
  "unko.txt",
  "test-UTF8.txt",
  "test-SHIFT_JIS.txt",
];

filePathList.map((filePath) => {
  const isExists = existsSync(filePath)
  isExists || process.exit(1);
  if (isExists) {
    const buffer = readFileSync(filePath);
    console.log(isUtf8(buffer));
  }
});
