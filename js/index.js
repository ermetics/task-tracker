import { useHandlers } from './helpers/handlers.js';
import { useTasks } from './helpers/tasks.js';

const { clearTaskInput, createTaskList, createTaskListOrderIcon } = useTasks();
const { onClickOrderListButton, onClickAddTask, onKeyEnterTaskInput } = useHandlers();

window.addEventListener('load', () => {
    // DOM Elements
    const addTaskButton = document.getElementById('add-task-button');
    const orderListButton = document.getElementById('task-list-ordener');
    const taskInput = document.getElementById('task-input');
    const tasksList = document.getElementById('tasks-list');

    // Local Storage Data
    const lsTasks = localStorage.getItem('tasks');

    // Default Values
    const tasks = lsTasks ? JSON.parse(lsTasks) : [];
    let orderListAsc = true;

    // Initialize Task List App
    clearTaskInput(taskInput);
    createTaskList({ tasks, tasksList });
    const orderListIcon = document.createElement('svg');
    createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc });

    // Event Listeners for DOM Elements
    const addTaskHandler = () => onClickAddTask({ tasks, tasksList, taskInput });
    const orderListHandler = () => onClickOrderListButton({ tasks, tasksList, orderListAsc, orderListButton, orderListIcon }).then(() => (orderListAsc = !orderListAsc));
    const keyEnterHandler = (event) => onKeyEnterTaskInput({ event, tasks, tasksList, taskInput });

    addTaskButton.addEventListener('click', addTaskHandler);
    addTaskButton.addEventListener('touchstart', addTaskHandler);

    orderListButton.addEventListener('click', orderListHandler);
    orderListButton.addEventListener('touchstart', orderListHandler);

    taskInput.addEventListener('keydown', keyEnterHandler);
    taskInput.addEventListener('touchstart', (event) => {
        if (event.key === 'Enter') {
            keyEnterHandler(event);
        }
    });
});