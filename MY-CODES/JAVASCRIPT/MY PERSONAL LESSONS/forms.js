const form=document.querySelector("form");
const input=document.querySelector("#name");
const message=document.querySelector("#message");
const email=document.querySelector("#email");

function validateName(name){
    if(name===""){
    return "Please enter your name.";
      
    }
    
    if(name.length<3){
    return "Name must contain at least 3 characters.";
        
    }
    return "";
}

function validateEmail(emailAddress){
    if(emailAddress===""){
        return "Please enter your email address.";
        
    }

    if(!emailAddress.includes("@") || !emailAddress.includes(".")){
        return "Please enter a valid email address.";
        
    }
    return "";
}

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    const name=input.value.trim();
    const emailAddress=email.value.trim();


    if(name==="" && emailAddress===""){
        message.textContent="Please enter your name and email address.";
        return;
    }

   const errorMessage = validateName(name);

   if(errorMessage!==""){
    message.textContent= errorMessage;
    return;
   }

    const validEmail= validateEmail(emailAddress);
    
    if(validEmail!==""){
        message.textContent=validEmail;
        return;
    }
    
    message.textContent=`Hello, ${name}! Your email address is ${emailAddress}.`;
   
    
    input.value="";
    email.value="";
});

// realtime validation
input.addEventListener("input", ()=>{
    
   const name=input.value.trim();
    
    
   const errorMessage = validateName(name);
   
   if(errorMessage!==""){
    message.textContent= errorMessage;
    return;
   }

   
    message.textContent="";
    
});

email.addEventListener("input", ()=>{
    const emailAddress=email.value.trim();

    const validEmail=validateEmail(emailAddress);

    if(validEmail!==""){
    message.textContent=validEmail;
    return;
   }
   message.textContent="";
});