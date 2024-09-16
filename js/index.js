import { useTasks } from './helpers/tasks.js';
import { taskController } from './controllers/tasksController.js';
const { clearTaskInput, createTaskList, createTaskListOrderIcon, addTask } = useTasks();
const { saveData } = taskController();

window.addEventListener('load', () => {
    const tasksList = document.getElementById('tasks-list');
    const orderListButton = document.getElementById('task-list-ordener');
    const orderListIcon = document.createElement('svg');
    const AddTaskButton = document.getElementById('add-task-button');
    const taskInput = document.getElementById('task-input');
    const lsTasks = localStorage.getItem('tasks');
    const tasks = lsTasks ? JSON.parse(lsTasks) : [];
    const lsOrder = localStorage.getItem('order');
    let orderListAsc = lsOrder ?? 'asc';

    clearTaskInput(taskInput);
    createTaskList({ tasks, tasksList });
    createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc });

    AddTaskButton.addEventListener('click', () => {
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

    orderListButton.addEventListener('click', () => {
        let sortTasks = [];
        if (orderListAsc === 'asc') {
            sortTasks = tasks.sort((a, b) => {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return 0;
            });
        } else {
            sortTasks = tasks.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }

        createTaskList({ tasks: sortTasks, tasksList });
        saveData({ tasks: sortTasks });
        orderListAsc = orderListAsc === 'asc' ? 'desc' : 'asc';
        createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc });
        localStorage.setItem('order', orderListAsc);
    });
});
