const form=document.querySelector("#userForm");
const name=document.querySelector("#nameInput");
const email=document.querySelector("#emailInput");
const message=document.querySelector("#message");



async function getUsersData(userData){
    try{
        message.textContent="Loading users...";

        const response=await fetch("https://jsonplaceholder.typicode.com/users", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    
    
    if(!response.ok){
        throw new Error(`HTTP ERROR: ${response.status}`);
    }

    message.textContent="";

    const data=await response.json();

    const userInfo=document.createElement("div");
    userInfo.innerHTML=`<p>Name: ${data.name}</p> <p>Email: ${data.email}</p>`

    message.append(userInfo);    
    console.log(data);

    name.value="";
    email.value="";
    
    }catch(error){
        message.textContent=`${error.message}`;
    }
}


form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const userData={
        name:name.value,
        email:email.value
    };

getUsersData(userData);    
})
