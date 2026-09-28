"use strict";

const display = document.querySelector("#display");
const context = document.querySelector("#context");
const status = document.querySelector("#status");
const keypad = document.querySelector(".keypad");
const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
let currentOperand = "0";
let previousOperand = null;
let selectedOperator = null;
let waitingForOperand = false;
let resultShown = false;
let errorMessage = "";
let operationContext = "";
let inputLimitReached = false;

function clearCalculator() {
  currentOperand = "0";
  previousOperand = null;
  selectedOperator = null;
  waitingForOperand = false;
  resultShown = false;
  errorMessage = "";
  operationContext = "";
  inputLimitReached = false;
}

function appendNumber(character) {
  if (errorMessage || resultShown) clearCalculator();
  if (waitingForOperand) {
    currentOperand = "0";
    waitingForOperand = false;
  }
  if (character === "." && currentOperand.includes(".")) return;
  if (currentOperand.replace(/[^0-9]/g, "").length >= 12) {
    inputLimitReached = true;
    return;
  }
  currentOperand = currentOperand === "0" && character !== "." ? character : currentOperand + character;
}

function calculate() {
  if (!selectedOperator || waitingForOperand || errorMessage) return false;
  const left = Number(previousOperand);
  const right = Number(currentOperand);
  operationContext = `${previousOperand} ${symbols[selectedOperator]} ${currentOperand} =`;
  let result;
  switch (selectedOperator) {
    case "+": result = left + right; break;
    case "-": result = left - right; break;
    case "*": result = left * right; break;
    case "/":
      if (right === 0) { errorMessage = "Cannot divide by zero"; return false; }
      result = left / right;
      break;
  }
  if (!Number.isFinite(result)) { errorMessage = "Result is too large"; return false; }
  // Twelve significant digits keep everyday decimal results readable.
  currentOperand = String(Number(result.toPrecision(12)));
  previousOperand = null;
  selectedOperator = null;
  resultShown = true;
  inputLimitReached = false;
  return true;
}

function chooseOperator(operator) {
  if (errorMessage) return;
  if (selectedOperator && !waitingForOperand && !calculate()) return;
  previousOperand = currentOperand;
  selectedOperator = operator;
  operationContext = `${previousOperand} ${symbols[operator]}`;
  waitingForOperand = true;
  resultShown = false;
  inputLimitReached = false;
}

function deleteLastDigit() {
  if (errorMessage || resultShown) { clearCalculator(); return; }
  if (waitingForOperand) return;
  currentOperand = currentOperand.slice(0, -1) || "0";
  inputLimitReached = false;
}

function updateDisplay() {
  display.textContent = errorMessage || currentOperand;
  context.textContent = operationContext || "\u00a0";
  display.classList.toggle("compact", currentOperand.length > 10);
  display.classList.toggle("error", Boolean(errorMessage));
  status.textContent = errorMessage ? "Press C or type a number to restart." : inputLimitReached ? "12-digit input limit reached." : resultShown ? "All worked out." : "Let's work it out.";
}

function handleInput(key) {
  if (/^[0-9.]$/.test(key)) appendNumber(key);
  else if (Object.hasOwn(symbols, key)) chooseOperator(key);
  else if (key === "=" || key === "Enter") calculate();
  else if (key === "Escape") clearCalculator();
  else if (key === "Backspace" || key === "Delete") deleteLastDigit();
  else return;
  updateDisplay();
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleInput(button.dataset.key);
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;
  if (event.target.matches("input, textarea, select, [contenteditable='true']")) return;
  const key = event.key;
  if (!/^[0-9.+*/=-]$/.test(key) && !["Enter", "Escape", "Backspace", "Delete"].includes(key)) return;
  // Prevent Enter's native button click from also applying the focused key.
  event.preventDefault();
  handleInput(key);
  const mappedKey = key === "Enter" ? "=" : key === "Delete" ? "Backspace" : key;
  const button = [...keypad.querySelectorAll("button")].find((item) => item.dataset.key === mappedKey);
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 110);
  }
});

updateDisplay();
