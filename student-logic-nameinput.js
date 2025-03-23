// Function to validate the input name
function validateName(name) {
  // Regular expression to match only letters (2 to 20 characters)
  const nameRegex = /^[a-zA-Z]{2,20}$/;

  // Validate the input against the regex
  if (!nameRegex.test(name)) {
    return "Name must be between 2 and 20 letters and can't include numbers or symbols.";
  }
  else return ""; // Return an empty string if valid
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const nameInput = document.getElementById("nameInput");
  const errorMessage = document.getElementById("error-msg");

  const name = nameInput.value

  // Validate the name and store the validation result
  const validationMessage = validateName(name);

  // Display validation error if validation fails
  if (validationMessage) {
    errorMessage.textContent = validationMessage;
    errorMessage.style.display = "block";
    return; // Exit the function to prevent redirection
  }

  // Clear the error message if validation passes
  errorMessage.textContent = "";
  errorMessage.style.display = "none";

  // Redirect to the next page (ensure this file exists)
  window.location.href = "A-student-topicselect.html";
}

// Attach the event listener to the form
document.getElementById("nameForm").addEventListener("submit", handleSubmit);
