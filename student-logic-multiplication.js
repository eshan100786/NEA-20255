  const canvas = document.getElementById("drawCanvas");
  const ctx = canvas.getContext("2d");
  const colorPicker = document.getElementById("colorPicker");
  const thicknessSlider = document.getElementById("thicknessSlider");
  const clearButton = document.getElementById("clearButton");
  
  
  
  let isDrawing = false; //set the draw function to off by default
  let lastX = 0; //declare this for later
  let lastY = 0; // declare this for later 
  let rect = 0;
  
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  // Adjust mouse position for canvas scaling and creates a new fixed scale 
  function getMousePos(e) {
      const rect = canvas.getBoundingClientRect(); //position and size of canvas relative  to viewport
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height; //calculate scaling factor
      return {
        x: (e.clientX - rect.left) * scaleX, // Adjust the coordinates based on the scaling factor
        y: (e.clientY - rect.top) * scaleY, 
      };
    }
  
    //handle drawing
    function draw(e) {
      if (!isDrawing) return; //if user not drawing then exit
      const { x, y } = getMousePos(e); //get adjusted mouse position
      ctx.strokeStyle = colorPicker.value; // set colour 
      ctx.lineJoin = "round"; //smooth connections between lines
      ctx.lineCap = "round"; // round line edges 
      ctx.lineWidth = thicknessSlider.value; //set thickness
  
      ctx.beginPath(); //new drawing path
      ctx.moveTo(lastX, lastY); //move cursor to previous position
      ctx.lineTo(x, y); //create line from previous to new position
      ctx.stroke(); //render the thickness
  
      [lastX, lastY] = [x, y]; // update last known position for next drawing movement
    }
  
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true; // Set drawing mode to active when the mouse button is pressed
      const { x, y } = getMousePos(e); // Get the exact position of the mouse on the canvas
      [lastX, lastY] = [x, y];  //Store the initial position to start the stroke from here
    });
    
    canvas.addEventListener("mousemove", draw);  //Call the draw function whenever the mouse moves while drawing
    canvas.addEventListener("mouseup", () => (isDrawing = false)); //stop drawing when mouse stops clicking
    canvas.addEventListener("mouseout", () => (isDrawing = false)); //stop drawing when mouse out of canvas
  
    clearButton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //when clicking the clear button this will clear content
    });
  



    

//MULTIPLICATION CODE BELOW

// Generate two random 2-digit numbers
function getRandomTwoDigit() {
  return Math.floor(Math.random() * 90) + 10; // Range: 10 to 99
}

// Function to display the multiplication question
function generateEquation() {
  num1 = getRandomTwoDigit(); // Generate the first random 2-digit number
  num2 = getRandomTwoDigit(); // Generate the second random 2-digit number

  const equationText = `${num1} × ${num2}`; // Create the equation text
  document.getElementById("equation").textContent = equationText; // Display the equation
  document.getElementById("questionNumber").textContent = `Q${attempts + 1}`; // Display current question number
}

// Function to calculate the correct answer
function calculateAnswer(num1, num2) {
  return num1 * num2; // Return the product of the two numbers
}

// Function to check if the user's input is correct
function checkSolution() {
  const userAnswer = parseInt(document.getElementById("answerInput").value); // Get user input and convert to integer
  const correctAnswer = calculateAnswer(num1, num2); // Calculate the correct answer
  const solutionElement = document.getElementById("solution"); // Get the solution display element

  if (isNaN(userAnswer)) {
    solutionElement.textContent = `Please enter a valid number.`; // Handle invalid input
  } else if (userAnswer === correctAnswer) {
    solutionElement.textContent = `Correct! The answer is ${correctAnswer}.`; // Correct answer
    score++; // Increment the score
  } else {
    solutionElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`; // Incorrect answer
  }

  attempts++; // Increment the attempt counter
  if (attempts < 3) {
    setTimeout(() => {
      generateEquation(); // Generate a new question after 3 seconds
    }, 3000);
  } else {
    setTimeout(() => {
      displayFinalScore(); // Display the final score after 3 seconds
    }, 3000);
  }
}

// Function to display the final score
function displayFinalScore() {
  let grade; // Variable to store the user's grade
  switch (score) {
    case 3:
      grade = "A"; // Score of 3 earns an A
      break;
    case 2:
      grade = "B"; // Score of 2 earns a B
      break;
    case 1:
      grade = "C"; // Score of 1 earns a C
      break;
    default:
      grade = "F"; // Any other score earns an F
  }

  const mainElement = document.querySelector("main"); // Get the main element
  mainElement.innerHTML = `
    <h1>Quiz Complete!</h1>
    <p class="final-score">You got ${score} out of 3 correct.</p>
    <p class="final-grade">Your grade is: <strong>${grade}</strong></p>
  `; // Display the final score and grade

  const containerElement = document.querySelector(".container"); // Get the container element
  if (containerElement) {
    containerElement.remove(); // Remove the container element
  }

  const backButton = document.createElement("button"); // Create a back button
  backButton.textContent = "Back to Topic Select"; // Set the button text
  backButton.style.marginTop = "20px"; // Add margin to the button
  backButton.addEventListener("click", function () {
    window.location.href = "A-student-topicselect.html"; // Redirect to topic select page
  });

  mainElement.appendChild(backButton); // Add the button to the main element
}

// Initialize the quiz
let num1, num2; // Variables to store the two numbers
let attempts = 0; // Track the number of attempts
let score = 0; // Track the user's score

const questionNumberElement = document.createElement("h2"); // Create a new h2 element
questionNumberElement.id = "questionNumber"; // Set the element's ID
document.querySelector(".question").insertBefore(questionNumberElement, document.querySelector("h2")); // Insert the element

generateEquation(); // Generate the first question

document.getElementById("solveButton").addEventListener("click", checkSolution); // Add event listener to the solve button