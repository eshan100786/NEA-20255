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


  
  //ALGEBRA TEST CODE BELOW

  function generateEquation() {
    const a = Math.floor(Math.random() * 10); // Random coefficient for x
    const b = Math.floor(Math.random() * 20); // Random constant
    const c = Math.floor(Math.random() * 50); // Random result
    document.getElementById("equation").textContent = `${a}x + ${b} = ${c}`;
    return { a, b, c }; //generate a random equation for an algebra question
  }

  function solveForX(a, b, c) {
    return (c - b) / a; // return answer/ return x
  }

    // Function to check the user's solution
  function checkSolution() {
    const userInput = parseFloat(document.getElementById("xInput").value); // Get user input and convert to a float
    const correctSolution = solveForX(equation.a, equation.b, equation.c); // Calculate the correct solution
  
    const solutionElement = document.getElementById("solution"); // Get the element to display the result
   
    if (isNaN(userInput)) { // Check if the input is not a valid number
        solutionElement.textContent = "Please enter a valid number.";
      } else if (Math.abs(userInput - correctSolution) < 0.01) { // Check if the input is close to the correct solution
        solutionElement.textContent = `Correct! x = ${correctSolution.toFixed(2)}.`;
        score++; // Increment the score if correct
      } else { // If the input is incorrect
        solutionElement.textContent = `Incorrect. The correct solution is x = ${correctSolution.toFixed(2)}.`;
      }

      attempts++; // Increment the attempt counter
      if (attempts < 3) {
        setTimeout(() => {
          generateNewQuestion();
        }, 3000); // Wait 3 seconds before showing the next question
      } else {
        setTimeout(() => {
          displayFinalScore();
        }, 3000); // Wait 3 seconds before showing the final score
      }
    }

    let equation; // Stores the current equation to solve
    let attempts = 0; // Tracks the number of attempts made by the user
    let score = 0; // Tracks the user's score
    
    // Create a new h2 element to display the question number
    const questionNumberElement = document.createElement("h2");
    questionNumberElement.id = "questionNumber";
    // Insert the question number element before the existing h2 in the question section
    document.querySelector(".question").insertBefore(questionNumberElement, document.querySelector("h2"));
    
    generateNewQuestion(); // Generate the first question when the page loads
    
    // Add an event listener to the solve button to check the solution when clicked
    document.getElementById("solveButton").addEventListener("click", checkSolution);

    function generateNewQuestion() {
        document.getElementById("xInput").value = "";
        document.getElementById("solution").textContent = "";
        const newEquation = generateEquation();
        equation = newEquation;
        document.getElementById("questionNumber").textContent = `Q${attempts + 1}`; // Display as Q1, Q2, Q3
      }


    function displayFinalScore() {
        let grade; // Variable to store the user's grade based on their score
      
        // Determine the grade based on the score
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
      
        // Get the main element and update its content with the final score and grade
        const mainElement = document.querySelector("main");
        mainElement.innerHTML = `
          <h1>Quiz Complete!</h1>
          <p class="final-score">You got ${score} out of 3 correct.</p>
          <p class="final-grade">Your grade is: <strong>${grade}</strong></p>
        `; 

        const containerElement = document.querySelector(".container");
        if (containerElement) {
          containerElement.remove(); //remove the container and main element
        }
    
        const backButton = document.createElement("button"); //button to student topic select 
        backButton.textContent = "Back to Topic Select";
        backButton.style.marginTop = "20px";
        backButton.addEventListener("click", function () {
          window.location.href = "A-student-topicselect.html";
        });
    
        mainElement.appendChild(backButton);
      }
      

      const backButton = document.createElement("button");
    backButton.textContent = "Back to Topic Select";
    backButton.style.marginTop = "20px";
    backButton.addEventListener("click", function () {
      window.location.href = "A-student-topicselect.html";
    });