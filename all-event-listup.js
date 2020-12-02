// https://github.com/alex2844/js-events

// おすすめの実行対象サイト
// https://music.youtube.com/watch?v=sQtlTOLyb_w&list=RDAMVMYoDq9uPGVoc
// ないしは
// window.open('')したページで実行

function eventCatchLogger(event){console.log(event)}

document.body.addEventListener('scroll', eventCatchLogger);

document.body.addEventListener('click', eventCatchLogger, { once: false });

window.addEventListener('mousewheel', eventCatchLogger); // スクロール

window.addEventListener('mousemove', eventCatchLogger); // マウスホバー

window.addEventListener('scroll', eventCatchLogger); // スクロール

document.body.removeEventListener('scroll', eventCatchLogger);

let result = [document, window].concat([...document.querySelectorAll("*")]).map((targetElement) => {
  let targetEventListenerList = getEventListeners(targetElement);
  return {
    element: targetElement,
    eventList: Object.keys(targetEventListenerList),
    eventListCount: Object.keys(targetEventListenerList).length,
    eventListenerList: targetEventListenerList,
  };
})
.filter(item=>{return item.eventList.length!==0});
// console.log(result)
console.table(result)
