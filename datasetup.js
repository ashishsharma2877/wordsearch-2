
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
sliderValue.textContent = slider.value;
slider.addEventListener('input', function () {
    sliderValue.textContent = slider.value;
});

var resultsTable;
// Data table initializaton with some properties
$(document).ready
(
    function () 
    {
        // Initialize the data table
        resultsTable = $('#results_table').DataTable
        (
            {
                lengthMenu: [ 10, 20, 30, 50],
                rowgroup: true,
                select: {
                    style: 'multi'
                },
                pagingType: 'full_numbers',
                columnDefs: [
                    { // Frequency
                        target: 2,
                        visible: true,
                        searchable: false
                    },
                    { // # of syllables
                        target: 3,
                        visible: false
                    }
                ]
    
            }

        );

        resultsTable.on( 'select', function ( e, dt, type, indexes ) {
            if ( type === 'row' ) {
                var data = resultsTable.rows( indexes ).data().pluck( 'id' );
                //console.log("The user made a selection! at index " + indexes)
                var rows = resultsTable.rows(indexes).data();
                console.log("The user chose the word: " + rows[0][0]);
                //Add this data to a running list somewhere. 
                // Another function will remove it from the list upon deselection
            }
        } );
/** 
        // Add capability to select multiple rows by reading the click event and
        //  toggling the class list on that row.
        resultsTable.on('click', 'tbody tr', function (e) 
        {
            e.currentTarget.classList.toggle('selected');
        }); */
    }
);


/** 
document.querySelector('#button').addEventListener('click', function () {
    alert(resultsTable.rows('.selected').data().length + ' row(s) selected');
});
*/

$('#results_table tbody').on('click', 'td.dt-control', function () 
    {
        var tr = $(this).closest('tr');
        var row = resultsTable.row(tr);

        if (row.child.isShown()) 
        {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else 
        {
            // Open this row
            row.child(format(tr.data('child-name'), tr.data('child-value'))).show();
            tr.addClass('shown');
        }
    }
);

function format (name, value)
{
    return '<div>Name: ' + name + '<br />Value: ' + value + '</div>';
}


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
    console.log(dataArray);
    populateDataTable(dataArray);
    return dataArray;
  }

function addNewRow(word, concepts, frequency, syllables) {
    resultsTable.row
        .add([
             word,
             frequency,
             concepts,
             syllables
        ])
        .draw(false);
}

function populateDataTable(data)
{
    var tempWord, tempConcepts, tempFrequency, tempSyllables;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
        const value = data[i][j];
        if(j==0) { tempWord = data[i][j]; }
        else if(j==1) {tempFrequency = data[i][j]; }
        else if(j==2) {tempConcepts = data[i][j];}
        else if(j=3) {tempSyllables = data[i][j];}
        }
        addNewRow(tempWord, tempConcepts, tempFrequency, tempSyllables)
    }
}