

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

const updateTaskToLocalstorage = (updatedTasks) => {
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
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

        let tasks = getDataFromLocalstorage().sort((a, b) => {
            return a.complete - b.complete;
        })

        taskDisplayHeroDiv.innerHTML = null;
        tasks.forEach(task => {
            taskDisplayHeroDiv.innerHTML += `  
                <div class="relative" id="${task.id}">
                    <input type="text" id="_task${task.id}" value="${task.task}"  class="${task.complete ? 'line-through' : ''} truncate w-full dark:bg-slate-700 bg-slate-300 dark:text-white text-black lg:px-5 lg:py-2 px-3 lg:px-8 px-6 py-2 lg:pr-16 pr-12 dark:text-white text-black lg:text-base text-sm font-semibold rounded-lg outline-none" disabled >
                    <input id="_check${task.id}" ${task.complete ? 'checked' : ''} onClick="markTaskAsCompleteOrNot('${task.id}')" type="checkbox" class="absolute inset-y-0 left-0 flex my-auto ml-2 items-center  w-3 h-3 text-blue-600 bg-gray-100 rounded dark:bg-gray-700">
                    <div onClick="removeTaskById('${task.id}')" class="absolute inset-y-0 right-0 flex my-auto mr-2 items-center" >
                        <svg class="" height="20"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fe1616" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div class="absolute inset-y-0 right-0 flex my-auto mr-8 items-center" >
                        <svg viewBox="0 0 24 24" class="${task.complete ? 'hidden' : ''}" height="18" id="_editPen${task.id}" onClick="makeTaskUpdatable('${task.id}')" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00bfff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.3282 8.32837L15.8939 5.89405C14.7058 4.706 14.1118 4.11198 13.4268 3.88941C12.8243 3.69364 12.1752 3.69364 11.5727 3.88941C10.8877 4.11198 10.2937 4.706 9.10564 5.89405L7.49975 7.49994M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#00bfff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        <svg height="16" class="hidden" id="_rightTik${task.id}" onClick="updateTaskById('${task.id}')" fill="#00bfff" version="1.1" id="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 335.765 335.765" xml:space="preserve" stroke="#00bfff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon> </g> </g> </g></svg>
                    </div>
                </div>
            `
        });
    }
}

const removeTaskById = (taskId) => {

    let tasks = getDataFromLocalstorage().filter(task => task.id !== taskId);
    document.getElementById(taskId).remove(); 
    updateTaskToLocalstorage(tasks);

    displayTaskOnScreen()

}

const markTaskAsCompleteOrNot = (taskId) => {
    let taskCheckbox = document.getElementById(`_check${taskId}`);
    
    let tasks = getDataFromLocalstorage();
    let task = tasks.find(task => task.id === taskId);

    if(!taskCheckbox.checked) { 
        task.complete = false; 
        taskCheckbox.checked = false;
        document.getElementById(`_task${taskId}`).classList.remove("line-through");
        
    } else { 
        task.complete = true; 
        taskCheckbox.checked = true;
        document.getElementById(`_task${taskId}`).classList.add("line-through");

    }

    
    updateTaskToLocalstorage(tasks);
    
    displayTaskOnScreen();
    
}

const makeTaskUpdatable = (taskId) => {
    
    let taskInput = document.getElementById(`_task${taskId}`); 

    taskInput.toggleAttribute("disabled");
    taskInput.classList.toggle("border-2")
    
    document.getElementById(`_editPen${taskId}`).classList.toggle("hidden");
    document.getElementById(`_rightTik${taskId}`).classList.toggle("hidden");
    
    
}

const updateTaskById = (taskId) => {
    
    let tasks = getDataFromLocalstorage();
    let task = tasks.find(task => task.id === taskId);
    
    let editedTask = document.getElementById(`_task${taskId}`);
    
    task.task = editedTask.value;
    
    // editedTask.setAttribute("disabled", "disabled");
    editedTask.toggleAttribute("disabled")
    editedTask.classList.toggle("border-2");
    
    document.getElementById(`_editPen${taskId}`).classList.toggle("hidden");
    document.getElementById(`_rightTik${taskId}`).classList.toggle("hidden");
    
    updateTaskToLocalstorage(tasks);

    displayTaskOnScreen();
 }



todoTaskInputElement.addEventListener('keydown', addtodoTaskToList)
displayTaskOnScreen()




 