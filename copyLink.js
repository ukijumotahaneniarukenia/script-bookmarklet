// JSON形式でクリップボードにコピー
copy(
  [...document.querySelectorAll('a')].map((e) => {
    return { link: e.href, title: e.textContent }
  })
)

// TSVN形式でクリップボードにコピー
copy(
  [...document.querySelectorAll('a')]
    .map((e) => {
      return [e.href, e.textContent].join('\t')
    })
    .join('\n')
)

// CSVN形式でクリップボードにコピー
copy(
  [...document.querySelectorAll('a')]
    .map((e) => {
      return [e.href, e.textContent].join(',')
    })
    .join('\n')
)
