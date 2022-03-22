import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { Container } from "../../ComponentToDoList/Container";
import { Dropdown } from "../../ComponentToDoList/Dropdown";
import { Heading3 } from "../../ComponentToDoList/Heading";
import { TextField } from "../../ComponentToDoList/TextField";
import { Button } from "../../ComponentToDoList/Button";
import { ToDoListDarkTheme } from "../../Themes/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../Themes/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../Themes/ToDoListPrimaryTheme";
import { Table, Th, Thead, Tr } from "../../ComponentToDoList/Table";
import { connect } from "react-redux";
import {
  addTask,
  changeTheme,
  deleleTask,
  doneTask,
  editTask,
  updateTask,
} from "../../Redux/Action/ToDoListAction";

class BaiTapToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };
  handleTaskToDo = () => {
    // console.log(this.props.taskList);
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.name}</Th>
            <Th className="text-right">
              <Button
                className="ml-2"
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTask(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                className="ml-2"
                onClick={() => {
                  this.props.dispatch(doneTask(task));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-2">
                <i
                  className="fa fa-trash"
                  onClick={() => {
                    this.props.dispatch(deleleTask(task));
                  }}
                ></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  handleTaskCompleted = () => {
    // console.log(this.props.taskList);
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.name}</Th>
            <Th className="text-right">
              <Button>
                <i
                  className="fa fa-trash"
                  onClick={() => {
                    this.props.dispatch(deleleTask(task));
                  }}
                ></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  // componentWillReceiveProps = (newProps) => {
  //   this.setState({
  //     taskName: newProps.taskEdit.name,
  //   });
  // };
  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              this.props.dispatch(changeTheme(e.target.value));
            }}
          >
            <option>Dark Theme</option>
            <option>Light Theme</option>
            <option>Primary Theme</option>
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField
            value={this.state.taskName}
            label="Task name"
            className="w-50"
            onChange={(e) => {
              this.setState(
                {
                  taskName: e.target.value,
                },
                () => {
                  console.log(this.state.taskName);
                }
              );
            }}
          />
          <Button
            className="ml-2"
            onClick={() => {
              // Lấy giá trị từ state
              let { taskName } = this.state;
              // Tạo một đối tượng trong taskList
              let newTask = {
                id: Date.now(),
                name: taskName,
                done: false,
              };
              // Gửi giá trị lên lên reducer
              this.props.dispatch(addTask(newTask));
            }}
          >
            <i className="fa fa-plus"></i>
            Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              className="ml-2"
              onClick={() => {
                this.props.dispatch(updateTask(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          ) : (
            <Button
              className="ml-2"
              onClick={() => {
                let { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(updateTask(taskName));
                  }
                );
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          )}
          <hr />
          <Heading3>Task to do</Heading3>
          <Table>
            <Thead>{this.handleTaskToDo()}</Thead>
          </Table>
          <Heading3>Task completed</Heading3>
          <Table>
            <Thead>{this.handleTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }

  //Đây là lifecycle trả về props cũ và state cũ của component trước khi render (lifecycle này chạy sau render)
  componentDidUpdate(prevProps, prevState) {
    //So sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.name,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeToDoList: state.ToDoListReducer.themeToDoList,
    taskList: state.ToDoListReducer.taskList,
    taskEdit: state.ToDoListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(BaiTapToDoList);
