export function useUtils() {
    function setNextOrderNumber(tasks) {
        return tasks.length ? Math.max(...tasks.map(task => task.order), -1) + 1 : 1;
    }

    function reNumberTasks(tasks) {
        tasks.forEach((task, index) => {
            task.order = index + 1;
        });
    }

    function setColorPriority(priority) {
        switch (priority) {
            case 'High':
                return 'bg-red-700';
            case 'Medium':
                return 'bg-yellow-700';
            case 'Low':
                return 'bg-green-700';
        }
    }

    function setCompletedCheck(task) {
        const CHECK_OPTIONS = {
            Completed: {
                color: {
                    bg: 'green-500',
                    text: 'green-500'
                }
            },
            Pending: {
                color: {
                    bg: 'gray-600',
                    text: 'gray-200'
                }
            }
        };

        return CHECK_OPTIONS[task.status];
    }

    function clearTaskList(tasksList) {
        tasksList.innerHTML = '';
    }

    return {
        clearTaskList,
        reNumberTasks,
        setColorPriority,
        setCompletedCheck,
        setNextOrderNumber,
    }
}