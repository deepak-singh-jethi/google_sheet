let activeCellId = null;
let activeCellDisplay = document.getElementById("active-cell-display");

//calculator input
const calcInput = document.querySelector("#calcInput");

//for storing the and and styles of different cells
let state = {};

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

// !on focus cell
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

  // !calculate input handler
  calcInput.value = "";

  // populate calc input with cell data
  calcInput.addEventListener("focus", () => {
    const activeCell = document.getElementById(activeCellId);
    calcInput.value = activeCell.innerText;
  });

  //for calculating math function
  calcInput.addEventListener("keyup", calcFun);

  //for changing cell text with input text value
  calcInput.addEventListener("input", (event) => {
    const activeCell = document.getElementById(activeCellId);
    activeCell.innerText = event.target.value;
  });
}

// ! cal math function

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

//! is any change is cell text
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
