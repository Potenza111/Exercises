// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All event Listners
loadAllEventListners();

// DOM Load Event
document.addEventListener("DOMContentLoaded", getTasks);

// Load All event Listners
function loadAllEventListners() {
  // Add Task Event
  form.addEventListener("submit", addTask);

  // Remove Task Event
  taskList.addEventListener("click", removeTask);

  // Clear Task Event
  clearBtn.addEventListener("click", clearTasks);

  // Filter Tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li Element
    const li = document.createElement("li");

    // Add Class
    li.className = "collection-item";

    // Create Text Node and append li
    li.appendChild(document.createTextNode(task));

    // Create New Link Element
    const link = document.createElement("a");

    // Add Class
    link.className = "delete-item secondary-content";

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
    exit;
  }

  // Create li Element
  const li = document.createElement("li");

  // Add Class
  li.className = "collection-item";

  // Create Text Node and append li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create New Link Element
  const link = document.createElement("a");

  // Add Class
  link.className = "delete-item secondary-content";

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // append the link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // Store in local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task In Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove Single Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove task from local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = "";

  // Faster (innerhtml vs removechild)
  if (confirm("Are You Sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);

      clearTasksFromLocalStorage();
    }
  }
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
