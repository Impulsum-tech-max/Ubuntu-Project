const description=document.querySelector("textarea");
const amount=document.querySelector("#amount");
const incomeRadio=document.querySelector("#income");
const expenseRadio=document.querySelector("#expense");
const category=document.querySelector("#category");
const transactionForm = document.querySelector("#transaction-form");
const submitBtn=document.querySelector("#submit");
const transactionList=document.querySelector("#transaction-list");
const message=document.querySelector("#empty-message");

let transactions=[];

transactionForm.addEventListener("submit", (event)=>{
    event.preventDefault();
})