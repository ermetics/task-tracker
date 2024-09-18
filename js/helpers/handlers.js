import { useTasks } from './tasks.js';
import { useTasksController } from '../controllers/tasksController.js';

const { addTask, createTaskList, createTaskListOrderIcon } = useTasks();
const { saveData, updateTask } = useTasksController();

export function useHandlers() {
    function onClickAddTask({ tasks, tasksList, taskInput }) {
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
    }

    async function onClickOrderListButton({ tasks, tasksList, orderListAsc, orderListButton, orderListIcon }) {
        const PRIORITY_VALUES = { High: 3, Medium: 2, Low: 1 };
        let sortTasks = [];

        if (orderListAsc) {
            sortTasks = await tasks.sort((a, b) => {
                if (PRIORITY_VALUES[a.priority] < PRIORITY_VALUES[b.priority]) return 1;
                if (PRIORITY_VALUES[a.priority] > PRIORITY_VALUES[b.priority]) return -1;
                return 0;
            });
        } else {
            sortTasks = await tasks.sort((a, b) => {
                if (PRIORITY_VALUES[a.priority] < PRIORITY_VALUES[b.priority]) return -1;
                if (PRIORITY_VALUES[a.priority] > PRIORITY_VALUES[b.priority]) return 1;
                return 0;
            });
        }

        createTaskList({ tasks: sortTasks, tasksList });
        createTaskListOrderIcon({ orderListButton, orderListIcon, orderListAsc });
        saveData(sortTasks);
    }

    function onClickPriorityTask({ tasks, index }) {
        const priorityOptions = ['High', 'Medium', 'Low'];
        const currentIndex = priorityOptions.indexOf(tasks[index].priority);
        const nextIndex = currentIndex === priorityOptions.length - 1 ? 0 : currentIndex + 1;
        tasks[index].priority = priorityOptions[nextIndex];

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
    }

    function onClickCompletedTask({ event, tasks, index }) {
        event.stopPropagation();
        tasks[index].status = tasks[index].status === 'Completed' ? 'Pending' : 'Completed';

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
    }

    function onKeyEnterTaskInput({ event, tasks, tasksList, taskInput }) {
        if (event.key === 'Enter') {
            event.stopPropagation();
            event.preventDefault();

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
        }
    }

    return {
        onClickAddTask,
        onClickCompletedTask,
        onClickOrderListButton,
        onClickPriorityTask,
        onKeyEnterTaskInput
    }
}