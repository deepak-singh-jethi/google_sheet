const columns = 27;
const rows = 100;
const header = document.querySelector("#header");
const sno = document.querySelector("#sno");
const bodyContainer = document.querySelector("#body-container");

// serial number A,B,C,D,E,F...

for (let i = 0; i < columns; i++) {
  const headCell = document.createElement("div");
  headCell.className = "head-cell";
  if (i != 0) {
    headCell.innerText = String.fromCharCode(64 + i);
  }

  header.appendChild(headCell);
}

// serial number 1,2,3,4,5.....
for (let i = 1; i <= rows; i++) {
  const snoCell = document.createElement("div");
  snoCell.innerText = i;
  snoCell.className = "sno-cell";
  sno.appendChild(snoCell);
}

// cells creator loop

function createSheet() {
  for (let i = 1; i <= rows; i++) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    for (let j = 1; j < columns; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = "";
      cell.contentEditable = true;

      // id value  = column value + row value(1A);
      cell.id = `${String.fromCharCode(64 + j)}${i}`;
      //on clicking or focusing on any cell call function onFocusCell to get its id and further load the activeCellId for chaning its style and change the display cell value
      cell.addEventListener("focus", onFocusCell);
      cell.addEventListener("input", onChangeCellText);
      rowElement.appendChild(cell);
    }

    bodyContainer.appendChild(rowElement);
  }
}

// createSheet();
