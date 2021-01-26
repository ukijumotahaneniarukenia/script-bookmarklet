let documentCssStyleDomList = Array.from(document.styleSheets).map(item=>{return {type:item.type,href:item.href}})

console.log(documentCssStyleDomList)
