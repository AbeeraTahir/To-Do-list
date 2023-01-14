import './style.css';
import updateTaskStatus from './modules/task_status_update.js';
import { setLocalStorage, getLocalStorage } from './modules/local_storage.js';

// getting elements
const inputTask = document.getElementById('task');
const listItems = document.getElementById('to-do-list');
const btnClear = document.querySelector('.btn-clear');

// function for display added task to list
const addTaskToUI = (task) => {
  const listItem = `<li class="border-bottom">
    <div class="check">
      <input type="checkbox" class="checkbox" id="check-${task.index}" ${task.completed ? 'checked' : ''}>
      <input type="text" class="task-description ${task.completed ? 'completed-tasks' : ''}" id="task-${task.index}" value="${task.description}">
    </div>
    <div class="actions">
      <i class="fa-solid fa-trash-can del" id="del-${task.index}"></i>
    </div>
  </li>`;
  listItems.insertAdjacentHTML('beforeend', listItem);
};

const renderTasks = () => {
  const tasks = getLocalStorage();
  tasks.map((task) => addTaskToUI(task));
};

// displaying tasks on window loading
window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

// editing task
// task will be edited when first the input field of task is updated and then press enter key.
const editTask = () => {
  const tasks = getLocalStorage();
  document.querySelectorAll('.task-description').forEach((taskItem) => {
    taskItem.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && taskItem.value.trim() !== '') {
        const task = tasks.find((todo) => todo.index === parseInt(taskItem.id.replace('task-', ''), 10));
        task.description = taskItem.value;
        setLocalStorage(tasks);
        taskItem.blur();
      }
    });
  });
};

// updating UI on deletion
const updateUI = () => {
  listItems.innerHTML = '';
  renderTasks();
};

// updating task indexes after deletion
const updateIndex = (filteredTasks) => {
  filteredTasks.forEach((item, index) => {
    item.index = index + 1;
  });
};

// deleting task
const deleteTask = (element) => {
  const tasks = getLocalStorage();
  const filteredTasks = tasks.filter((todo) => todo.index !== parseInt(element.id.replace('del-', ''), 10));
  updateIndex(filteredTasks);
  setLocalStorage(filteredTasks);
  updateUI();
};

// Element target for task deletion and status updation
listItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    deleteTask(e.target);
  }
  if (e.target.classList.contains('checkbox')) {
    updateTaskStatus(e.target);
  }
});

// Element target for task updation
listItems.addEventListener('DOMSubtreeModified', () => {
  editTask();
});

// clearing the completed tasks from list
btnClear.addEventListener('click', () => {
  const tasks = getLocalStorage();
  const filterTasks = tasks.filter((task) => task.completed === false);
  updateIndex(filterTasks);
  setLocalStorage(filterTasks);
  updateUI();
});

// Adding task
inputTask.addEventListener('keypress', (e) => {
  e.preventDefault();
  const tasks = getLocalStorage();
  if (e.key === 'Enter' && inputTask.value.trim() !== '') {
    tasks.push({
      index: tasks.length + 1,
      description: inputTask.value,
      completed: false,
    });
    setLocalStorage(tasks);
    addTaskToUI(tasks[tasks.length - 1]);
    inputTask.value = '';
  }
});
