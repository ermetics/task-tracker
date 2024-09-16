export function taskController() {
    function saveData({ tasks }) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function clearData() {
        localStorage.removeItem('tasks');
    }

    function createTask({ tasks, taskInput }) {
        tasks.push({
            title: taskInput.value,
            priority: 'High',
            status: 'Pending'
        });
        saveData({ tasks });
    }

    function updateTask({ tasks, task, index }) {
        tasks[index] = {
            title: task?.title ?? tasks[index].title,
            priority: task?.priority ?? tasks[index].priority,
            status: task?.status ?? tasks[index].status
        };
        saveData({ tasks });
    }

    function deleteTask({ tasks, index }) {
        tasks.splice(index, 1);
        saveData({ tasks });
    }

    function clearTaskList({ tasksList }) {
        tasksList.innerHTML = '';
    }

    function removeTaskList({ tasks }) {
        tasks = [];
        clearData();
    }

    return {
        clearTaskList,
        createTask,
        deleteTask,
        removeTaskList,
        saveData,
        updateTask
    };
}
