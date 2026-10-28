const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const all = document.querySelector("#filterAll");
const pending = document.querySelector("#filterPending");
const completed = document.querySelector("#filterCompleted");

function saveTask() {
  const tasks = document.querySelectorAll(".task");

  const taskData = Array.from(tasks).map((task) => {
    return {
      text: task.firstChild.textContent,
      completed: task.classList.contains("completed"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

function loadTask() {
  const retrieveData = localStorage.getItem("tasks") || "[]";
  const parsedData = JSON.parse(retrieveData);

  parsedData.forEach((parsedDatum) => {
    const newList = document.createElement("li");
    newList.className = "task";

    newList.append(parsedDatum.text);

    if (parsedDatum.completed) {
      newList.classList.add("completed");
    }

    const delBtn = document.createElement("button");
    delBtn.className = "delete";
    delBtn.textContent = "Delete";
    newList.append(delBtn);

    delBtn.addEventListener("click", () => {
      newList.remove();
      saveTask();
    });

    newList.addEventListener("click", (event) => {
      if (!event.target.matches(".delete")) {
        newList.classList.toggle("completed");
        saveTask();
             }
    });

    if (currentFilter === "completed") {
        if(parsedDatum.completed){
         newList.style.display = "list-item";
  } else {
    newList.style.display = "none";
  }
    }
    else if (currentFilter === "pending") {
        if(!parsedDatum.completed){
         newList.style.display = "list-item";
  } else {
    newList.style.display = "none";
  }
    }
    else{
        newList.style.display="list-item"
    }
    taskList.append(newList);
  });
    
  }

let currentFilter = "all";
all.classList.add("active");

addBtn.addEventListener("click", (event) => {
  const lists = document.createElement("li");
  const delBtn = document.createElement("button");

  lists.className = "task";
  delBtn.className = "delete";
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", (event) => {
    lists.remove();
    saveTask();
  });

  if (taskInput.value.trim() === "") {
    alert("You must enter a task!");
    return;
  }

  lists.append(taskInput.value, delBtn);
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
    if (!event.target.matches(".delete")) {
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

loadTask();
