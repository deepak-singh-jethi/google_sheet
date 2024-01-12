let form = document.querySelector(".form");

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

function applyStyle(styles) {
  //it applies the styles on the active cell
  if (!activeCellId) {
    //if no cell is selected
    alert("Please select a cell");
    form.reset();
    return;
  }

  const activeCell = document.getElementById(activeCellId);
  activeCell.style.color = styles.textColor;
  activeCell.style.backgroundColor = styles.bgColor;
  activeCell.style.fontSize = `${styles.fontSize}px`;
  activeCell.style.textAlign = styles.align;
  activeCell.style.fontWeight = styles.isBold ? "900" : "400";
  activeCell.style.fontFamily = styles.fontFamily;
  activeCell.style.textDecoration = styles.isUnderline ? "underline" : "none";

  activeCell.style.fontStyle = styles.isItalic ? "italic" : "normal";

  state[activeCellId] = { ...styles, text: activeCell.innerText };
}

function resetForm(styles) {
  form.fontSize.value = styles.fontSize;
  form.fontFamily.value = styles.fontFamily;
  form.isBold.checked = styles.isBold;
  form.isItalic.checked = styles.isItalic;
  form.isUnderline = styles.isUnderline;
  form.align.value = styles.align;
  form.textColor.value = styles.textColor;
  form.bgColor.value = styles.bgColor;
}

// if any change occurs in form
//1. get the form info in option object
//2. call apply style function to appy those styles

// function to apply style
