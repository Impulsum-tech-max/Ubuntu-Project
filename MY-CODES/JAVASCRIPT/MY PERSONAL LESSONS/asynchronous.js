function serverOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Server 1 failed");
        }, 1000);
    });
}

function serverTwo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Server 2 responded");
        }, 3000);
    });
}

function serverThree() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Server 3 responded");
        }, 2000);
    });
}

async function connectToServer() {
    const success=await Promise.any([serverOne(), serverTwo(), serverThree()]);

    console.log(success);
}

connectToServer();