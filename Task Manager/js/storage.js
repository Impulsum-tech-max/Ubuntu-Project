

export function saveTask() {
  const tasks = document.querySelectorAll(".task");

  const taskData = Array.from(tasks).map((task) => {
    return {
      text: task.querySelector(".task-text").textContent,
      completed: task.classList.contains("completed"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(taskData));
}

export function loadTask(enableEditing, currentFilter) {
  const retrieveData = localStorage.getItem("tasks") || "[]";
  const parsedData = JSON.parse(retrieveData);

  parsedData.forEach((parsedDatum) => {
    const newList = document.createElement("li");
    newList.className = "task";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = parsedDatum.text;
    newList.append(taskText);

    if (parsedDatum.completed) {
      newList.classList.add("completed");
    }

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = `<span class="material-symbols-outlined">
                      edit</span>`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete";
    delBtn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;

    newList.append(editBtn, delBtn);
    enableEditing(newList, editBtn);

    delBtn.addEventListener("click", () => {
      newList.remove();
      saveTask();
    });

    newList.addEventListener("click", (event) => {
      if (
  (!event.target.closest(".delete, .edit, .save, .cancel, input"))
) {
        newList.classList.toggle("completed");
        saveTask();
      }
    });

    if (currentFilter === "completed") {
      if (parsedDatum.completed) {
        newList.style.display = "list-item";
      } else {
        newList.style.display = "none";
      }
    } else if (currentFilter === "pending") {
      if (!parsedDatum.completed) {
        newList.style.display = "list-item";
      } else {
        newList.style.display = "none";
      }
    } else {
      newList.style.display = "list-item";
    }
    taskList.append(newList);
  });
}
