let targetDom = document.querySelector("ul[id='almanac-sidebar-list']");
Array.from(targetDom.querySelectorAll("a")).map((item) => {
  item.style.setProperty("color", "#FFE01B");
});
