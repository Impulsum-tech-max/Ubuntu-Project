function finallyTest(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            reject("Something went wrong...")
        }, 2000);
    })
}

finallyTest()
    .catch((error)=>{
        console.log(error);
    })
    .finally(()=>{
        console.log("Operation finished");
    })