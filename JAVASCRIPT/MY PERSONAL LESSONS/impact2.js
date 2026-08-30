console.log("Js is connected");

let button=document.querySelector("#themeBtn");
let text=document.querySelector("#text");

button.addEventListener("click",function(){
console.log("Button clicked");    
text.classList.toggle("dark");
});
