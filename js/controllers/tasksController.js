import { useUtils } from '../helpers/utils.js';
const { reNumberTasks, setNextOrderNumber } = useUtils();

export function useTasksController() {
    function saveData(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearData() {
        localStorage.removeItem('tasks');
    }

    function createTask({ tasks, taskInput }) {
        tasks.push({
            order: setNextOrderNumber(tasks),
            title: taskInput.value,
            priority: 'Low',
            status: 'Pending'
        });
        saveData(tasks);
    }

    function updateTask({ tasks, task, index }) {
        tasks[index] = {
            order: task?.order ?? tasks[index].order,
            title: task?.title ?? tasks[index].title,
            priority: task?.priority ?? tasks[index].priority,
            status: task?.status ?? tasks[index].status
        };
        saveData(tasks);
    }

    function deleteTask({ tasks, index }) {
        tasks.splice(index, 1);
        reNumberTasks(tasks);
        saveData(tasks);
    }

    return {
        clearData,
        createTask,
        deleteTask,
        saveData,
        updateTask
    };
}
