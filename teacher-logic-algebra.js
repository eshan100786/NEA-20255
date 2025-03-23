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

  



  ////////////////////////////////////////////////// ALGEBRA TEACHER TEST CODE BELOW


document.addEventListener("DOMContentLoaded", function () { 
  // Get the solve button element
  const solveButton = document.getElementById("solveButton");

   // Add an event listener to the solve button
  solveButton.addEventListener("click", function () {
    // Get the values of inputs for variables a, b, and c
    const aValue = parseFloat(document.getElementById("aInput").value);
    const bValue = parseFloat(document.getElementById("bInput").value);
    const cValue = parseFloat(document.getElementById("cInput").value);
    // Get the paragraph element where the solution will be displayed
    const solutionParagraph = document.getElementById("solution");

    // Check if any of the inputs are not valid numbers
    if (isNaN(aValue) || isNaN(bValue) || isNaN(cValue)) {
      // output error message if all 3 inputs arent numbers
      solutionParagraph.textContent = "please enter valid numbers for a, b, and c.";} 
      else {  // output the answer if all values are numbers 
        let xValue; // define xValue
          xValue = (cValue + bValue) / aValue; //work out answer
    
          // Display the solution, always showing "The answer is"
      solutionParagraph.textContent = `The answer is: ${xValue}`;
        }
      });
 


      // Restrict input to numbers only
      const inputs = document.querySelectorAll('input[type="text"]');

      // iterate every time someone types in any text boxes of the page
      inputs.forEach(function (input) {
        input.addEventListener("input", function () {
      // Allow only numbers, dots, and minus sign in the input field
        this.value = this.value.replace(/[^0-9.-]/g, "");

        });
       });
    });
