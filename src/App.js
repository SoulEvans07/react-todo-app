import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import styles from './App.module.css'

import task_list from './data/task_list'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Todos</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.taskList}>
            { task_list.map((task, index) => <TaskItem task={task} index={index} key={index}/>) }

            <div className={styles.task}>
              <i className={`${styles.add} fa fa-plus`} />
              <input className={styles.text} type="text"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
