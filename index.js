const path = require('path');
const fs = require('fs');

let date = new Date();

const taskDir = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(taskDir)) {
        return [];
    }
    const data = fs.readFileSync(taskDir, 'utf-8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(taskDir, JSON.stringify(tasks, null, 2), 'utf-8');
}

function getNewId(tasks) {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
}

function addTask(description) {
    const tasks = loadTasks();
    const newTask = { id: getNewId(tasks), description: description, status: 'todo', completed: false, inProgress: false, createdAt: `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`, updatedAt: null };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function deleteTask(id) {
    let tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    if (tasks.length === initialLength) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    saveTasks(tasks);
}

function updateTask(id, description) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.description = description;
    const date = new Date();
    task.updatedAt = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    saveTasks(tasks);
}

function completeTask(id) {
    let tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.status = 'done';
    task.completed = true;
    task.inProgress = false;
    const date = new Date();
    task.updatedAt = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    saveTasks(tasks);
}

function startTask(id) {
    let tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    } else if (task.completed) {
        console.log(`Task with ID ${id} is already completed.`);
        return;
    }
    task.status = 'in-progress';
    task.completed = false;
    task.inProgress = true;
    const date = new Date()
    task.updatedAt = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
    saveTasks(tasks);
}

function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks found.");
        return;
    }
    tasks.forEach(task => {
        console.log(`ID: ${task.id},\nDescription: ${task.description},\nStatus: ${task.status},\nCompleted: ${task.completed},\nIn Progress: ${task.inProgress}\nCreated At: ${task.createdAt},\nUpdated At: ${task.updatedAt}\n`);
    });
}

function listCompletedTasks() {
    const tasks = loadTasks().filter(t => t.completed);
    if (tasks.length === 0) {
        console.log("No completed tasks found.");
        return;
    }
    tasks.forEach(task => {
        console.log(`ID: ${task.id},\nDescription: ${task.description},\nStatus: ${task.status},\nCompleted: ${task.completed},\nIn Progress: ${task.inProgress}\nCreated At: ${task.createdAt},\nUpdated At: ${task.updatedAt}\n`);
    });
}

function listInProgressTasks() {
    const tasks = loadTasks().filter(t => t.inProgress);
    if (tasks.length === 0) {
        console.log("No in-progress tasks found.");
        return;
    }
    tasks.forEach(task => {
        console.log(`ID: ${task.id},\nDescription: ${task.description},\nStatus: ${task.status},\nCompleted: ${task.completed},\nIn Progress: ${task.inProgress}\nCreated At: ${task.createdAt},\nUpdated At: ${task.updatedAt}\n`);
    });
}

function listToDoTasks() {
    const tasks = loadTasks().filter(t => !t.completed && !t.inProgress);
    if (tasks.length === 0) {
        console.log("No to-do tasks found.");
        return;
    }
    tasks.forEach(task => {
        console.log(`ID: ${task.id},\nDescription: ${task.description},\nStatus: ${task.status},\nCompleted: ${task.completed},\nIn Progress: ${task.inProgress}\nCreated At: ${task.createdAt},\nUpdated At: ${task.updatedAt}\n`);
    });
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        const description = args.slice(1).join(' ');
        addTask(description);
        break;
    case 'delete':
        const id = parseInt(args[1]);
        deleteTask(id);
        break;
    case 'update':
        const updateId = parseInt(args[1]);
        const newDescription = args.slice(2).join(' ');
        updateTask(updateId, newDescription);
        break;
    case 'complete':
        const completeId = parseInt(args[1]);
        completeTask(completeId);
        break;
    case 'start':
        const startId = parseInt(args[1]);
        startTask(startId);
        break;
    case 'list':
        if(args[1] === 'done'){
            listCompletedTasks();
            break;
        } else if(args[1] === 'in-progress'){
            listInProgressTasks();
            break;
        } else if(args[1] === 'todo'){
            listToDoTasks();
            break;
        } else {
            listTasks();
            break;
        }
    default:
        console.log('Invalid command.');
        break;
}