const edit=document.querySelector(".edit-btn");
const del=document.querySelector(".delete-btn");
const add=document.querySelector("#add-btn");
const project=document.querySelector(".project");
const input=document.querySelector("#project-input");
const container=document.querySelector("#project-container");
const deleteProject=document.querySelector("#del-project");


add.addEventListener("click", (event)=>{
    const newProject=document.createElement("div");
    newProject.className="project";
    const title=document.createElement("h2");
    title.textContent=input.value;
    const newEdit=document.createElement("button");
    newEdit.className="edit-btn";
    newEdit.textContent="Edit";
    const newDel=document.createElement("button");
    newDel.className="delete-btn";
    newDel.textContent="Delete"
    

    newProject.append(title);
    newProject.append(newEdit);
    newProject.append(newDel);

    container.append(newProject);

    input.value="";
});

container.addEventListener("click", (event)=>{
    if(event.target.matches(".delete-btn")){

       const deleted=event.target.closest(".project");
       deleted.remove();
    }

    if(event.target.matches(".edit-btn")){

    const edited=event.target.closest(".project");
    const title=edited.querySelector("h2");
    const newTitle=prompt("Enter new project name:");

    if(newTitle!==null && newTitle.trim()!==""){
        title.textContent=newTitle;
    }
    
}    
});

