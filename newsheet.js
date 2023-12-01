// Number of sheets created
let sheetCount = 1;

// Store all sheets and their info
const sheet = {};

// The currently active sheet
let currentSheet = 1;

const sheet_tab = document.getElementById("sheet_tab");

//upon loading create 1st page
window.onload = (event) => {
  createSheet();
  addSheetDiv();
};

function addSheetDiv() {
  const sheetDiv = document.createElement("div");

  sheetDiv.innerText = `Sheet-${sheetCount}`;

  sheetDiv.className = "sheets";
  sheetDiv.setAttribute("sheet-id", `${sheetCount}`);
  sheet_tab.appendChild(sheetDiv);
  sheetCount++;
  currentSheet = sheetCount - 1;
  sheetDiv.addEventListener("click", switchToThisSheet);
}

function addSheet() {
  // Store the current sheet data in the sheet object for later use

  sheet[`sheet${currentSheet}`] = state;

  // Clear the state content of each cell in the current sheet  to create a fresh sheet

  state = {};

  // Update the current sheet count
  currentSheet = sheetCount;

  // Reuse the createSheet function to set up the new sheet structure

  bodyContainer.innerHTML = "";
  createSheet();

  // Add a new div showing the sheet number
  addSheetDiv();
}

// Switch to the clicked sheet by retrieving all the data from the sheet object using the attribute sheet-id

function switchToThisSheet(event) {
  const clickedSheetId = event.target.getAttribute("sheet-id");
  if (clickedSheetId) {
    // Save the data of the current sheet to the sheet object

    sheet[`sheet${currentSheet}`] = state;

    // Switch to the clicked sheet
    currentSheet = clickedSheetId;

    // Retrieve and update the state with the data of the clicked sheet
    state = { ...sheet[`sheet${currentSheet}`] };

    // Clear the existing sheet structure
    bodyContainer.innerHTML = "";

    // Recreate the sheet structure and update the display with the data of the clicked sheet
    createSheet();
    updateSheetDisplay();
  }
}

function updateSheetDisplay() {
  for (const cellId in state) {
    const cell = document.getElementById(cellId);

    if (cell) {
      const cellData = state[cellId];
      cell.style.color = cellData.textColor || "";
      cell.style.backgroundColor = cellData.bgColor || "";
      cell.style.fontSize = `${cellData.fontSize}px` || "16px";
      cell.style.textAlign = cellData.align || "left";
      cell.style.fontWeight = cellData.isBold ? "900" : "400";
      cell.style.fontFamily = cellData.fontFamily || "popins-regular";
      cell.style.textDecoration = cellData.isUnderline ? "underline" : "none";
      cell.style.fontStyle = cellData.isItalic ? "italic" : "normal";
      cell.innerText = cellData.text || "";
    }
  }
}
