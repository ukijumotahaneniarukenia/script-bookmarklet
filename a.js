$ node -e 'function n(l){l.map((e)=>{console.log(`{${JSON.stringify(e.status)}:${JSON.stringify(e.status==="rejected"?e.reason:e.value)}}`)})};Promise.allSettled([Promise.reject({s:0,e:9}),Promise.resolve([{s:0},{e:9}])]).then(l=>{n(l)}).catch(l=>{n(l)})'|jq -s
