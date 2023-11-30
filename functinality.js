let activeCellId = null;
let activeCellDisplay = document.getElementById("active-cell-display");

let form = document.querySelector(".form");

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

//for storing the state and styles of different cells
const state = {};

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
    //the current cell is already added to state object
    state[activeCellId].text = changedtext;
  } else {
    state[activeCellId] = defaultStyle;
    state[activeCellId].text = changedtext;
  }
}

function exportData() {
  //TODO ;- export the file data and export it

  const jsonData = JSON.stringify(state);

  const blob = new Blob([jsonData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = "data.json";
  link.href = url;
  link.click();
}
