var table = $('#example').DataTable();

window.onload = function() {
    const filename = "words.csv";
  
    fetch(filename)
      .then(response => response.text())
      .then(csvData => {
        const dataArray = parseCSV(csvData);
      })
      .catch(error => {
        console.error("Error reading the file:", error);
      });
  };
  
  function parseCSV(csvData) {
    const lines = csvData.split("\n");
    const dataArray = [];
  
    for (let i = 0; i < lines.length; i++) {
      const row = lines[i].trim();
  
      if (row !== "") {
        const columns = row.split(",");
        dataArray.push(columns);
      }
    }
    populateDataTable(dataArray);
    return dataArray;
  }

function addNewRow(word, concepts, frequency, rank) {
    table.row
        .add([
             word,
             concepts,
             frequency,
             rank,
        ])
        .draw(false);
}

function populateDataTable(data)
{
    var tempWord, tempConcepts, tempFrequency, tempRank;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
        const value = data[i][j];
        if(j==0) { tempWord = data[i][j]; }
        else if(j==1) {tempConcepts = data[i][j]; }
        else if(j==2) {tempFrequency = data[i][j];}
        else if(j=3) {tempRank = data[i][j];}
        }
        addNewRow(tempWord, tempConcepts, tempFrequency, tempRank)
    }
}