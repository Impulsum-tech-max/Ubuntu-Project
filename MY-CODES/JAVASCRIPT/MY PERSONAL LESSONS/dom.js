//DOM selection
const edit = document.querySelector(".edit-btn");
const del = document.querySelector(".delete-btn");
const add = document.querySelector("#add-btn");
const project = document.querySelector(".project");
const input = document.querySelector("#project-input");
const container = document.querySelector("#project-container");
const deleteProject = document.querySelector("#del-project");

//local storage for data retrieval
let projects = [];
const savedProjects = localStorage.getItem("projects");
console.log(savedProjects);

if (savedProjects) {
  projects = JSON.parse(savedProjects);
}
console.log(projects);

//rendering saved data
function renderProjects() {
  container.innerHTML = "";

  projects.forEach((project) => {
    const newProject = document.createElement("div");
    newProject.className = "project";
    newProject.dataset.id=project.id;
    const title = document.createElement("h2");
    title.textContent = project.name;
    const newEdit = document.createElement("button");
    newEdit.className = "edit-btn";
    newEdit.textContent = "Edit";
    const newDel = document.createElement("button");
    newDel.className = "delete-btn";
    newDel.textContent = "Delete";

    newProject.append(title);
    newProject.append(newEdit);
    newProject.append(newDel);
    container.append(newProject);
  });

  console.log(projects);
}
renderProjects();

// adding projects
add.addEventListener("click", (event) => {
  if(input.value.trim()!==""){  
  const projectData={
    id: Date.now(),
    name:input.value
  };

  const newProject = document.createElement("div");
  newProject.className = "project";
  newProject.dataset.id=projectData.id;

  const title = document.createElement("h2");
  title.textContent = input.value;

  const newEdit = document.createElement("button");
  newEdit.className = "edit-btn";
  
  newEdit.textContent = "Edit";
  const newDel = document.createElement("button");
  
  newDel.className = "delete-btn";
  newDel.textContent = "Delete";


  newProject.append(title);
  newProject.append(newEdit);
  newProject.append(newDel);

  container.append(newProject);


  projects.push(projectData);
}


  localStorage.setItem("projects", JSON.stringify(projects));
  console.log(projects);


  input.value = "";
});

//deleting project
container.addEventListener("click", (event) => {
  if (event.target.matches(".delete-btn")) {
    const deleted = event.target.closest(".project");
    const id=Number(deleted.dataset.id);

    projects=projects.filter((project)=>
             project.id!==id);

    localStorage.setItem("projects", JSON.stringify(projects));

    console.log(projects);

    deleted.remove();
  }

  //for editing projects
  if (event.target.matches(".edit-btn")) {
    const edited = event.target.closest(".project");
    const id=Number(edited.dataset.id);
    

    const title = edited.querySelector("h2");
    const newTitle = prompt("Enter new project name:");

    if (newTitle !== null && newTitle.trim() !== "") {
      const trimmedTitle=newTitle.trim();
      
      title.textContent = newTitle;

      const projectToEdit=projects.find((project)=>
                          project.id===id
    );

    projectToEdit.name=trimmedTitle;
    
    localStorage.setItem("projects", JSON.stringify(projects));
      console.log(projectToEdit);
    }
  }
});
