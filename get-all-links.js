let targetrList = document.querySelectorAll("a")

let linkList = []

for(let ele of targetrList){linkList.push(ele.href)}

let resultList = Array.from(new Set(linkList))

console.log(resultList)
