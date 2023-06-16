import { ITask } from './ITask';

export interface ITaskList {
  tasks: ITask[];
  newTitle: string;
  editedTitle: string;
}
