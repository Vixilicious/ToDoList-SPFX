/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Component } from 'react';
import { ITask } from '../../../../entities/ITask';
import { ITaskList } from '../../../../entities/ITaskList';
import { ITodoListProps } from '../../../../entities/ITodoListProps';

export default class TodoList extends Component<{}, ITaskList> {
  constructor(props: ITodoListProps) {
    super(props);
    this.state = {
      tasks: [] as ITask[],
      newTitle: '',
      editedTitle: '',
    };
  }

  render() {
    const { tasks, newTitle, editedTitle } = this.state;
    return (
      <div>
        <h1>To-Do List</h1>
        <ul>
          {tasks.map((task: ITask) => (
            <li key={task.id}>
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => this.handleTask(task)}
              />
              {task.editing ? (
                <input
                  type='text'
                  value={task.title}
                  onChange={(e) => {
                    this.setState({ editedTitle: e.target.value });
                  }}
                />
              ) : (
                <span>{task.title}</span>
              )}
              <button onClick={() => this.handleTaskEdit(task)}>
                Edit
              </button>
            </li>
          ))}
        </ul>

        <div className='addTaskBox'>
          <input
            type='text'
            value={newTitle}
            onChange={(e) => this.setState({ newTitle: e.target.value })}
          />
          <button
            className='addBtn'
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
          </button>
        </div>
        <div>
          <button onClick={() => this.removeCompleted()}>Done!</button>
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
    const filteredTasks = tasks.filter((task: ITask) => !task.completed);
    this.setState({ tasks: filteredTasks });
  }

  private handleTaskEdit(task: ITask) {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          editing: true,
          editedTitle: task.title,
        };
      }
      return t;
    });
    this.setState({ tasks: updatedTasks });
  }
}
