// learning some() and every() methods
let products=[
    {name: "laptop", price: 500},
    {name: "phone", price: 300},
    {name: "mouse", price: 50},
    {name: "keyboard", price: 100}
];

let expensive= products.some(product=>product.price>400);
let allAbove40=products.every(product=>product.price>40);

console.log(expensive);
console.log(allAbove40);

// learning includes()
let bannedWords=["spam", "scam", "fraud", "hack"];
let message="scam";

let isBanned=bannedWords.includes(message);


console.log(isBanned);

// learning sort
let scores=[45, 90, 12, 67, 33, 100, 78];

let result=scores.sort((b, a)=>a-b);

console.log(result);

// learning join