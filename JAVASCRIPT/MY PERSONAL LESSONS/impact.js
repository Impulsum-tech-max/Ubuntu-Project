let taskItem = JSON.parse(localStorage.getItem("taskItem")) || [];

let task = document.querySelector("#taskInput");
let select = document.querySelector("#addBtn");
let list = document.querySelector("#taskList");


// Function to create and display a task
function createTask(taskText) {
    let lists = document.createElement("li");
    let deleteButton = document.createElement("button");

    deleteButton.id = "delBtn";
    deleteButton.textContent = "Delete";

    lists.textContent = taskText;
    lists.appendChild(deleteButton);
    list.appendChild(lists);

    deleteButton.addEventListener("click", function(event) {
        event.stopPropagation();

        lists.remove();

        // Remove from array and update Local Storage
        taskItem = taskItem.filter(function(item) {
            return item !== taskText;
        });

        localStorage.setItem("taskItem", JSON.stringify(taskItem));
    });
}


// Load saved tasks when page opens
taskItem.forEach(function(task) {
    createTask(task);
});


// Add new task
select.addEventListener("click", function(event) {

    if (task.value.trim() === "") {
        return alert("You have not entered a task!");
    }

    taskItem.push(task.value);

    localStorage.setItem("taskItem", JSON.stringify(taskItem));

    createTask(task.value);

    task.value = "";
});


// Press Enter to add task
task.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        select.click();
    }
});


// Mark task as completed
list.addEventListener("click", function(event) {

    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
    }

});