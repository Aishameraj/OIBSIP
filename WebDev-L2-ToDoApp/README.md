# TaskFlow — To-Do Web App

**Plan it. Do it. Done.**

## Project Overview

TaskFlow is a responsive browser-based task manager developed for the Oasis Infobyte Web Development & Designing Internship, Level 2 Task 3. It keeps everyday tasks in two clear lists, with a quiet green-and-neutral interface. The HTML, CSS, JavaScript, and documentation were written for this project without a template or external UI library.

## Internship Information

- Oasis Infobyte
- Web Development & Designing Internship
- Level 2 — Task 3: To-Do Web App

## Features

- Add a task with the Add Task button or Enter.
- Reject blank or whitespace-only tasks; trim surrounding spaces and limit text to 120 characters.
- View separate Pending Tasks and Completed Tasks lists with automatic empty states.
- Edit pending tasks inline; Save or Enter applies changes, Cancel or Escape preserves the original.
- Complete tasks and undo completion to restore them to pending.
- Delete pending or completed tasks.
- See live total, pending, completed, and progress statistics.
- View creation and completion timestamps in the browser's locale and time zone.
- Keep tasks after a refresh using localStorage, with graceful storage-error messages.
- Use responsive layouts, keyboard controls, visible focus, and accessible status feedback.

## Technologies Used

HTML5, CSS3, Vanilla JavaScript, and the Web Storage API. No packages, backend, build step, or external assets are required.

## Project Structure

```text
WebDev-L2-ToDoApp/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── screenshots/
│   └── README.txt
├── README.md
└── .gitignore
```

`index.html` defines the semantic page, form, statistics, and list containers. `css/style.css` contains the layout, component states, and responsive breakpoints. `js/script.js` manages tasks, events, rendering, validation, and storage. `screenshots/README.txt` describes the real screenshots to take. `.gitignore` excludes common editor and operating-system clutter.

## How to Run

1. Download or clone the project.
2. Open `WebDev-L2-ToDoApp/index.html` in a modern browser.
3. Start adding tasks. No installation is required.

Keep all files in their original folders so stylesheet and script paths resolve.

## How It Works

The `tasks` array is the application's state. Each task has an `id`, `text`, `completed`, `createdAt`, and `completedAt` value. A new task starts pending with a creation timestamp. Completing it records a completion timestamp; Undo clears that timestamp and restores the pending state.

`renderTasks()` rebuilds the two lists using safe DOM creation and `textContent`, then `updateStats()` calculates counts and progress from the same array. Only one inline editor is open at a time. Event delegation on the board handles dynamically created buttons, and form submission supports both clicks and Enter. Editing changes text without changing the creation timestamp.

## Local Storage

`saveTasks()` serializes the array as JSON under the key `taskflow_tasks` after adding, editing, completing, restoring, or deleting a task. `loadTasks()` parses it on page load and checks record types, IDs, text lengths, and timestamps. Missing data produces an empty list. Invalid records are skipped with a message; malformed JSON is handled without crashing.

Tasks are stored locally in this browser, not online. Clearing browser data removes them. Another browser, device, or origin has a separate list. File-URL storage behavior can differ between browsers, so keep the same file location and browser. If storage is blocked or full, the app still works in memory and displays a warning that changes cannot survive a refresh. Multiple open tabs do not synchronize live.

## Screenshots

These are planned filenames, not existing images. Take real screenshots and place them in `screenshots/`:

- `screenshots/taskflow-desktop.png`: full desktop app around 1440px, with sample tasks.
- `screenshots/taskflow-tasks.png`: both task lists populated, with counts and timestamps visible.
- `screenshots/taskflow-mobile.png`: stacked layout around 390–440px.

## What I Learned

Concepts demonstrated by this project include DOM manipulation, event handling and delegation, arrays and objects, localStorage serialization, CRUD-like frontend operations, responsive UI, accessible form feedback, and validation. A useful code walkthrough is to follow one task through `addTask()`, `saveTasks()`, `renderTasks()`, and `updateStats()`.

## Manual Testing

Start with an empty list and check both empty states. Add “Finish internship project” with the button and a second task with Enter. Reject empty input and spaces. Edit the first task to “Finish Oasis internship project”; check blank-edit rejection, Save/Enter, Cancel, and Escape. Complete it and verify both counts and timestamps. Refresh and verify persistence. Undo completion, then complete again. Delete tasks from each section and refresh to confirm deletion persists. Try long text and text containing HTML characters. Tab through controls and check widths of 1440, 1024, 768, 440, and 375 pixels.

## Demo Video Walkthrough (75 seconds)

| Time | Show |
| --- | --- |
| 0–2s | Static title card: **Aisha Meraj** / **Web Development & Designing** / **Level 2 — Task 3: To-Do Web App** |
| 2–10s | TaskFlow homepage, tagline, and empty lists. |
| 10–22s | Add “Finish internship project” with the button; add a second task with Enter. |
| 22–34s | Edit the first task to “Finish Oasis internship project” and save. |
| 34–46s | Complete a task; point out its new section, timestamp, updated counts, and progress. |
| 46–56s | Refresh to demonstrate that both tasks and their states remain. |
| 56–65s | Delete a task and show the updated list and count. |
| 65–75s | Resize to roughly 390–440px and briefly show the stacked mobile layout. |

Use a natural pace and non-private sample tasks. Create the title card in your video editor; it is not an application screen.

## Future Improvements

- Task priority
- Due dates
- Filtering by task state
- Text search

## GitHub Preparation

Add this complete folder inside the existing `OIBSIP` repository beside `WebDev-L2-Calculator` and `WebDev-L2-TributePage`. Review locally first and add your screenshots. Do not create another repository.

From the existing repository root, stage and commit only this folder when ready:

```sh
git add WebDev-L2-ToDoApp/
git commit -m "Add Level 2 To-Do Web App project"
```

Alternatively, use GitHub's upload-files page in the existing repository and preserve the folder structure. No files have been pushed automatically.
