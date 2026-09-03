let selectedFruit=null;

const list=document.querySelector("ul");
const button=document.querySelector("#btn");
const input=document.querySelector("input");
const form=document.querySelector("#fruit");

// Adding the tick action
list.addEventListener("click", (event)=>{
    if(event.target.tagName==="BUTTON")
{
    return;
}    

    selectedFruit=event.target.parentElement;

    
    if(event.target.textContent.includes("✓")){
    event.target.textContent= event.target.textContent.replace("✓", "");
        return;
    }
    event.target.textContent=event.target.textContent + "✓"

});

// Adding the add and delete action
button.addEventListener("click", event=>{

if(input.value.trim()===""){
    alert("Enter a fruit");
    return;
};

 const li=document.createElement("li");
 const span=document.createElement("span");  

 span.textContent=input.value;
 li.appendChild(span);

list.appendChild(li);

window.scrollTo({top: document.body.scrollHeight, 
                behavior: "smooth"});

 input.value="";

 const delBtn=document.createElement("button");
 delBtn.textContent="Delete";
 li.appendChild(delBtn);

delBtn.addEventListener("click", event=>{
    if(selectedFruit.textContent.includes("✓")){
        li.remove(); // remove the li element from the list
    }
});

});

// Adding the enter key action
input.addEventListener("keydown", event=>{
    if(event.key==="Enter"){
        button.click();
    }
});

//adding the delete action to the existing fruits
document.addEventListener("keydown", event=>{
    if(event.key==="Delete" && selectedFruit && selectedFruit.textContent.includes("✓")){
        selectedFruit.remove();
        selectedFruit=null;
    }
});
