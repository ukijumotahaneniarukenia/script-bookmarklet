let targetDom = document.querySelector("ul[id='almanac-sidebar-list']")
Array.from(targetDom.querySelectorAll('a')).map((item) => {
  item.style.setProperty('color', '#FFE01B')
  item.style.setProperty('font-size', '18px')
  item.style.setProperty('font-family', "'Times New Roman', Times, serif")
})
