node -p 'const m = new Map();m.set("a","1");m.set("b","2");[...m.entries()].reduce((a,c)=>{return Object.assign(a,{[c[0]]:c[1]})},{})'
