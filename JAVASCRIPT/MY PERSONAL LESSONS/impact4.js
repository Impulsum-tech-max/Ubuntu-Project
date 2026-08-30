let products = [
    { name: "Laptop", price: 500 },
    { name: "Phone", price: 300 },
    { name: "Mouse", price: 50 },
    { name: "Keyboard", price: 100 }
];

let productIndex=products.findIndex(product=>{
   return product.name==="Mouse";
   }
);

console.log(productIndex);

products[productIndex].price=75;


console.log(products);