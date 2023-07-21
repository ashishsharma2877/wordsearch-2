
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
                select: true,
                pagingType: 'full_numbers'
            }
        );

        // Add capability to select multiple rows by reading the click event and
        //  toggling the class list on that row.
        resultsTable.on('click', 'tbody tr', function (e) {
        e.currentTarget.classList.toggle('selected');
});
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