let searchInput=document.querySelector('#searchInput');
let searchBtn=document.querySelector('#searchBtn');
let results=document.querySelector('#results');
let sortOption=document.querySelector('#sortOption');
let clearBtn=document.querySelector('#clearBtn');

let users=[];

async function getUsers(){
    try {
        let response=await fetch('https://jsonplaceholder.typicode.com/users');

        if(!response.ok){
            throw new Error("Request failed");
    }
   users=await response.json();

    console.log(users);
} catch(error){
    console.log("Error:", error.message);
}
}

getUsers();

searchBtn.addEventListener('click',function(){
let searchTerm=searchInput.value.toLowerCase().split(" ");

let filteredUsers=users.filter((user)=>{
    return searchTerm.every((term) => {
        return(
            user.name.toLowerCase().includes(term) ||
           user.username.toLowerCase().includes(term) ||
           user.email.toLowerCase().includes(term) ||
           user.phone.includes(term)
);
   
});
});

    

     filteredUsers.sort((a,b)=>{
    return a.name.localeCompare(b.name);
    });

    if(sortOption.value==="desc"){
        filteredUsers.reverse();
    }
    results.innerHTML="";
    results.innerHTML=`${filteredUsers.length} user(s) found`;

    if(filteredUsers.length===0){
        results.textContent="No users found";
        return;
    }
    
 
 searchInput.value="";


 filteredUsers.forEach((user)=>{
    let userDiv=document.createElement('div');

    userDiv.innerHTML=`
    <h3>${user.name}</h3>
    <p>Username:${user.username}</p>
    <p>Email: ${user.email}</p>
    `;

    results.appendChild(userDiv);
});

});

searchInput.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        searchBtn.click();
    }
})

clearBtn.addEventListener('click',function(){
    searchInput.value="";
    results.innerHTML="";
    if(sortOption.value==="desc"){
        sortOption.value="asc";
    }   
});