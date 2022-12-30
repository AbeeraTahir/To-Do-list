import { setLocalStorage, getLocalStorage } from './local_storage.js';

const updateTaskStatus = (el) => {
  el.addEventListener('change', (e) => {
    const tasks = getLocalStorage();
    const task = tasks.find((todo) => todo.index === parseInt(e.target.id.replace('check-', ''), 10));
    if (e.target.checked) {
      task.completed = true;
      e.target.nextElementSibling.classList.add('completed-tasks');
    } else {
      task.completed = false;
      e.target.nextElementSibling.classList.remove('completed-tasks');
    }
    setLocalStorage(tasks);
  });
};

export default updateTaskStatus;