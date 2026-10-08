const form=document.querySelector("#userForm");
const name=document.querySelector("#nameInput");
const email=document.querySelector("#emailInput");
const message=document.querySelector("#message");
const userList=document.querySelector("#userList");
const searchInput=document.querySelector("#searchInput");   

let users=[];

function userDetails(user){
            const userInfo=document.createElement("div");
            userInfo.innerHTML=`<p>Name: ${user.name}</p> <p>Email: ${user.email}</p>`;
            userInfo.dataset.id=user.id;

            const delBtn=document.createElement("button");
            delBtn.textContent="Delete";
            userInfo.append(delBtn);

            return userInfo;
        }

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
    users.push(data);

   const userInfo=userDetails(data);


    userList.append(userInfo);    
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


userList.addEventListener("click", async (event)=>{
    if(event.target.matches("button")){
        const userInfo=event.target.closest("div");
        const userId=userInfo.dataset.id;
        const id = Number(userId);

       const response= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method:"DELETE"
        }

        );
    

        if(!response.ok){
            throw new Error(`HTTP ERROR: ${response.status}`);
        }

        userInfo.remove();

        users=users.filter(user=> user.id!==id)
    }

    })

    searchInput.addEventListener("input", ()=>{
        const searchTerm=searchInput.value.toLowerCase();
    
        const filteredUsers=users.filter(user=>user.name.toLowerCase().includes(searchTerm)
        || user.email.toLowerCase().includes(searchTerm));
    
        console.log(filteredUsers);

        userList.innerHTML="";

        filteredUsers.forEach(user=>{
       const userInfo=userDetails(user);

            userList.append(userInfo);
        });
    });