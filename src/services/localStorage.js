export const loadState = () => {
  try {
    const fetchTask = localStorage.getItem("tasks");
    if (fetchTask === null) {
      return;
    }
    return JSON.parse(fetchTask);
  } catch (err) {
    return;
  }
};

export const saveState = (tasks) => {
  try {
    const fetchTask = JSON.stringify(tasks);
    localStorage.setItem("tasks", fetchTask);
  } catch {}
};
