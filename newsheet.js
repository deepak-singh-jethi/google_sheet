// Existing code...

let sheets = []; // Updated: Array to store multiple sheets
let currentSheetIndex = 0;

// Existing code...

function addNewSheet() {
  const newSheet = {
    state: {}, // Cell and form state for the new sheet
  };

  sheets.push(newSheet);

  updateSheetList();
  switchSheet(sheets.length - 1);
}

function switchSheet(sheetIndex) {
  currentSheetIndex = sheetIndex;

  // Update UI with cell content and form styles for the selected sheet
  const activeSheet = sheets[currentSheetIndex];
  state = activeSheet.state || {}; // Update state object with the selected sheet's state

  // Update the UI with the cell content and form styles based on the state object
  // ... (Your existing logic to update the UI)

  // Update the active cell display and form with the current state
  if (activeCellId) {
    activeCellDisplay.innerText = activeCellId;
    resetForm(state[activeCellId] || defaultStyle);
  } else {
    activeCellDisplay.innerText = "NULL";
    resetForm(defaultStyle);
  }
}

function updateSheetList() {
  const sheetListContainer = document.getElementById("sheet-list");
  sheetListContainer.innerHTML = "";

  for (let i = 0; i < sheets.length; i++) {
    const sheetNumber = i + 1;
    const sheetButton = document.createElement("button");
    sheetButton.innerText = `Sheet ${sheetNumber}`;
    sheetButton.onclick = () => switchSheet(i);

    sheetListContainer.appendChild(sheetButton);
  }
}

// Existing code...
