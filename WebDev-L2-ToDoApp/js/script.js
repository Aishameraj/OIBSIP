"use strict";

const STORAGE_KEY = "taskflow_tasks";
const MAX_LENGTH = 120;
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector("#task-form");
const board = document.querySelector("#task-board");
const warning = document.querySelector("#storage-warning");
let editingId = null;
let tasks = loadTasks();

function showStorageWarning(message) {
  warning.textContent = message;
  warning.hidden = false;
}

function validDate(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return [];
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error("Invalid task list");
    const ids = new Set();
    // Check stored records before rendering: storage can be changed outside the app.
    const validTasks = parsed.filter(task => {
      if (!task || typeof task.id !== "string" || !task.id || ids.has(task.id) ||
          typeof task.text !== "string" || !task.text.trim() || task.text.trim().length > MAX_LENGTH ||
          typeof task.completed !== "boolean" || !validDate(task.createdAt) ||
          (task.completed && !validDate(task.completedAt))) return false;
      ids.add(task.id);
      return true;
    }).map(task => ({ id: task.id, text: task.text.trim(), completed: task.completed,
      createdAt: task.createdAt, completedAt: task.completed ? task.completedAt : null }));
    if (validTasks.length !== parsed.length) showStorageWarning("Some saved tasks could not be read. The remaining tasks are available.");
    return validTasks;
  } catch (error) {
    showStorageWarning("Saved tasks could not be loaded. You can start a new list; browser storage may be unavailable or damaged.");
    return [];
  }
}

function saveTasks() {
  try {
    // Save the updated array after every change so it survives a refresh.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    warning.hidden = true;
  } catch (error) {
    showStorageWarning("Your changes work for this session, but could not be saved. Browser storage may be full or disabled.");
  }
}

function announce(message) {
  document.querySelector("#announcement").textContent = message;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  // Task text is always treated as text, never as HTML.
  if (text !== undefined) element.textContent = text;
  return element;
}

function createButton(label, action, className = "") {
  const button = createElement("button", "button " + className, label);
  button.type = "button";
  button.dataset.action = action;
  return button;
}

function createTaskElement(task) {
  const item = createElement("li", "task-item" + (task.completed ? " is-completed" : ""));
  item.dataset.id = task.id;
  if (editingId === task.id) {
    item.classList.add("is-editing");
    const form = createElement("form", "edit-form");
    form.noValidate = true;
    const label = createElement("label", "", "Edit task");
    label.htmlFor = "edit-input";
    const input = createElement("input");
    input.id = "edit-input";
    input.name = "editedTask";
    input.maxLength = MAX_LENGTH;
    input.value = task.text;
    input.setAttribute("aria-describedby", "edit-error");
    const error = createElement("p", "error");
    error.id = "edit-error";
    error.setAttribute("role", "alert");
    const actions = createElement("div", "task-actions");
    const save = createButton("Save", "save", "complete");
    save.type = "submit";
    actions.append(save, createButton("Cancel", "cancel"));
    form.append(label, input, error, actions);
    item.append(form);
    return item;
  }
  const top = createElement("div", "task-top");
  const indicator = createElement("span", "task-indicator", task.completed ? "✓" : "○");
  indicator.setAttribute("aria-hidden", "true");
  top.append(indicator, createElement("p", "task-text", task.text));
  const timestamp = task.completed ? task.completedAt : task.createdAt;
  const time = createElement("time", "task-time", (task.completed ? "Completed: " : "Created: ") + formatDate(timestamp));
  time.dateTime = timestamp;
  const actions = createElement("div", "task-actions");
  if (task.completed) actions.append(createButton("Undo", "restore"));
  else actions.append(createButton("✓ Complete", "complete", "complete"), createButton("Edit", "edit"));
  actions.append(createButton("Delete", "delete", "delete"));
  actions.querySelectorAll("button").forEach(button => button.setAttribute("aria-label", button.textContent + ": " + task.text));
  item.append(top, time, actions);
  return item;
}

