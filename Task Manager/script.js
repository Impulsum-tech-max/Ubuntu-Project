import { saveTask, loadTask } from "./js/storage.js";
import { enableEditing } from "./js/tasks.js";

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const all = document.querySelector("#filterAll");
const pending = document.querySelector("#filterPending");
const completed = document.querySelector("#filterCompleted");


let currentFilter = "all";
all.classList.add("active");

addBtn.addEventListener("click", (event) => {
  const lists = document.createElement("li");
  const delBtn = document.createElement("button");

  lists.className = "task";
  delBtn.className = "delete";
  delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerHTML = `<span class="material-symbols-outlined">
                      edit</span>`;

  delBtn.addEventListener("click", (event) => {
    lists.remove();
    saveTask();
  });

  if (taskInput.value.trim() === "") {
    alert("You must enter a task!");
    return;
  }

  const taskText=document.createElement("span");
  taskText.className="task-text";
  taskText.textContent=taskInput.value;

  lists.append(taskText, editBtn, delBtn);
  enableEditing(lists, editBtn)
  taskList.append(lists);

  if (currentFilter === "completed") {
    lists.style.display = "none";
  } else {
    lists.style.display = "list-item";
  }

  taskList.scrollTop = taskList.scrollHeight;
  taskInput.value = "";

  saveTask();

  lists.addEventListener("click", (event) => {
    if (
  (!event.target.closest(".delete, .edit, .save, .cancel, input"))
      )  {
      lists.classList.toggle("completed");
      saveTask();
    }
  });
});

all.addEventListener("click", (event) => {
  const tasks = document.querySelectorAll(".task");

  currentFilter = "all";

  all.classList.add("active");
  pending.classList.remove("active");
  completed.classList.remove("active");

  tasks.forEach((task) => {
    task.style.display = "list-item";
  });
});

pending.addEventListener("click", (event) => {
  const tasks = document.querySelectorAll(".task");

  currentFilter = "pending";

  all.classList.remove("active");
  pending.classList.add("active");
  completed.classList.remove("active");

  tasks.forEach((task) => {
    if (task.classList.contains("completed")) {
      task.style.display = "none";
    } else {
      task.style.display = "list-item";
    }
  });
});

completed.addEventListener("click", (event) => {
  const tasks = document.querySelectorAll(".task");

  currentFilter = "completed";

  all.classList.remove("active");
  pending.classList.remove("active");
  completed.classList.add("active");

  tasks.forEach((task) => {
    if (task.classList.contains("completed")) {
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  });
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

loadTask(enableEditing, currentFilter);

function liveTimeDate(){
  const now = new Date();
  document.querySelector(".date").textContent=now.toLocaleString(`en-NG`, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

setInterval(liveTimeDate, 1000);
liveTimeDate()