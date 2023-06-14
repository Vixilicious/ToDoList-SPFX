/* eslint-disable no-empty-pattern */
import * as React from 'react';
import styles from './Spfx1.module.scss';
import { ISpfx1Props } from './ISpfx1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import TodoList from './todoList/TodoList';

export default class Spfx1 extends React.Component<ISpfx1Props, {}> {
  public render(): React.ReactElement<ISpfx1Props> {
    const {} = this.props;

    return (
      <div>
        <TodoList />
      </div>
    );
  }
}
