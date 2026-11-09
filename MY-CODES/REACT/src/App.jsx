import { useState } from 'react';

function App() {
const [category, setCategory] = useState("");
const [isRecurring, setIsRecurring] = useState(false);
const [type, setType] = useState("Income");

function handleSubmit(event) {
    event.preventDefault();
     setCategory("")
}

    return (
        <div>
            <h2>My React Form</h2>
            <form onSubmit={handleSubmit}>


<select
    value={category}
    onChange={(event) => setCategory(event.target.value)}
>
    <option value="">Select a category</option>
    <option value="Food">Food</option>
    <option value="Transport">Transport</option>
    <option value="Education">Education</option>
    <option value="Entertainment">Entertainment</option>
</select>           

<input
    type="checkbox"
    checked={isRecurring}
    onChange={(event) => setIsRecurring(event.target.checked)}
/>

<label>Recurring transaction</label>

<label>
    <input
        type="radio"
        name="transactionType"
        value="Income"
        checked={type === "Income"}
        onChange={(event) => setType(event.target.value)}
    />
    Income
</label>

<label>
    <input
        type="radio"
        name="transactionType"
        value="Expense"
        checked={type === "Expense"}
        onChange={(event) => setType(event.target.value)}
    />
    Expense
</label>

            </form>


            <p>Category: {category}</p>
        </div>
    );
}

export default App;