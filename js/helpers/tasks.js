import { taskController } from '../controllers/tasksController.js';
const { createTask, deleteTask, clearTaskList, removeTaskList, updateTask } = taskController();

export function useTasks() {
    function setColorPriority(priority) {
        switch (priority) {
            case 'High':
                return 'text-red-700';
            case 'Medium':
                return 'text-yellow-700';
            case 'Low':
                return 'text-green-700';
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

    function addTask({ tasks, tasksList, taskInput }) {
        createTask({ tasks, taskInput });
        clearTaskInput(taskInput);
        createTaskList({ tasks, tasksList });
    }

    function onDeleteTask({ tasks, tasksList, index }) {
        deleteTask({ tasks, index });
        if (tasks.length === 0) removeTaskList({ tasks });
        createTaskList({ tasks, tasksList });
    }

    function clearTaskInput(taskInput) {
        taskInput.value = '';
    }

    function createTaskList({ tasks, tasksList }) {
        clearTaskList({ tasksList });

        tasks.forEach((task, index) => {
            const taskNodeElement = document.createElement('li');
            taskNodeElement.innerHTML = `
                <li id="task-${index}" class="pb-3 sm:pb-4 my-auto">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                      <div
                          class="flex-shrink-0 bg-${
                              setCompletedCheck(task).color.bg
                          } w-6 h-5 flex text-xs text-slate-200 rounded-full"
                      >
                          <span class="m-auto">${index + 1}</span>
                      </div>
                      
                      <div class="flex-1 min-w-0">
                          <p
                          class="text-sm font-medium truncate text-${
                              setCompletedCheck(task).color.text
                          } ${'Completed' === task.status ? 'line-through' : ''}"
                          >
                              ${task.title}
                          </p>
                      </div>
                      
                      <div class="flex-2 min-w-0">
                        <button
                            id="priority-task-${index}"
                            class="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <p class="text-xs truncate ${setColorPriority(task.priority)}">
                                ${task.priority}
                            </p>
                        </button>
                      </div>
                      
                      <div class="flex-3 min-w-0">
                        <button
                            id="completed-task-${index}"
                            class="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="stroke-${
                                setCompletedCheck(task).color.bg
                            } icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed-check">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                                <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                                <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                                <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                                <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                                <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                                <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                                <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                                <path d="M9 12l2 2l4 -4" />
                            </svg>
                        </button>
                      </div>

                      <div class="flex-4 min-w-0">
                        <button
                            id="delete-task-${index}"
                            class="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="stroke-gray-600 icon icon-tabler icons-tabler-outline icon-tabler-trash">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>
                    </div>
                  </div>
              </li>`;

            tasksList.appendChild(taskNodeElement);
        });

        // Priority task handler
        tasks.forEach((task, index) => {
            const priorityTaskElement = document.getElementById(`priority-task-${index}`);
            priorityTaskElement.addEventListener('click', () => {
                const priorityOptions = ['High', 'Medium', 'Low'];
                const currentIndex = priorityOptions.indexOf(tasks[index].priority);
                const nextIndex =
                    currentIndex === priorityOptions.length - 1 ? 0 : currentIndex + 1;
                tasks[index].priority = priorityOptions[nextIndex];
                updateTask({
                    tasks,
                    task: {
                        title: tasks[index].title,
                        priority: tasks[index].priority,
                        status: tasks[index].status
                    },
                    index
                });

                createTaskList({ tasks, tasksList });
            });
        });

        // Completed task handler
        tasks.forEach((task, index) => {
            const completedTaskElement = document.getElementById(`completed-task-${index}`);
            completedTaskElement.addEventListener('click', () => {
                tasks[index].status = tasks[index].status === 'Completed' ? 'Pending' : 'Completed';
                updateTask({
                    tasks,
                    task: {
                        title: tasks[index].title,
                        priority: tasks[index].priority,
                        status: tasks[index].status
                    },
                    index
                });

                createTaskList({ tasks, tasksList });
            });
        });

        // Delete task handler
        tasks.forEach((task, index) => {
            const deleteTaskElement = document.getElementById(`delete-task-${index}`);
            deleteTaskElement.addEventListener('click', () => {
                onDeleteTask({ tasks, tasksList, index });
            });
        });
    }

    return {
        addTask,
        clearTaskInput,
        createTaskList
    };
}
