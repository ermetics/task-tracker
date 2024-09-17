import { useHandlers } from './handlers.js';
import { useRawHtml } from './rawHtml.js';
import { useTasksController } from '../controllers/tasksController.js';
import { useUtils } from './utils.js';

const { clearData, createTask, deleteTask, updateTask } = useTasksController();
const { clearTaskList } = useUtils();
const { listConstructor, orderListIconAsc, orderListIconDesc } = useRawHtml();
const { onClickCompletedTask, onClickPriorityTask } = useHandlers();

export function useTasks() {
    function addTask({ tasks, tasksList, taskInput }) {
        createTask({ tasks, taskInput });
        clearTaskInput(taskInput);
        createTaskList({ tasks, tasksList });
    }

    function onDeleteTask({ tasks, tasksList, index }) {
        deleteTask({ tasks, index });
        if (tasks.length === 0) {
            clearData();
        }
        createTaskList({ tasks, tasksList });
    }

    function clearTaskInput(taskInput) {
        taskInput.value = '';
    }

    function createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc }) {
        orderListIcon.innerHTML = orderListAsc === 'asc' ? orderListIconAsc() : orderListIconDesc();
        orderListButton.appendChild(orderListIcon);
    }

    function createTaskList({ tasks, tasksList }) {
        clearTaskList(tasksList);

        // Task list Constructor
        tasks.forEach((task, index) => {
            const taskNodeElement = document.createElement('li');
            taskNodeElement.innerHTML = listConstructor({ task, index });
            tasksList.appendChild(taskNodeElement);
        });

        // === Task list elements listeners
        // For changing the priority of the task
        tasks.forEach((task, index) => {
            const priorityTaskElement = document.getElementById(`priority-task-${index}`);
            priorityTaskElement.addEventListener('click', () => {
                onClickPriorityTask({ tasks, index });
                createTaskList({ tasks, tasksList });
            });
        });

        // For marking / unmarking the task as completed
        tasks.forEach((task, index) => {
            const completedTaskElement = document.getElementById(`completed-task-${index}`);
            completedTaskElement.addEventListener('click', () => {
                onClickCompletedTask({ tasks, tasksList, index });
                createTaskList({ tasks, tasksList });
            });
        });

        // For deleting the task
        tasks.forEach((task, index) => {
            const deleteTaskElement = document.getElementById(`delete-task-${index}`);
            deleteTaskElement.addEventListener('click', () => {
                onDeleteTask({ tasks, tasksList, index });
            });
        });

        // For hovering the task row
        tasks.forEach((task, index) => {
            const taskElement = document.getElementById(`task-${index}`);
            taskElement.addEventListener('mouseover', () => {
                const taskTitleEditionElement = document.getElementById(`task-title-edition-${index}`);
                taskTitleEditionElement.classList.remove('hidden');
            });
            taskElement.addEventListener('mouseout', () => {
                const taskTitleEditionElement = document.getElementById(`task-title-edition-${index}`);
                taskTitleEditionElement.classList.add('hidden');
            });
        });

        // For editing the task title
        tasks.forEach((task, index) => {
            const taskTitleElement = document.getElementById(`task-title-edition-${index}`);
            taskTitleElement.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                const newTitle = prompt('Enter new title:', task.title);

                if (newTitle) {
                    tasks[index].title = newTitle;
                    updateTask({
                        tasks,
                        task: {
                            order: tasks[index].order,
                            title: tasks[index].title,
                            priority: tasks[index].priority,
                            status: tasks[index].status
                        },
                        index
                    });

                    createTaskList({ tasks, tasksList });
                }
            });
        });
        // === End of Task list elements listeners
    }

    return {
        addTask,
        clearTaskInput,
        createTaskList,
        createTaskListOrderIcon
    };
}
