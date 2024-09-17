import { useUtils } from './utils.js';
const { setCompletedCheck, setColorPriority } = useUtils();

export function useRawHtml() {
    function listConstructor({ task, index }) {
        return `
                <li id="task-${index}" class="pb-3 sm:pb-4 my-auto">
                  <div class="flex items-center space-x-4 rtl:space-x-reverse">
                      <div
                          class="flex-shrink-0 bg-${setCompletedCheck(task).color.bg
            } w-6 h-5 flex text-xs text-slate-200 rounded-full"
                      >
                          <span class="m-auto">${task.order}</span>
                      </div>
                      
                      <div class="flex-1 min-w-0">
                          <p
                          class="text-xs sm:text-lg font-medium sm:font-normal truncate ... text-${setCompletedCheck(task).color.text
            } ${'Completed' === task.status ? 'line-through' : ''}"
                          >
                              <span>${task.title}</span>
                              <button id="task-title-edition-${index}" class="px-1 hidden">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="stroke-gray-500 hover:stroke-orange-400 -mb-[2px] icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                              </button>
                          </p>
                      </div>
                      
                      <div class="flex-2 min-w-0">
                        <button
                            id="priority-task-${index}"
                            class="${setColorPriority(task.priority)} opacity-[.85] focus:outline-none rounded-full"
                        >
                            <p class="px-2 py-1 text-xs font-medium text-slate-200">
                                ${task.priority}
                            </p>
                        </button>
                      </div>
                      
                      <div class="flex-3 min-w-0 -mb-[5px]">
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
                            class="stroke-${setCompletedCheck(task).color.bg
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

                      <div class="flex-4 min-w-0 -mb-[5px]">
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
    }

    function orderListIconAsc() {
        return `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-gray-600 icon icon-tabler icons-tabler-outline icon-tabler-sort-ascending"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l7 0" />
                <path d="M4 12l7 0" />
                <path d="M4 18l9 0" />
                <path d="M15 9l3 -3l3 3" />
                <path d="M18 6l0 12" />
            </svg>`;
    }

    function orderListIconDesc() {
        return `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="stroke-gray-600 icon icon-tabler icons-tabler-outline icon-tabler-sort-descending">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 6l9 0" />
                    <path d="M4 12l7 0" />
                    <path d="M4 18l7 0" />
                    <path d="M15 15l3 3l3 -3" />
                    <path d="M18 6l0 12" />
                </svg>`;
    }

    return {
        listConstructor,
        orderListIconAsc,
        orderListIconDesc
    }
}