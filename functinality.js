let activeCellId = null;
let activeCellDisplay = document.getElementById("active-cell-display");
let form = document.querySelector(".form");

//calculator input
const calcInput = document.querySelector("#calcInput");

// cut copy paste
const cut = document.querySelector("#cut");
const copy = document.querySelector("#copy");
const paste = document.querySelector("#paste");
//copied text for cut copy paste feature

let copiedStateOfCell = {};

// default style of cell
const defaultStyle = {
  fontFamily: "popins-regular",
  fontSize: 16,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textColor: "#000000",
  bgColor: "#ffffff",
  text: "",
};

//for storing the and and styles of different cells
let state = {};

//on focus cell
function onFocusCell(event) {
  activeCellId = event.target.id;
  activeCellDisplay.innerText = activeCellId;

  //reset the form inputs depending upon the cells actual style
  if (state[activeCellId]) {
    //already touched cell => saved style in state object with key of cell id
    resetForm(state[activeCellId]);
  } else {
    //newly touched cell defult style
    resetForm(defaultStyle);
  }
  calcInput.value = "";
  calcInput.addEventListener("focus", () => {
    const activeCell = document.getElementById(activeCellId);
    calcInput.value = activeCell.innerText;
  });
  calcInput.addEventListener("keyup", calcFun);
  calcInput.addEventListener("input", (event) => {
    const activeCell = document.getElementById(activeCellId);
    activeCell.innerText = event.target.value;
  });
}

// if any change occurs in form
//1. get the form inf in option object
//2. call apply style function to appy those styles

form.addEventListener("change", onChangeFormData);

function onChangeFormData() {
  const options = {
    fontFamily: form["fontFamily"].value,
    fontSize: form["fontSize"].value,
    isBold: form["isBold"].checked,
    isItalic: form["isItalic"].checked,
    isUnderline: form["isUnderline"].checked,
    align: form["align"].value, //left center or right
    textColor: form["textColor"].value,
    bgColor: form["bgColor"].value,
  };
  applyStyle(options);
}

// function to apply style

function applyStyle(styles) {
  //it applies the styles on the active cell
  if (!activeCellId) {
    //if no cell is selected
    alert("Please select a cell");
    form.reset();
    return;
  }

  //if a cell is selected apply the style to that cell
  //1. get the cell from active cell id which we set during onFocus function
  // apply those styles using dom

  const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.textColor;
  activeCell.style.backgroundColor = styles.bgColor;
  activeCell.style.fontSize = `${styles.fontSize}px`;
  activeCell.style.textAlign = styles.align;
  activeCell.style.fontWeight = styles.isBold ? "900" : "400";
  activeCell.style.fontFamily = styles.fontFamily;
  activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";

  activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

  // whenever their is an update in a cell style, update those styles with the state object;

  // record style of each cell in state object {id:style}
  state[activeCellId] = { ...styles, text: activeCell.innerText };
}

function resetForm(styles) {
  /*  const dummy state object = {
       fontFamily: form["fontFamily"].value,
       fontSize: form["fontSize"].value,
       isBold: form["isBold"].checked,
       isItalic: form["isItalic"].checked,
       isUnderline: form["isUnderline"].checked,
       align: form["align"].value, //left center or right
       textColor: form["textColor"].value,
       bgColor: form["bgColor"].value,
     }; */

  form.fontSize.value = styles.fontSize;
  form.fontFamily.value = styles.fontFamily;
  form.isBold.checked = styles.isBold;
  form.isItalic.checked = styles.isItalic;
  form.isUnderline = styles.isUnderline;
  form.align.value = styles.align;
  form.textColor.value = styles.textColor;
  form.bgColor.value = styles.bgColor;
}

function onChangeCellText(event) {
  let changedtext = event.target.innerText;

  if (state[activeCellId]) {
    // The current cell is already added to the state object
    // Create a new style object to prevent affecting other cells
    state[activeCellId] = { ...state[activeCellId], text: changedtext };
  } else {
    state[activeCellId] = { ...defaultStyle, text: changedtext };
  }
}

// math function
function calcFun(event) {
  const activeCell = document.getElementById(activeCellId);
  if (event.keyCode === 13) {
    try {
      const output = eval(event.target.value);
      activeCell.innerText = output;
    } catch (error) {
      alert("Error: Please enter  correct math operation");
    }
  }
}

//cut function
cut.addEventListener("click", cutFun);
copy.addEventListener("click", copyFun);
paste.addEventListener("click", pasteFun);

function cutFun() {
  const activeCell = document.getElementById(activeCellId);
  console.log(state);
  console.log(state[activeCellId]);

  copiedStateOfCell = { ...state[activeCellId] };
  applyStyle(defaultStyle);
  activeCell.innerText = "";
  console.log(copiedStateOfCell);
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
