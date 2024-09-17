import { useHandlers } from './helpers/handlers.js';
import { useTasks } from './helpers/tasks.js';

const { clearTaskInput, createTaskList, createTaskListOrderIcon } = useTasks();
const { onClickOrderListButton, onClickAddTask, onKeyEnterTaskInput } = useHandlers();

window.addEventListener('load', () => {
    // DOM Elements
    const AddTaskButton = document.getElementById('add-task-button');
    const orderListButton = document.getElementById('task-list-ordener');
    const taskInput = document.getElementById('task-input');
    const tasksList = document.getElementById('tasks-list');

    // Local Storage Data
    const lsOrder = localStorage.getItem('order');
    const lsTasks = localStorage.getItem('tasks');

    // Default Values
    const tasks = lsTasks ? JSON.parse(lsTasks) : [];
    let orderListAsc = lsOrder ?? 'asc';

    // Initialize Task List App
    clearTaskInput(taskInput);
    createTaskList({ tasks, tasksList });
    const orderListIcon = document.createElement('svg');
    createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc });

    // Event Listeners for DOM Elements
    AddTaskButton.addEventListener('click', () => onClickAddTask({ tasks, tasksList, taskInput }));
    orderListButton.addEventListener('click', () => onClickOrderListButton({ tasks, tasksList, orderListAsc, orderListButton, orderListIcon }));
    taskInput.addEventListener('keydown', (event) => onKeyEnterTaskInput({ event, tasks, tasksList, taskInput }));
});
