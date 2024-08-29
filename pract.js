
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <span>${task.name}</span>
                <div>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                </div>
            </li>
        `).join('');
    };

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newTask = {
            name: taskInput.value.trim(),
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    });

    window.editTask = (index) => {
        const { name } = tasks[index];
        const newTaskName = prompt('Edit your task:', name);
        if (newTaskName !== null && newTaskName.trim() !== '') {
            tasks[index].name = newTaskName.trim();
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    
    renderTasks();
});
