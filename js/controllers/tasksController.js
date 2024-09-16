export function taskController() {
    function createTask({ tasks, taskInput }) {
        tasks.push({
            title: taskInput.value,
            priority: 'High',
            status: 'Pending'
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask({ tasks, task, index }) {
        tasks[index] = {
            title: task?.title ?? tasks[index].title,
            priority: task?.priority ?? tasks[index].priority,
            status: task?.status ?? tasks[index].status
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask({ tasks, index }) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearTaskList({ tasksList }) {
        tasksList.innerHTML = '';
    }

    function removeTaskList({ tasks }) {
        tasks = [];
        localStorage.removeItem('tasks');
    }

    return {
        createTask,
        updateTask,
        deleteTask,
        clearTaskList,
        removeTaskList
    };
}
