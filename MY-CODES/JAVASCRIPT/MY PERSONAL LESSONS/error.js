const username = "Impulsum";
const password = "abd";

try {
    if(username.trim()===""){
        console.log("Username cannot be empty.")
    }else{
      if(password.length<8){
        throw new Error("Password must contain at least 8 characters");
    }
    console.log(username);
    console.log(password); 
    console.log("Registration successful") 
    }
    


} catch (error) {
    console.log(error.message);
} finally {
    console.log("Registration complete.")
}