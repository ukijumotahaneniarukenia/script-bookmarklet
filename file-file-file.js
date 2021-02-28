import fs from 'fs'

// statXXX系を参考に
// https://github.com/webpack/webpack/blob/master/bin/webpack.js

function fileRead(targetFileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(targetFileName, 'utf8', (error, data) => {
      if (error) {
        console.log(error)
      }

      console.log(data)
    })
  })
}

fileRead('test.json')
