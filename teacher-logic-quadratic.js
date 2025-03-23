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

  



  ////////////////////////////////////////////////// QUADRATIC TEACHER TEST CODE BELOW


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
      solutionParagraph.textContent = "Please enter valid numbers for a, b, and c.";      
      // Display a message if any coefficient is not a valid number
      } 
      
      else {
        // Calculate the discriminant
        const discriminant = bValue * bValue - 4 * aValue * cValue;
        
        // CASE 1 - 2 values
        if (discriminant > 0) {
        // quadratic formula to work out the 2 answers
        const x1 = (-bValue + Math.sqrt(discriminant)) / (2 * aValue);
        const x2 = (-bValue - Math.sqrt(discriminant)) / (2 * aValue);
        // print the answer to 2dp
        solutionParagraph.textContent = `The solutions are: x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
      }

        //CASE 2 - 1 value
        else if (discriminant == 0) {
        // calculate the x value
        const x1 = -bValue / (2 * aValue);
        solutionParagraph.textContent = `The solution is: x = ${x1.toFixed(2)}`;
      }
        //CASE 3 - no value
        else {
        // Display a message if no real solutions exist
        solutionParagraph.textContent = "No real solutions exist.";
      }

      }});

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
