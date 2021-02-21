let mySelectionColor = `
::selection {
  color: #241c15;
  background: rgba(255,113,208,0.2);
}
`;

let myStyle = document.createElement("style");

myStyle.innerHTML = mySelectionColor;

document.head.appendChild(myStyle);
