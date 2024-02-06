var conceptsTable;
var reviewConceptsList;

export {conceptsTable};
export {reviewConceptsList};

// Data table initializaton with some properties
$(document).ready
(
    function () 
    {
        // Initialize the data table
        conceptsTable = $('#results_table').DataTable
        (
            {
                // Take a look at the sDom reference in DataTables to really understand how to set this property.
                //"sDom": 'lrtip', 
                search: {
                    "regex": true
                },
                "sDom": '<"top"i>rt<"top"lp><"clear">',
                //Dom: 'l<"toolbar">rtip',
                lengthMenu: [ 10, 20, 30, 50],
                rowgroup: true,
                select: {
                    style: 'multi'
                },
                pagingType: 'full_numbers',
                columnDefs: [
                    // Word column
                    {
                        target: 0,
                        visible: true,
                        searchable: true
                    },
                    // Concept column
                    {
                        target: 1,
                        visible: true,
                        searchable: true
                    },
                    { // Frequency column
                        target: 2,
                        visible: true,
                        searchable: false
                    },
                    { // # of syllables column
                        target: 3,
                        visible: false,
                        searchable: true
                    }
                ],
                buttons: 
                [
                    'print',
                
                ]
    
            }

        );

        //conceptsTable.buttons().container().appendTo( $('.col-sm-6:eq(0)', conceptsTable.table().container() ) );


        reviewConceptsList = $('#Concepts').DataTable
        (
            {
                "sDom": 'B<"top"i>rt<"top"lp><"clear">',
                lengthMenu: [ 10, 20, 30, 50],
                select: true,
                pagingType: 'full_numbers',
                buttons:
                [
                    'print'
                ]
            }
        );

        // If you add a custom toolbar item into dataTables, use the sDom property in the initialization
        // to create the div for it. Then use the querySelector to add stuff into it.
        //document.querySelector('div.toolbar').innerHTML = '<b>Custom tool bar! Text/images etc.</b>';

        conceptsTable.on( 'select', function ( e, dt, type, indexes ) {
            if ( type === 'row' ) {
                var data = conceptsTable.rows( indexes ).data().pluck( 'id' );
                var rows = conceptsTable.rows(indexes).data();
            }
        } );
    }
);



// #searchBar is a <input type="text"> element
$('#searchBar').on( 'keyup', function () {
    conceptsTable.search( this.value ).draw();
} );

$('#results_table tbody').on('click', 'td.dt-control', function () 
    {
        var tr = $(this).closest('tr');
        var row = conceptsTable.row(tr);

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
    const filename = "/data/words.csv";
  
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

function addNewRow(word, concepts, frequency, syllables) {
    conceptsTable.row
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
    /*
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
    */
   for(let i=0; i < data.length; i++)
    {
        const [tempWord, tempConcepts, tempFrequency, tempSyllables] = data[i];
        addNewRow(tempWord, tempFrequency, tempConcepts, tempSyllables);
    }
}