function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "Impulsum",
                role: "Developer"
            });
        }, 2000);
    });
}

function getNotifications() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("3 new notifications");
        }, 1500);
    });
}

function serverOne() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Server 1 unavailable");
        }, 1000);
    });
}

function serverTwo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Server 2 connected");
        }, 2500);
    });
}

function serverThree() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Server 3 connected");
        }, 2000);
    });
}

async function loadDashboard(){
    try{
    const [user, notifications]=await Promise.all([getUser(), getNotifications()]);
    const servers=await Promise.any([serverOne(), serverTwo(), serverThree()]);

        console.log(`User: ${user.name}`);
        console.log(`Role: ${user.role}`);
        console.log(`Notifications: ${notifications}`);
        console.log(servers);
    }
    catch(error){
        console.log(error);
    }

}
loadDashboard();