import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../Themes/ToDoListPrimaryTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../Type/ToDoListType";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: "Task-1", name: "Task-1", done: true },
    { id: "Task-2", name: "Task-2", done: false },
    { id: "Task-3", name: "Task-3", done: true },
    { id: "Task-4", name: "Task-4", done: false },
  ],
  taskEdit: { id: "-1", name: "", done: true },
};

export const ToDoListReducer = (
  state = initialState,
  { type, theme, task, taskName }
) => {
  switch (type) {
    case CHANGE_THEME:
      {
        if (theme === "Dark Theme") {
          state.themeToDoList = ToDoListDarkTheme;
        } else if (theme === "Light Theme") {
          state.themeToDoList = ToDoListLightTheme;
        } else {
          state.themeToDoList = ToDoListPrimaryTheme;
        }

        return { ...state };
      }
      break;
    case ADD_TASK:
      {
        // Kiểm tra rỗng
        if (task.name.trim() === "") {
          alert("Vui lòng điền nhập task");
          return { ...state };
        }

        // Kiểm tra tồn tại task hay không
        let taskListUpdate = [...state.taskList];
        let index = taskListUpdate.findIndex((item) => item.name === task.name);

        if (index !== -1) {
          alert("Task đã có trong danh sách");
          return { ...state };
        } else {
          taskListUpdate.push(task);
          //update edit
          state.taskEdit = task;
        }

        state.taskList = taskListUpdate;
        return { ...state };
      }
      break;
    case DELETE_TASK:
      {
        let taskListUpdate = [...state.taskList];
        taskListUpdate = taskListUpdate.filter((item) => item.id !== task.id);
        state.taskList = taskListUpdate;
        return { ...state };
      }
      break;
    case DONE_TASK:
      {
        let taskListUpdate = [...state.taskList];
        let index = taskListUpdate.findIndex((item) => item.id === task.id);
        if (index !== -1) {
          taskListUpdate[index].done = true;
        }
        state.taskList = taskListUpdate;
        return { ...state };
      }
      break;
    case EDIT_TASK:
      {
        state.taskEdit = task;
        return { ...state };
      }
      break;
    case UPDATE_TASK: {
      //Chỉnh sửa lại taskName của taskEdit
      state.taskEdit = { ...state.taskEdit, name: taskName };

      //Tìm trong taskList cập nhật lại taskEdit người dùng update
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }

      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", name: "", done: false };

      return { ...state };
    }
    default:
      return { ...state };
      break;
  }
};
