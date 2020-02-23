// Define UI Vars
const btnAdd = document.querySelector(".btn");
const btnClear = document.querySelector(".clear-tasks");
const task = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");

// Load All event Listners
loadAllEventListners();

// DOM Load Event
document.addEventListener("DOMContentLoaded", function() {
  const items = JSON.parse(localStorage.getItem("tasks")) || [];

  items.forEach(function(task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const del = document.createElement("del");

    del.className = "delete-item secondary-content";

    del.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(del);

    taskList.appendChild(li);
  });
});

// Load All event Listners
function loadAllEventListners() {
  btnAdd.addEventListener("click", addTask);
  taskList.addEventListener("click", deleteTask);
  btnClear.addEventListener("click", clearTaskList);
  filter.addEventListener("keyup", filterTasks);
}

// Add Task Event
function addTask(e) {
  if (task.value == "") {
    alert("Please Enter a task");
    exit;
  }
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task.value));

  const del = document.createElement("del");

  del.className = "delete-item secondary-content";

  del.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(del);

  taskList.appendChild(li);

  addToStorage(task.value);

  task.value = "";
  e.preventDefault();
}

function addToStorage(item) {
  const items = JSON.parse(localStorage.getItem("tasks")) || [];
  items.push(item);
  localStorage.setItem("tasks", JSON.stringify(items));
}

function removeFromStorage(item) {
  const items = JSON.parse(localStorage.getItem("tasks")) || [];

  items.forEach(function(task, index) {
    if (item.textContent === task) {
      console.log(index);
      items.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(items));
}

// Remove Task Event
function deleteTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeFromStorage(e.target.parentElement.parentElement);
  }
}

// Clear Task Event
function clearTaskList(e) {
  if (confirm("Are You Sure?")) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
      localStorage.clear();
    }
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(item) {
    const task = item.firstChild.textContent;

    if (task.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
