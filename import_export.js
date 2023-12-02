// import function
function importData() {
  const fileInput = document.getElementById("fileInput");
  // defult selected file is at index 0
  // file input is taken as array
  const file = fileInput.files[0];

  if (!file) {
    alert("No file selected");
    return;
  }
  // Filereader class => which enables us to read the file content through diffeent function
  const reader = new FileReader();

  // when
  reader.onload = function (e) {
    try {
      //converts json data into object data
      const jsonData = JSON.parse(e.target.result);
      /* 
        {
          C1:{
          fontFamily:"roboto-regular",
          fontSize:18,
          isBold:false,
          isItalic:true,
          isUnderline:false,
          align:"left",
          textColor:"#000000",
          bgColor:"#ffffff",
          text:"amit singh" 
          },
          F1:{
          fontFamily:"popins-extra-bold",
          fontSize:"21",
          isBold:true,
          isItalic:false,
          isUnderline:false,
          align:"left",
          textColor:"#e10e0e",
          bgColor:"#ffffff",
          text":"deepak jethi"
          }
      }
        */

      // Clear existing sheet content
      addSheet();

      for (const cellId in jsonData) {
        //getitng the data of each cell
        const cellData = jsonData[cellId];
        /* 
        cellId = c1
        cellData = {
          fontFamily:"roboto-regular",
          fontSize:18,
          isBold:false,
          isItalic:true,
          isUnderline:false,
          align:"left",
          textColor:"#000000",
          bgColor:"#ffffff",
          text:"amit singh" 
        }
        */

        // : This line finds the HTML element with the corresponding cellId
        const cell = document.getElementById(cellId);

        //if such cell is exist => Update the cell styles
        if (cell) {
          cell.style.color = cellData.textColor;
          cell.style.backgroundColor = cellData.bgColor;
          cell.style.fontSize = `${cellData.fontSize}px`;
          cell.style.textAlign = cellData.align;
          cell.style.fontWeight = cellData.isBold ? "900" : "400";
          cell.style.fontFamily = cellData.fontFamily;
          cell.style.textDecoration = cellData.isUnderline
            ? "underline"
            : "none";
          cell.style.fontStyle = cellData.isItalic ? "italic" : "normal";

          // Update the cell text content
          cell.innerText = cellData.text;

          // Update the state object
          state[cellId] = { ...cellData };
        }
      }

      alert("Data imported successfully!");
    } catch (error) {
      alert(
        "Error parsing JSON file. Please make sure the file conatins exact rows and columns."
      );
      console.error(error);
    }
  };

  //This line initiates the reading of the file as text. When the reading is completed, the onload event will be triggered, and the associated function will be executed.
  reader.readAsText(file);
}

function clearSheet() {
  /*   // Clear the content of all cells in the sheet before exporting cell with file data
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.style.color = "";
    cell.style.backgroundColor = "";
    cell.style.fontSize = "";
    cell.style.textAlign = "";
    cell.style.fontWeight = "";
    cell.style.fontFamily = "";
    cell.style.textDecoration = "";
    cell.style.fontStyle = "";
    cell.innerText = "";
  });

  // Clear the state object
  state = {}; */
}

//export file

function exportData() {
  console.log(state);
  const jsonData = JSON.stringify(state);

  const blob = new Blob([jsonData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = "data.json";
  link.href = url;
  link.click();
}
