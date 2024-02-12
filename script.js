

//* Initializations *//
const requiredKey = "Enter";
const localStorageKey = "TODOLIST";
let todoTaskInputElement = document.getElementById("todoTaskInput");  
let taskDisplayHeroDiv = document.getElementById("taskListHero");



const getDataFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem(localStorageKey));
}

const setTaskToLocalstorage = (newTask) => { 
    
    if(getDataFromLocalstorage() == null) {
        localStorage.setItem(localStorageKey, JSON.stringify([newTask]));
    } else {
        let previousTasks = getDataFromLocalstorage(); 
        previousTasks.push(newTask);
        localStorage.setItem(localStorageKey, JSON.stringify(previousTasks));
        
    }

    // let temp, previousTaskList = getDataFromLocalstorage();
    // temp = (getDataFromLocalstorage() == null) ? [newTaskData] : previousTaskList.push(newTaskData);
    // localStorage.setItem(localStorageKey, JSON.stringify(previousTaskList));
}

const validateTaskString = (taskString) => {
    if(taskString == "") {
        alert("Write something");
        return false;
    }
    
    return true;
} 

const addtodoTaskToList = (e) => {

    if(e.key == requiredKey) {
        if(validateTaskString(todoTaskInputElement.value)) {
            
            let newTask = {
                id: `_taskID${Date.now()}`,
                task: String(todoTaskInputElement.value),
                complete: false
            }
            
            setTaskToLocalstorage(newTask); 
            todoTaskInput.value = null;

            displayTaskOnScreen();
             
        } 
         else {
            console.log("validator fail");
         }
    }       

}

const displayTaskOnScreen = () => {

    if(getDataFromLocalstorage() != null) {
        taskDisplayHeroDiv.innerHTML = null;
        getDataFromLocalstorage().forEach(task => {
            taskDisplayHeroDiv.innerHTML += `  
                <div class="relative" id="${task.id}">
                    <input type="text" id="_task${task.id}" value="${task.task}"  class="${task.complete ? 'line-through' : ''} truncate w-full dark:bg-slate-700 bg-slate-300 dark:text-white text-black lg:px-5 lg:py-2 px-3 lg:px-8 px-6 py-1 dark:text-white text-black lg:text-base text-sm font-semibold rounded-lg outline-none" disabled >
                    <input id="_check${task.id}" ${task.complete ? 'checked' : ''} onClick="markTaskAsCompleteOrNot('${task.id}')" type="checkbox" class="absolute inset-y-0 left-0 flex my-auto ml-2 items-center  w-3 h-3 text-blue-600 bg-gray-100 rounded dark:bg-gray-700">
                    <div onClick="removeTaskById('${task.id}')" class="absolute inset-y-0 right-0 flex my-auto mr-2 items-center" >
                        <svg class="" height="20"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                </div>
            `
        });
    }
}

const removeTaskById = (taskId) => {

    let temp = getDataFromLocalstorage().filter(task => task.id !== taskId);
    document.getElementById(taskId).remove(); 
    localStorage.setItem(localStorageKey, JSON.stringify(temp));

    displayTaskOnScreen()

}


const markTaskAsCompleteOrNot = (taskId) => {
    let taskCheckbox = document.getElementById(`_check${taskId}`);
    
    let tasks = getDataFromLocalstorage();
    let temp = tasks.find(task => task.id === taskId);

    if(!taskCheckbox.checked) { 
        temp.complete = false; 
        taskCheckbox.checked = false;
        document.getElementById(`_task${taskId}`).classList.remove("line-through");
        
    } else { 
        temp.complete = true; 
        taskCheckbox.checked = true;
        document.getElementById(`_task${taskId}`).classList.add("line-through");

    }

    
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    
    displayTaskOnScreen();

}





todoTaskInputElement.addEventListener('keydown', addtodoTaskToList)
displayTaskOnScreen()






// [
//     {"id":"_taskID1","task":"mkknm"},
//     {"id":"_taskID1","task":"mkknm"},
// ]