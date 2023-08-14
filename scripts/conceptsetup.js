const graphemes = [];
const spellingConventions = [];
const syllableTypes = [];
const syllableDivision = [];
const morphemes = [];


// Function to generate a unique ID
function generateUniqueID() {
    return 'checkbox-' + new Date().getTime(); // Using timestamp as ID
  }

function readConceptsData(file) {
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const content = event.target.result;
      const lines = content.split('\n');
  
      lines.forEach(line => {
        const fields = line.split(',');
        if (fields.length == 2) {
            if (fields[0] == 'Graphemes')
            {
                graphemes.push(fields[1])
            }
            else if (fields[0] == 'Syllable Types')
            {
                syllableTypes.push(fields[1])
            }
            else if (fields[0] == 'Syllable Division')
            {
                syllableDivision.push(fields[1]);
            }
            else if (fields[0] == 'Morphemes')
            {
                morphemes.push(fields[1]);
            }
            else if (fields[0] == 'Spelling Conventions')
            {
                spellingConventions.push(fields[1]);
            }
        }
      });
      populateConcepts(syllableTypes,'.syllableTypesGroup');
      populateConcepts(graphemes,'.graphemesGroup');
      populateConcepts(syllableDivision, '.syllableDivisionGroup');
      populateConcepts(morphemes,'.morphemesGroup');
      populateConcepts(spellingConventions,'.spellingConventionsGroup');
    };
  
    reader.readAsText(file);
  }

function populateConcepts(conceptArray, conceptGroup)
{
    console.log(conceptGroup)
    const listGroup = document.querySelector(conceptGroup);
    console.log(conceptArray)
    console.log(listGroup)
    conceptArray.forEach(function(element)
    {
        // Create the list item element
        var listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        // Create the checkbox input element
        var checkbox = document.createElement('input');
        checkbox.classList.add('form-check-input', 'me-1');
        checkbox.type = 'checkbox';
        checkbox.value = '';
        checkbox.id = generateUniqueID(); // Generate a unique ID for the checkbox

        // Create the label element
        const label = document.createElement('label');
        label.classList.add('dd-checkbox', 'form-check-label');
        label.htmlFor = checkbox.id; // Use the same ID as the checkbox
        //label.textContent = 'New checkbox label'; // Update with the desired label text
        label.textContent = element
        // Append the checkbox and label to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        
        // Get the list group element and append the list item to it
        
        listGroup.appendChild(listItem);
        //console.log(listItem.innerHTML);
    })

}


  
// Read the concepts and break them into concept arrays
const filePath = '../data/concepts.csv';
fetch(filePath)
.then(response => response.blob())
.then(blob => {
    const file = new File([blob], 'file.csv', { type: 'text/csv' });
    readConceptsData(file);    
})
.catch(error => {
    console.error('Error reading the file:', error);
});