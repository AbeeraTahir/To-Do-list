const updateTaskStatus = (el, tasks) => {
  el.addEventListener('change', (e) => {
    const taskIndex = tasks.findIndex((todo) => todo.index === parseInt(e.target.id.replace('check-', ''), 10));
    if (e.target.checked) {
      tasks[taskIndex].completed = true;
    } else {
      tasks[taskIndex].completed = false;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
};

export default updateTaskStatus;