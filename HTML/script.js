let display = document.getElementById("display");
let expressionDisplay = document.getElementById("expressionDisplay");
let buttons = document.querySelectorAll(".button");
let operatorClicked = false;
let currentInput = "";
let previousInput = "";
let operator = "";
let expression = ""; // Stores the full equation

buttons.forEach(button => {
  button.addEventListener("click", function () {
    let value = this.dataset.value;

    if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculate();
    } else if (["+", "-", "*", "/", "%"].includes(value)) {
      setOperator(value);
    } else {
      updateDisplay(value);
    }
  });
});

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  expression = "";
  display.value = ""; // Clear main display
  expressionDisplay.value = ""; // Clear top expression display
}

function setOperator(value) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = value;
  previousInput = currentInput;
  currentInput = "";
  expression += " " + operator + " ";
  expressionDisplay.value = expression; // Show the full equation in the expression display
  display.value = ""; // Clear the main display for new input
}

function updateDisplay(value) {
  if (operatorClicked) {
    display.value = value;
    operatorClicked = false;
  } else {
    display.value += value;
  }
  currentInput += value;
  expression += value;
  expressionDisplay.value = expression; // Update top display with full equation
}

function calculate() {
  if (previousInput === "" || currentInput === "") return;

  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    case "%":
      result = prev % current;
      break;
    default:
      return;
  }

  expressionDisplay.value = expression; // Keep showing full equation at the top
  display.value = result; // Show only the final result in the main display

  previousInput = result.toString();
  currentInput = "";
  operatorClicked = true;
}
