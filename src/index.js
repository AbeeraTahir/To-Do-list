import './style.css';
import updateTaskStatus from './modules/task_status_update.js';
import { setLocalStorage, getLocalStorage } from './modules/local_storage.js';

// getting elements
const inputTask = document.getElementById('task');
const listItems = document.getElementById('to-do-list');
const btnClear = document.querySelector('.btn-clear');

// function for display added task to list
const addTaskUI = (task) => {
  const listItem = `<li>
    <div class="check">
      <input type="checkbox" name="checkbox" class="checkbox" id="${task.description}" ${task.completed ? 'checked' : ''}>
      <input type="text" class="task-description" name="${task.description}" id="task-name" value="${task.description}">
    </div>
    <div class="actions">
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash-can del"></i>
    </div>
  </li>`;
  listItems.insertAdjacentHTML('beforeend', listItem);
};

// function to render all tasks
const renderTasks = () => {
  const tasks = getLocalStorage();
  tasks.map((task) => addTaskUI(task));
};

// displaying tasks on window loading
window.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});

// deleting task
const deleteTask = (task, element) => {
  const tasks = getLocalStorage();
  const taskName = task.children[0].children[1].value;
  const taskIndex = tasks.findIndex((x) => x.description === taskName);
  tasks.splice(taskIndex, 1);
  tasks.forEach((item, ind) => {
    item.index = ind + 1;
  });
  setLocalStorage(tasks);
  element.parentElement.parentElement.remove();
};

// editing task
// task will be edited when first the input field of task is updated and then edit icon is clicked
const editTask = (task) => {
  const tasks = getLocalStorage();
  const taskItem = task.children[0].children[1].name;
  const taskIndex = tasks.findIndex((x) => x.description === taskItem);
  const taskName = task.querySelector('#task-name').value;
  tasks[taskIndex].description = taskName;
  setLocalStorage(tasks);
};

// Element target for task deletion and updation
listItems.addEventListener('click', (e) => {
  const task = e.target.parentElement.parentElement;
  if (e.target.classList.contains('del')) {
    deleteTask(task, e.target);
  }
  // task will be edited when first the input field of task is updated and then edit icon is clicked
  if (e.target.classList.contains('edit')) {
    editTask(task);
  }
  if (e.target.classList.contains('checkbox')) {
    const tasks = getLocalStorage();
    updateTaskStatus(e.target, tasks);
  }
});

// clearing the completed tasks from list
btnClear.addEventListener('click', () => {
  const tasks = getLocalStorage();
  const filterTasks = tasks.filter((task) => task.completed === false);
  filterTasks.forEach((item, ind) => {
    item.index = ind + 1;
  });
  setLocalStorage(filterTasks);
  listItems.innerHTML = '';
  renderTasks();
});

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
    addTaskUI(tasks[tasks.length - 1]);
    inputTask.value = '';
  }
});
