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




// QUADRATIC TEST BELOW

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a quadratic equation with real roots
function generateEquation() {
  let a, b, c;
  a = getRandomInt(1, 10); // Random coefficient for x² (1 to 10)

  // Ensure the discriminant (b² - 4ac) is non-negative for real roots
  do {
    b = getRandomInt(-10, 20); // Random coefficient for x (-10 to 20)
    c = getRandomInt(-10, 20); // Random constant term (-10 to 20)
  } while (b * b - 4 * a * c < 0); // Repeat until real roots exist

  // Display the quadratic equation in the format ax² + bx + c
  document.getElementById("equation").innerHTML = `${a}x<sup>2</sup> + ${b}x + ${c}`;
  return { a, b, c }; // Return the coefficients
}

// Function to calculate the roots of the quadratic equation
function calculateRoots(a, b, c) {
  const discriminant = b * b - 4 * a * c; // Calculate the discriminant
  if (discriminant < 0) {
    return null; // No real roots if discriminant is negative
  } else {
    const sqrtDiscriminant = Math.sqrt(discriminant); // Square root of discriminant
    const x1 = (-b + sqrtDiscriminant) / (2 * a); // First root
    const x2 = (-b - sqrtDiscriminant) / (2 * a); // Second root
    return [x1, x2]; // Return the roots as an array
  }
}

// Function to check the user's solution
function checkSolution() {
  const userX1 = parseFloat(document.getElementById("x1Input").value); // Get user's first root
  const userX2 = parseFloat(document.getElementById("x2Input").value); // Get user's second root
  const roots = calculateRoots(a, b, c); // Calculate the correct roots

  const solutionElement = document.getElementById("solution"); // Get the solution display element

  if (roots === null) {
    solutionElement.textContent = "This equation has no real solutions."; // Handle no real roots
  } else {
    const [correctX1, correctX2] = roots; // Destructure the correct roots
    // Check if user's input matches the correct roots (order doesn't matter)
    if (
      (Math.abs(userX1 - correctX1) < 0.001 && Math.abs(userX2 - correctX2) < 0.001) ||
      (Math.abs(userX1 - correctX2) < 0.001 && Math.abs(userX2 - correctX1) < 0.001)
    ) {
      solutionElement.textContent = `Correct! The solutions are x₁ = ${correctX1.toFixed(2)} and x₂ = ${correctX2.toFixed(2)}.`;
      score++; // Increment the score if correct
    } else {
      solutionElement.textContent = `Incorrect. The correct solutions are x₁ = ${correctX1.toFixed(2)} and x₂ = ${correctX2.toFixed(2)}.`;
    }
  }

  attempts++; // Increment the attempt counter
  if (attempts < 3) {
    setTimeout(() => {
      generateNewQuestion(); // Generate a new question after 3 seconds
    }, 3000);
  } else {
    setTimeout(() => {
      displayFinalScore(); // Display the final score after 3 seconds
    }, 3000);
  }
}

// Function to generate a new question
function generateNewQuestion() {
  document.getElementById("x1Input").value = ""; // Clear the first root input
  document.getElementById("x2Input").value = ""; // Clear the second root input
  document.getElementById("solution").textContent = ""; // Clear the solution message

  const equation = generateEquation(); // Generate a new quadratic equation
  a = equation.a; // Update the coefficient a
  b = equation.b; // Update the coefficient b
  c = equation.c; // Update the constant term c

  document.getElementById("questionNumber").textContent = `Q${attempts + 1}`; // Display question number as Q1, Q2, etc.
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

// Initialize variables
let a, b, c; // Coefficients of the quadratic equation
let attempts = 0; // Track the number of attempts
let score = 0; // Track the user's score

// Create and insert the question number element
const questionNumberElement = document.createElement("h2");
questionNumberElement.id = "questionNumber";
questionNumberElement.textContent = `Q${attempts + 1}`; // Initial question number
document.querySelector(".question").insertBefore(questionNumberElement, document.querySelector("h2"));

generateNewQuestion(); // Generate the first question

// Add event listener to the solve button
document.getElementById("solveButton").addEventListener("click", checkSolution);