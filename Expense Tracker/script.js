const totalIncomeDisplay = document.querySelector("#total-income");
const totalExpenseDisplay = document.querySelector("#total-expenses");
const currentBalanceDisplay = document.querySelector("#current-balance");

const description = document.querySelector("textarea");
const amount = document.querySelector("#amount");
const incomeRadio = document.querySelector("#income");
const expenseRadio = document.querySelector("#expense");
const category = document.querySelector("#category");
const transactionForm = document.querySelector("#transaction-form");
const submitBtn = document.querySelector("#submit");
const transactionList = document.querySelector("#transaction-list");
const message = document.querySelector("#empty-message");

let transactions = [];
let editingId = null;

transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const descriptionInput = description.value;
  const amountInput = Number(amount.value);

  let type;

  if (incomeRadio.checked) {
    type = incomeRadio.value;
  } else if (expenseRadio.checked) {
    type = expenseRadio.value;
  }

  const selectedCategory = category.value;
  const id = editingId === null ? crypto.randomUUID() : editingId;

  const transaction = {
    descriptionInput,
    amountInput,
    type,
    selectedCategory,
    id,
  };

  const index = transactions.findIndex((item) => item.id === editingId);
  if (index === -1) {
    transactions.push(transaction);
  } else {
    transactions[index] = transaction;
  }

  saveTransactions();

  renderTransactions();
  updateSummary();
  transactionForm.reset();
  editingId = null;
  submitBtn.textContent = "Add Transaction";
});

function saveTransactions() {
  localStorage.setItem("transactionData", JSON.stringify(transactions));
}

function loadTransactions() {
  const retrievedTransactions = localStorage.getItem("transactionData");
  const parsedData = JSON.parse(retrievedTransactions);
  transactions = parsedData || [];
}

function renderTransactions() {
  if (transactions.length !== 0) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }

  transactionList.innerHTML = "";

  transactions.forEach((transaction) => {
    const list = document.createElement("li");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    editBtn.addEventListener("click", (event) => {
      description.value = `${transaction.descriptionInput}`;
      category.value = `${transaction.selectedCategory}`;
      amount.value = `${transaction.amountInput}`;

    console.log("Stored type:", JSON.stringify(transaction.type));
console.log("Income value:", JSON.stringify(incomeRadio.value));
console.log("Expense value:", JSON.stringify(expenseRadio.value));  
    incomeRadio.checked = transaction.type === incomeRadio.value;
    expenseRadio.checked = transaction.type === expenseRadio.value;

      editingId = transaction.id;
      submitBtn.textContent = "Update Transaction";
    });

    delBtn.addEventListener("click", (event) => {
      if (editingId === transaction.id) {
        editingId = null;
        transactionForm.reset();
        submitBtn.textContent = "Add Transaction";
      }

      transactions = transactions.filter((item) => {
        return item.id !== transaction.id;
      });

      renderTransactions();
      updateSummary();
      saveTransactions();
    });

    const items = document.createElement("span");
    items.textContent = `${transaction.descriptionInput} - ${transaction.selectedCategory} - ₦${transaction.amountInput.toLocaleString("en-NG", {minimumFractionDigits:2, maximumFractionDigits:2})} - ${transaction.type}`;

    list.append(items, editBtn, delBtn);

    transactionList.append(list);
  });
}

function updateSummary() {
  const incomeList = transactions.filter((transaction) => {
    return transaction.type === incomeRadio.value;
  });

  const totalIncome = incomeList.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amountInput;
  }, 0);

  const expenseList = transactions.filter((transaction) => {
    return transaction.type === expenseRadio.value;
  });

  const totalExpenses = expenseList.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amountInput;
  }, 0);

  const currentBalance = totalIncome - totalExpenses;

  totalIncomeDisplay.textContent = `₦${totalIncome.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  totalExpenseDisplay.textContent = `₦${totalExpenses.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  currentBalanceDisplay.textContent = `₦${currentBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

loadTransactions();
renderTransactions();
updateSummary();
