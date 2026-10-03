const container=document.querySelector("#container");
const search=document.querySelector("#searchInput");
const button=document.querySelector("#refresh");

let users=[];

function renderUsers(userList){

        container.innerHTML="";

      if (userList.length === 0) {
    container.innerHTML = "<h2>No users found</h2>";
    return;
}

        userList.forEach(user =>{
        const card=document.createElement("div");

        const name=document.createElement("p");
        name.textContent=`Name: ${user.name}`;

        const email=document.createElement("p");
        email.textContent=`Email: ${user.email}`;

        const spacer=document.createElement("hr");

        const city=document.createElement("p");
        city.textContent=`City of Residence: ${user.address.city}`;

        card.append(name, email, city, spacer);
        container.append(card);
})

}

search.addEventListener("input", (event)=>{
    

   const searchTerm=event.target.value.toLowerCase();

    const filteredUsers=users.filter((user)=>{
        const name=user.name.toLowerCase();
        const email=user.email.toLowerCase();
        const city=user.address.city.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm) || city.includes(searchTerm);

        
 })
 renderUsers(filteredUsers);
 
})

    


async function getUser(){
    container.innerHTML="<h2>Loading...</h2>";
    
    try{
    const info=await fetch("https://jsonplaceholder.typicode.com/users");

    if (!info.ok) {
    throw new Error(`HTTP error: ${info.status}`);
}

    users=await info.json();
    renderUsers(users);

    }
    catch(error){
        container.innerHTML=`<p>Error: ${error.message}</p>`;
    }
}

getUser();

button.addEventListener("click", ()=>{
    getUser();
})