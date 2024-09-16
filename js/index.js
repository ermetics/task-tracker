import { useTasks } from './helpers/tasks.js';
const { clearTaskInput, createTaskList, addTask } = useTasks();

window.addEventListener('load', () => {
    const tasksList = document.getElementById('tasks-list');
    const button = document.getElementById('add-task-button');
    const taskInput = document.getElementById('task-input');
    const lsTasks = localStorage.getItem('tasks');
    const tasks = lsTasks ? JSON.parse(lsTasks) : [];

    clearTaskInput(taskInput);
    createTaskList({ tasks, tasksList });

    button.addEventListener('click', () => {
        if (taskInput.value) {
            addTask({
                tasks,
                tasksList,
                taskInput,
                task: {
                    title: taskInput.value,
                    priority: 'High',
                    status: 'Pending'
                }
            });
        }
    });
});
