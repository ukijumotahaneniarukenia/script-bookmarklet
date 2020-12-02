document.querySelectorAll("a")

Array.from(document.querySelectorAll("a"))

[...document.querySelectorAll("a")]

[...document.querySelectorAll("a")].map(e=>{return {link:e.href,title:e.textContent}})

// JSON形式でクリップボードにコピー
copy([...document.querySelectorAll("a")].map(e=>{return {link:e.href,title:e.textContent}}))


[...document.querySelectorAll("a")].map(e=>{return [e.href, e.textContent].join("\t")}).join("\n")


// TSVN形式でクリップボードにコピー
copy([...document.querySelectorAll("a")].map(e=>{return [e.href, e.textContent].join("\t")}).join("\n"))

// CSVN形式でクリップボードにコピー
copy([...document.querySelectorAll("a")].map(e=>{return [e.href, e.textContent].join(",")}).join("\n"))
