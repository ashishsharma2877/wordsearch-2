  
/** We are importing the concepts table because it will be updated based on 
 * the user's selection of checkboxes. Based on what is selected or unselected
 * each time, the concepts table will reflect a filtered view. If the filtered
 * array is empty, the concepts table will show all values.
*/
import { conceptsTable } from "./datasetup.js";

/**
 * This event handling section is all about how the concept radio buttons are populated.
 * Once a concept radio button is clicked, we hide any other concept groups shown and
 * we make visible the selected concept group. All this does is show and hide the list of
 * concepts based on the status of a concept button. The concepts are already pre-populated and
 * they're set hidden by default.
 * 
 */
// Get all radio buttons with the name "conceptOptions"
const radioButtons = document.getElementsByName('conceptOptions');
const accordionOptions = document.getElementsByName('accordionOptions');
var globalCounter = 0;
let conceptsArray = [];

// Attach the event listener to each concept radio button
for (let i = 0; i < radioButtons.length; i++) 
{
  radioButtons[i].addEventListener('click', handleRadioButtonClick);
}


/** This event handling section is to handle clicks on the syllable dropdown menu
 *  Once the user clicks on a syllable choice, the existing table - whatever state it is in -
 * will be filtered on the # of syllables. You can either filter on syllables first or
 * you can filter on concepts. Order doesn't matter and output is identical. All
 * searches are on an AND basis.
 */ 

const dropdownMenu = document.querySelector(".syllable-Dropdown");

// Add an event listener for the "click" event on the dropdown menu
dropdownMenu.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior

  // Check if the clicked element is an <a> element inside the dropdown menu
  if (event.target.tagName === "A") {
    const selectedValue = event.target.textContent;
    console.log(`Selected value: ${selectedValue}`);
    // Add a function here to call the filter on data table and filter by # of syllables.
  }
}); 

// Concepts checkbox listeners are setup once even a single radio button is clicked. Take a look at the radio button click
// event to see how this function is called ONE time using a flag. Once setup, it isn't called on subsequent
// radio button click events.
function setupConceptCheckboxListener() 
{

  // Use querySelectorAll to select elements with matching IDs
  var matchingElements = document.querySelectorAll('[id^="conceptCheckbox"]');
  var searchString;

  // Return the selected elements as an array
  let conceptCheckboxArray = Array.from(matchingElements);

  for (let i=0; i<conceptCheckboxArray.length; i++)
  {
    conceptCheckboxArray[i].addEventListener('change',function(event)
    {
      // Select the label sibling for this element and get the value
      let conceptName = conceptCheckboxArray[i].nextElementSibling.textContent;
      let parentElement = conceptCheckboxArray[i].parentNode;
      let grandParentElement = parentElement.parentNode;

      // Checkbox checked. Increase count. Add to search array. Redo search on table.  
      if (conceptCheckboxArray[i].checked) 
      {
        updateConceptPill(grandParentElement.id, true);
        conceptsArray.push(conceptName);
        searchString = conceptsArray.join(" ");
        conceptsTable.column(1).search(searchString).draw();
        
      } else 
      // Checkbox unchecked. Decrease count. Remove from search array. Redo search on table.
      {
        updateConceptPill(grandParentElement.id, false);
        conceptsArray = conceptsArray.filter(item => item!== conceptName);
        searchString = conceptsArray.join(" ");
        conceptsTable.column(1).search(searchString).draw();
      }
    })
  }
}

/*  This function increments or decrements the value of the concept count shown
  next to each concept group. It is called each time a checkbox is checked or
  unchecked. 
*/

function updateConceptPill(conceptName, addRemove)
{
  let conceptGroupName = conceptName.replace("Checks", "Pill");
  let conceptPill = document.getElementById(conceptGroupName);

  // Find the correct concept pill. If it exists...
  if(conceptPill)
  {
    // Get the current value
    let currentValue = parseInt(conceptPill.textContent);

    if (addRemove)
    // Add to pill count
    {
      // Increment the value
      currentValue++;
      // Update the element with the new value
      conceptPill.textContent = currentValue.toString();
    }
    // .. or decrement pill count
    else
    {
      // Decrement the value
      currentValue--;
      // Update the element with the new value
      conceptPill.textContent = currentValue.toString();
    }
  }  
}

/** Function to handle the click event on the radio buttons.
 * Once the user chooses a radio button, the corresponding set of choices inside the accordion are made visible
 **/ 
function handleRadioButtonClick() 
{
  // Remove the word button from the element ID of the button that was clicked.
  const strippedID = this.id.replace(/Button$/, '');
  // The accordion has the same name as the button except the word Button is replaced by Accordion
  // So find that accordion element you need to hide or unhide
  const targetElement = document.getElementById(strippedID + "Accordion");
  // Check which radio button is selected
  for (let i = 0; i < radioButtons.length; i++) 
  {
    if (radioButtons[i].checked) {
      // If the radio button is checked, unhide the accordion to show choices for this radio button
      targetElement.classList.remove('d-none');
      // testRadioButtonEventListener(radioButtons[i].id); // this is just a test function.
    }
    else {
      //If a radio button is unchecked, hide the radio button to hide the choices for this radio button
      accordionOptions[i].classList.add('d-none');
    }
  }
  // One time setup of concept checkbox listeners. It is here because this gives the conceptsetup script
  // enough time to load up the list of concepts into checkboxes. Else we have to use Promise to do this
  // once the checkboxes are setup. This is simpler. And it only happens once.
  if (globalCounter == 0)
  {
    setupConceptCheckboxListener();
    globalCounter = 1;
  }
}

/** function filterBySyllableCount(syllableCount)
 * {
 *   Take syllable count and filter data table on that one syllable count value.
 *  conceptsTable.column(3).search(syllableCount).draw();
 * } 
 * 
 * */
