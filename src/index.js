import './style.css';

const form = document.getElementById('add-to-list');
const listItems = document.querySelector('.to-do-list');
const taskArr = [];

// function for display added task to list
const displayTask = (task) => {
  const listItem = `
  <li>
    <div class="check">
      <input type="checkbox" name="${task.description}">
      <p>${task.description}</p>
    </div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
  </li>`;
  listItems.insertAdjacentHTML('beforeend', listItem);
};

// function for adding task to list
const addTask = (task) => {
  const taskObj = {};
  taskObj.index = taskArr.length + 1;
  taskObj.description = task;
  taskObj.completed = false;
  displayTask(taskObj);
  taskArr.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

// displaying tasks on window loading
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => displayTask(task));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('task');
  addTask(task.value);
  task.value = '';
});