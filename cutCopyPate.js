// ! cut copy paste
const cut = document.querySelector("#cut");
const copy = document.querySelector("#copy");
const paste = document.querySelector("#paste");

//copied text for cut copy paste feature
let copiedStateOfCell = {};

//cut function
cut.addEventListener("click", cutFun);
copy.addEventListener("click", copyFun);
paste.addEventListener("click", pasteFun);

function cutFun() {
  const activeCell = document.getElementById(activeCellId);

  copiedStateOfCell = { ...state[activeCellId] };
  applyStyle(defaultStyle);
  activeCell.innerText = "";
}

//copy function

function copyFun() {
  const activeCell = document.getElementById(activeCellId);
  console.log(state);
  console.log(state[activeCellId]);

  copiedStateOfCell = { ...state[activeCellId] };
  console.log(copiedStateOfCell);
}

function pasteFun() {
  const activeCell = document.getElementById(activeCellId);
  console.log(copiedStateOfCell);
  applyStyle(copiedStateOfCell);
  state[activeCellId] = { ...copiedStateOfCell };
  activeCell.innerText = state[activeCellId].text;
}
