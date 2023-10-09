  
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

// Attach the event listener to each concept radio button
for (let i = 0; i < radioButtons.length; i++) 
{
  radioButtons[i].addEventListener('click', handleRadioButtonClick);
}

// Concepts listeners are setup once even a single radio button is clicked. Take a look at the radio button click
// event to see how this function is called ONE time using a flag. Once setup, it isn't called on subsequent
// radio button click events.
function setupConceptCheckboxListener() 
{

  // Use querySelectorAll to select elements with matching IDs
  var matchingElements = document.querySelectorAll('[id^="conceptCheckbox"]');
  var impactedCheckbox;

  // Return the selected elements as an array
  conceptCheckboxArray = Array.from(matchingElements);

  for (let i=0; i<conceptCheckboxArray.length; i++)
  {
    conceptCheckboxArray[i].addEventListener('change',function(event)
{
      // Select the label sibling for this element and get the value
      let conceptName = conceptCheckboxArray[i].nextElementSibling.textContent;
      let parentElement = conceptCheckboxArray[i].parentNode;
      let grandParentElement = parentElement.parentNode;

      // Checkbox checked. Increase count. Add to search. Redo search.  
      if (conceptCheckboxArray[i].checked) 
      {
        updateConceptPill(grandParentElement.id, true);
      } else 
      // Checkbox unchecked. Decrease count. Remove from search. Redo search.
      {
        updateConceptPill(grandParentElement.id, false);
        // Select the label sibling for this element and get the value

        // Remove that from the filter array and filter the concepts table

      }
    })
  }
}

function updateConceptPill(conceptName, addRemove)
{
  let conceptGroupName = conceptName.replace("Checks", "Pill");
  conceptPill = document.getElementById(conceptGroupName);

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

/** 
// Add an event listener to the checkboxes for all concepts
checkbox.addEventListener('change', function () {
  // Check if the checkbox is checked, increase the pill count and add it to the selected concepts data table
  if (checkbox.checked) {
      // If checked, add a class to the element
  } else {
      // If unchecked, decrease the pill count and remove it from the selected concepts data table
  }
}); */

/** Function to handle the click event on the radio buttons.
 * Once the user chooses a radio button, the corresponding set of choices inside the accordion are made visible
 **/ 
function handleRadioButtonClick() {
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

/**
 * This section uses the rounded pill badges to be shown against each concept group so you know you have selected
 * 'n' number of concepts from each group. Separately we will show the list of concepts as well but this is a quick
 * visual for the user to know that they've selected non-zero number of concepts from a specific group. This will need to
 * walk through the entire list of concepts in a specific concept group and ensure that if any checkboxes are checked then
 * the rounded pill badge is inserted and we show count inside it. For no checkboxes set, the rounded pill badge will be removed.

function handleConceptSelection
{

}


*/