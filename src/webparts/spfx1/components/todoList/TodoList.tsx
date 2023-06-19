/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Component } from "react";
import { ITask } from "../../../../entities/ITask";
import {
  Checkbox,
  DefaultButton,
  DetailsList,
  TextField,
} from "office-ui-fabric-react";
import styles from "./TodoList.module.scss";
// import "./TodoList.module.scss";

//Vad som skickas in och skickas ut ()
interface ITodoListProps {
  title: string;
}

interface ITodoListState {
  tasks: ITask[];
  newTitle: string;
  editedTitle: string;
}

export default class TodoList extends React.Component<
  ITodoListProps,
  ITodoListState
> {
  constructor(props: ITodoListProps) {
    super(props);
    this.state = {
      tasks: [],
      newTitle: "",
      editedTitle: "",
    };
  }

  render() {
    const { tasks, newTitle } = this.state;
    const isCompleted = tasks.some((task: ITask) => task.completed);
    return (
      <div className={styles.main}>
        <DetailsList
          items={tasks}
          columns={[
            {
              key: "Title",
              name: "Task",
              fieldName: "title",
              minWidth: 100,
              maxWidth: 200,
              isResizable: true,
              onRender: (item: ITask) => (
                <div className={styles.checkboxTitle}>
                  <Checkbox
                    checked={item.completed}
                    onChange={() => this.handleTask(item)}
                  />
                  <span>{item.title}</span>
                  {item.editing ? (
                    <TextField
                      value={item.title}
                      onChange={(e, value) => {
                        const updatedTasks = tasks.map((task) =>
                          task.id === item.id ? { ...task, title: value } : task
                        );
                        this.setState({ tasks: updatedTasks });
                      }}
                    />
                  ) : (
                    <button
                      className='editBtns'
                      onClick={() => this.handleTaskEdit(item)}
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 16 16'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z'></path>
                        <path
                          fillRule='evenodd'
                          d='M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              ),
            },
            {
              key: "Completed",
              name: "Completed",
              fieldName: "completed",
              minWidth: 100,
              maxWidth: 200,
              isResizable: true,
            },
          ]}
        />
        <h1>{this.props.title}</h1>
        <ul>
          {tasks.map((task: ITask) => (
            <li key={task.id}>
              <div className={styles.listItems}>
                {task.editing ? (
                  <TextField
                    value={task.title}
                    onChange={(e, value) => {
                      const tasks = [...this.state.tasks];
                      const updatedTasks: ITask[] = tasks.map((t: ITask) => {
                        if (t.id === task.id) {
                          return {
                            ...t,
                            editing: true,
                            title: value,
                          };
                        }
                        return t;
                      });
                      this.setState({ tasks: updatedTasks });
                    }}
                  />
                ) : (
                  <div className={styles.checkboxTitle}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => this.handleTask(task)}
                    />
                    <span>{task.title}</span>
                  </div>
                )}
                {!task.editing ? (
                  <button
                    className='editBtns'
                    onClick={() => this.handleTaskEdit(task)}
                  >
                    {" "}
                    hej
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 16 16'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z'></path>
                      <path
                        fill-rule='evenodd'
                        d='M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    className='editBtns'
                    onClick={() => this.endTaskEdit(task)}
                  >
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 16 16'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z'></path>
                      <path
                        fill-rule='evenodd'
                        d='M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div>
          <input
            type='text'
            value={newTitle}
            onChange={(e) => this.setState({ newTitle: e.target.value })}
          />
          <DefaultButton
            onClick={() =>
              this.addTask({
                id: tasks.length + 1,
                title: newTitle,
                completed: false,
                editing: false,
              })
            }
          >
            Add Task
          </DefaultButton>
        </div>
        <div>
          <DefaultButton
            text='Completed'
            onClick={() => this.removeCompleted()}
            style={{
              backgroundColor: isCompleted ? "blue" : "white",
              color: isCompleted ? "white" : "black",
            }}
          />
        </div>
      </div>
    );
  }
  private addTask(newTask: ITask) {
    const { tasks } = this.state;
    const newTaskList = [...tasks, newTask];
    this.setState({ tasks: newTaskList, newTitle: newTask.title });
  }

  private handleTask(task: ITask) {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((t: ITask) => {
      if (t.id === task.id) {
        return {
          ...t,
          completed: !t.completed,
        };
      }
      return t;
    });
    this.setState({ tasks: updatedTasks });
  }

  private removeCompleted() {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter((t: ITask) => !t.completed);

    this.setState({ tasks: filteredTasks });
  }

  private handleTaskEdit(task: ITask) {
    const { tasks } = this.state;
    const editTasks = tasks.map((t: ITask) => {
      if (t.id === task.id) {
        return {
          ...t,
          editing: true,
        };
      }
      return t;
    });
    this.setState({ tasks: editTasks });
  }

  private endTaskEdit(task: ITask) {
    const { tasks } = this.state;
    const editTasks = tasks.map((t: ITask) => {
      if (t.id === task.id) {
        return {
          ...t,
          editing: false,
        };
      }
      return t;
    });
    this.setState({ tasks: editTasks });
  }
}
