import { saveTask } from "./storage.js";

export function enableEditing(task, editBtn) {
    editBtn.addEventListener("click", (event) => {
      if (task.querySelector("input")) return;

      const taskTextElement = task.querySelector(".task-text");
      const taskText = taskTextElement.textContent;
      const editInput = document.createElement("input");
      editInput.type = "text";

      editInput.value = taskText;
      taskTextElement.replaceWith(editInput);

      const wasCompleted = task.classList.contains("completed");

      const saveBtn = document.createElement("button");
      saveBtn.innerHTML = `<span class="material-symbols-outlined">save</span>`;
      saveBtn.className = "save";

      const cancelBtn = document.createElement("button");
      cancelBtn.innerHTML = `<span class="material-symbols-outlined">cancel</span>`;
      cancelBtn.className = "cancel";

      task.insertBefore(saveBtn, editBtn);
      task.insertBefore(cancelBtn, editBtn);

    saveBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const wasCompleted = task.classList.contains("completed");

      const updatedText = editInput.value.trim();

      if (updatedText === "") {
        alert("Task cannot be empty!");
        return;
      }
    const taskTextElement = document.createElement("span");
    taskTextElement.className = "task-text";
    taskTextElement.textContent = updatedText;

    editInput.replaceWith(taskTextElement);
    saveBtn.remove();
    cancelBtn.remove();

    console.log(task.classList.contains("completed"));
    task.classList.toggle("completed", wasCompleted);
    saveTask();
    });

  cancelBtn.addEventListener("click", (event) => {
    event.stopPropagation();
  const taskTextElement = document.createElement("span");
  taskTextElement.className = "task-text";
  taskTextElement.textContent = taskText;

  editInput.replaceWith(taskTextElement);
  saveBtn.remove();
  cancelBtn.remove();
});
    });

}


