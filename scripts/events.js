  
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
  
    // Attach the event listener to each radio button
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', handleRadioButtonClick);
  }

  /** Function to handle the click event on the radio buttons.
   * By default all accordions that show choices associated with each radio button, are hidden.
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
        testRadioButtonEventListener(radioButtons[i].id);

      }
      else {
        //If a radio button is unchecked, hide the radio button to hide the choices for this radio button
        accordionOptions[i].classList.add('d-none');
      }
    }
  }

  /** This function sets up the event listeners for all checkboxes under a specific radio button
   * This is a one time setup. It will check if a global array of listeners per radio button 
   * is already populated. If it is then it doesn't do anything. If it is not then it will populate.
   * That means this listener setup will happen the first time a radio button is selected
   */
  function testRadioButtonEventListener(radioButton)
  {
    // This works - tested with console.log and we have the radio button ID
    console.log("Someone clicked the " + radioButton + " radio button!!!");
    // Next we should look at all checkboxes under this radio button and setup event listeners for each one
    // if they aren't setup. If they are setup, then we're good to go.

  }

  /**
   * This section uses the rounded pill badges to be shown against each concept group so you know you have selected
   * 'n' number of concepts from each group. Separately we will show the list of concepts as well but this is a quick
   * visual for the user to know that they've selected non-zero number of concepts from a specific group. This will need to
   * walk through the entire list of concepts in a specific concept group and ensure that if any checkboxes are checked then
   * the rounded pill badge is inserted and we show count inside it. For no checkboxes set, the rounded pill badge will be removed.


  // Get a reference to the checkboxes under a specific radio button and the element to modify
  const checkbox = document.getElementById('checkbox');
  const elementToModify = document.getElementById('elementToModify');

  // Add an event listener to the checkbox
  checkbox.addEventListener('change', function () {
      // Check if the checkbox is checked
      if (checkbox.checked) {
          // If checked, add a class to the element
          elementToModify.classList.add('highlighted');
      } else {
          // If unchecked, remove the class from the element
          elementToModify.classList.remove('highlighted');
      }
  });

  */