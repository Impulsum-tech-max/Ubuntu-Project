// const profile={
//     name: "Impulsum",
//     role: "developer",
//     developer: true
// };

// let stringed=JSON.stringify(profile);
// let storedData=localStorage.setItem("profile", "stringed");
// let retrievedData=localStorage.getItem("stringed")
// let convertedData=JSON.parse(retrievedData);

// profile.developer=false;


// const tasks=[
//     {
//         title: "Learn JSON",
//         completed: true
//     },

//         {
//         title: "Learn Local Storage",
//         completed: false
//     },

//     {
//         title: "Build a project",
//         completed: false
//     }
// ];

// const tasksJSON=JSON.stringify(tasks);
// const storedTasks=localStorage.setItem("tasks", "tasksJSON");
// const getStoredTasks=localStorage.getItem("tasksJSON");
// const parsedTasks=JSON.parse(getStoredTasks);

const settings={
    theme: "dark",
    fontSize: 18,
    notifications: true
};

const settingsToString=JSON.stringify(settings);
const storedSettings=localStorage.setItem("settings", "settingsToString");
const retrievedSettings=localStorage.getItem("settingsToString");
const parsedSettings=JSON.parse(retrievedSettings);


settings.theme="light";
settings.fontSize=20;