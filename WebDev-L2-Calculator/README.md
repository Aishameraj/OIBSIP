# NovaCalc — Browser Calculator

## Project Overview
NovaCalc is a small, standalone calculator with a warm neutral interface, a green display, and a CSS Grid keypad. The implementation was written for this project without copying a calculator template or using external assets. It uses no frameworks, dependencies, expression evaluation, or network requests.

## Internship Information
- Oasis Infobyte
- Web Development & Designing Internship
- Level 2 — Task 1: Calculator

## Features
- Addition, subtraction, multiplication, division, and decimals
- Sequential calculations and operator replacement
- Clear, backspace, and keyboard controls
- Previous-operation context and friendly error messages
- Responsive layout, accessible button names, and visible keyboard focus
- 12-digit input limit and readable rounded results

## Technologies Used
HTML5, CSS3, and Vanilla JavaScript. System fonts only.

## Project Structure
```text
WebDev-L2-Calculator/
├── index.html             # Semantic page, display, and keypad
├── css/style.css          # Layout, colors, responsive and focus styles
├── js/script.js           # State, arithmetic, and input event handlers
├── screenshots/README.txt # Instructions for your screenshots
├── README.md              # Usage and project documentation
└── .gitignore             # Editor, OS, and log exclusions
```

## How to Run
Open `index.html` directly in a modern browser such as Chrome, Edge, or Firefox. No installation, build step, or server is required.

## How the Calculator Works
The script stores the current input, previous operand, and selected operator. Buttons and keyboard events use the same input handler. Arithmetic uses a switch statement with normal JavaScript operators; no dynamic code evaluation is used.

Operations run sequentially from left to right: `5 + 3 × 2 = 16`. Choosing × first completes 5 + 3. This is a basic calculator, not an expression parser with multiplication precedence.

Choosing another operator before the next number replaces the pending operator. Equals with an incomplete operation does nothing. Repeated equals keeps the result unchanged. A number after a result starts fresh; an operator continues from that result. Backspace deletes the current input digit, does nothing while waiting for a new operand, and clears a completed result or error.

Inputs allow at most 12 digits. Results round to 12 significant digits, so `0.1 + 0.2` displays `0.3`. Very large or small results may use scientific notation. This is ordinary JavaScript floating-point arithmetic, not an arbitrary-precision calculator.

## Keyboard Controls
| Key | Action |
| --- | --- |
| 0–9 | Enter digits |
| . | Decimal point |
| + / - | Add / subtract |
| * / / | Multiply / divide |
| Enter / = | Calculate |
| Backspace / Delete | Delete last digit |
| Escape | Clear |
| Tab, Shift+Tab | Move button focus |
| Space | Activate focused button |

Enter always calculates, even when a different button has focus. Its default click action is prevented to avoid duplicate input. Browser modifier shortcuts are left alone.

## Edge Cases Handled
Duplicate decimal points are ignored; a leading decimal starts with `0.`. Division by zero shows a friendly message. C, backspace, or a new number recovers from errors. Non-finite results show an error instead of Infinity or NaN. Long input is capped and display text can wrap within the card. Empty deletion leaves zero.

## Verification
24 scripted checks passed using Node with a minimal DOM stub: four arithmetic operations, division by zero, error recovery, decimal addition, floating-point rounding, chaining, operator replacement, duplicate/leading decimals, incomplete/repeated equals, fresh/continued results, backspace, empty backspace, clear, Enter, long input, negative results, click wiring, and asset/button checks. JavaScript syntax checking also passed.

These tests exercise the actual script and its registered event handlers, but do not replace browser tests. Local-file browser preview was blocked by the tool's security policy. Desktop/mobile rendering, actual browser focus behavior, and browser console checks remain to be verified manually.

Manual acceptance checklist:
- [ ] Open on desktop and a narrow phone viewport; check spacing and overflow.
- [ ] Click through `2 + 3 = 5`, `10 - 4 = 6`, `5 × 6 = 30`, `20 ÷ 4 = 5`.
- [ ] Check `2.5 + 1.5 = 4` and `0.1 + 0.2 = 0.3`.
- [ ] Check `5 + 3 × 2 = 16` and `10 ÷ 0` error/recovery.
- [ ] Try keyboard input, Tab focus, Space, Enter, C, and backspace.
- [ ] Enter a long number; confirm no horizontal page scrolling.
- [ ] Check the browser console for errors.

## Screenshots
Capture these after browser testing; image files are not included yet:
- `screenshots/calculator-desktop.png`
- `screenshots/calculator-mobile.png`

## What I Learned
Topics to review and explain in your own words after testing:
- Selecting and updating DOM elements
- Handling click and keyboard events
- Managing calculator state between operations
- Building a responsive keypad with CSS Grid
- Handling invalid input and arithmetic edge cases

## Future Improvements
- Optional theme switching
- A copy-result button
- Automated real-browser regression tests

## Add to an OIBSIP Repository
Copy the entire `WebDev-L2-Calculator` folder into your existing local OIBSIP repository. From that repository's root, run:
```sh
git status
git add WebDev-L2-Calculator
git commit -m "Add NovaCalc Level 2 calculator"
git push
```
If you have not cloned OIBSIP yet, create the repository on GitHub, clone it using the URL GitHub provides, then copy the folder and run the commands above. Do not initialize a separate repository inside the calculator folder.

## Demo Walkthrough
1. Use a 2-second title card with your actual full name, track, and task title, as described in the supplied conversation.
2. Show the calculator and demonstrate `12 × 4 = 48`.
3. Show decimals, sequential calculations, and operator replacement.
4. Demonstrate division by zero and recovery, clear, and backspace.
5. Demonstrate keyboard input and a mobile viewport.
6. Briefly explain state variables, manual arithmetic, and CSS Grid.

The original internship PDF was not reviewed for this implementation; requirements were taken from the supplied project prompt. Review the original document before submission. No GitHub publication or LinkedIn post has been made.
