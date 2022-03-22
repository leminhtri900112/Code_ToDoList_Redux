import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../Type/ToDoListType";

export const changeTheme = (theme) => {
  return {
    type: CHANGE_THEME,
    theme,
  };
};

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task,
  };
};

export const deleleTask = (task) => ({
  type: DELETE_TASK,
  task,
});

export const doneTask = (task) => ({
  type: DONE_TASK,
  task,
});

export const editTask = (task) => ({
  type: EDIT_TASK,
  task,
});

export const updateTask = (taskName) => ({
  type: UPDATE_TASK,
  taskName,
});
