Array.from(window.getComputedStyle(window.document.body)).map(item => {return `${item}:inherit;`}).join("\n");
