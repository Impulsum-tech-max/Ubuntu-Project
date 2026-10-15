function createBankAccount(){
    let balance=5000;

    let account={
        deposit(amount){
            if(amount>0){
                balance+=amount;
                return balance;
            }else{
                console.log(`Enter valid amount.`);
                return balance;
            }
            
        },

        withdraw(amount){
            if(amount<=0){
                console.log(`Enter valid amount.`);
                return balance;
            };

            if(amount>balance){
                console.log(`Insufficient funds.`);
                return balance;
            };

            balance-=amount;
            return balance;
        },

        getBalance(){
            return balance;
        }
    }
    return account;
}

const account=createBankAccount();

console.log(account.deposit(1000));
console.log(account.withdraw(2000));
console.log(account.getBalance());