function updateStats() {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;
  const percentage = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
  document.querySelector("#total-count").textContent = tasks.length;
  document.querySelector("#pending-count").textContent = pending;
  document.querySelector("#completed-count").textContent = completed;
  document.querySelector("#pending-badge").textContent = pending;
  document.querySelector("#completed-badge").textContent = completed;
  document.querySelector("#pending-empty").hidden = pending > 0;
  document.querySelector("#completed-empty").hidden = completed > 0;
  document.querySelector("#progress-label").textContent = percentage + "%";
  const progress = document.querySelector("#task-progress");
  progress.value = percentage;
  progress.textContent = percentage + "%";
  document.querySelector("#progress-note").textContent = tasks.length === 0 ? "Your next small win starts here." : pending === 0 ? "All done. Take a moment to enjoy it." : completed + " of " + tasks.length + " tasks complete. Keep going.";
}

function renderTasks() {
  const pendingList = document.querySelector("#pending-list");
  const completedList = document.querySelector("#completed-list");
  pendingList.replaceChildren();
  completedList.replaceChildren();
  tasks.forEach(task => (task.completed ? completedList : pendingList).append(createTaskElement(task)));
  updateStats();
}

function validationMessage(text) {
  if (!text) return "Please write a task first.";
  if (text.length > MAX_LENGTH) return "Keep your task to 120 characters or fewer.";
  return "";
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  const error = validationMessage(text);
  document.querySelector("#form-error").textContent = error;
  taskInput.setAttribute("aria-invalid", String(Boolean(error)));
  if (error) { taskInput.focus(); return; }
  const id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2);
  tasks.unshift({ id, text, completed: false, createdAt: new Date().toISOString(), completedAt: null });
  editingId = null;
  saveTasks();
  renderTasks();
  taskForm.reset();
  document.querySelector("#character-count").textContent = "0 / 120";
  announce("Task added. " + tasks.filter(task => !task.completed).length + " pending.");
  taskInput.focus();
}

function focusTask(id, action) {
  const item = Array.from(board.querySelectorAll(".task-item")).find(element => element.dataset.id === id);
  const button = item && item.querySelector('[data-action="' + action + '"]');
  (button || taskInput).focus();
}

function saveEditedTask(event) {
  if (!event.target.matches(".edit-form")) return;
  event.preventDefault();
  const input = event.target.querySelector("input");
  const text = input.value.trim();
  const error = validationMessage(text);
  event.target.querySelector(".error").textContent = error;
  input.setAttribute("aria-invalid", String(Boolean(error)));
  if (error) { input.focus(); return; }
  const task = tasks.find(task => task.id === editingId);
  if (!task) return;
  task.text = text;
  editingId = null;
  saveTasks();
  renderTasks();
  focusTask(task.id, "edit");
  announce("Task updated.");
}

function cancelEdit() {
  const id = editingId;
  editingId = null;
  renderTasks();
  focusTask(id, "edit");
  announce("Edit cancelled.");
}

// One listener on the board handles buttons even after task rows are rebuilt.
board.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const item = button.closest(".task-item");
  const task = tasks.find(task => task.id === item.dataset.id);
  if (!task) return;
  const action = button.dataset.action;
  if (action === "save") return; // The form's submit event handles click and Enter.
  if (action === "cancel") { cancelEdit(); return; }
  if (action === "edit") {
    editingId = task.id;
    renderTasks();
    const input = document.querySelector("#edit-input");
    input.focus();
    input.select();
    return;
  }
  if (action === "complete" || action === "restore") {
    task.completed = action === "complete";
    task.completedAt = task.completed ? new Date().toISOString() : null;
  } else if (action === "delete") {
    tasks = tasks.filter(candidate => candidate.id !== task.id);
  }
  editingId = null;
  saveTasks();
  renderTasks();
  focusTask(task.id, task.completed ? "restore" : "complete");
  announce(action === "delete" ? "Task deleted." : task.completed ? "Task completed. Well done!" : "Task restored to pending.");
});

taskForm.addEventListener("submit", addTask);
board.addEventListener("submit", saveEditedTask);
board.addEventListener("keydown", event => {
  if (event.key === "Escape" && event.target.closest(".edit-form")) { event.preventDefault(); cancelEdit(); }
});
taskInput.addEventListener("input", () => {
  document.querySelector("#character-count").textContent = taskInput.value.length + " / 120";
  taskInput.removeAttribute("aria-invalid");
  document.querySelector("#form-error").textContent = "";
});

const today = new Date();
document.querySelector("#today").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(today);
document.querySelector("#today").dateTime = today.toISOString();
renderTasks();
