  // Get all radio buttons with the name "conceptOptions"
  const radioButtons = document.getElementsByName('conceptOptions');
  const accordionOptions = document.getElementsByName('accordionOptions')
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
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        // If the radio button is checked, unhide the accordion to show choices for this radio button
        targetElement.classList.remove('d-none');
      }
      else {
        //If a radio button is unchecked, hide the radio button to hide the chocies for this radio button
        accordionOptions[i].classList.add('d-none');
      }
    }
  }