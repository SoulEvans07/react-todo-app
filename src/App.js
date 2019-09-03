import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import styles from './App.module.css'
import store from './store'
import action_types from './store/action_types'

class App extends Component {
  constructor() {
    super()
    store.subscribe(() => this.forceUpdate())
  }

  state = {
    temp_task: ""
  }

  updateTempTask = (event) => {
    const { value } = event.target
    this.setState({ temp_task: value });
  }

  addTask = (event) => {
    store.commit(action_types.ADD_TASK, { done: false, text: this.state.temp_task })
    this.setState({ temp_task: "" })
  }

  addTaskByEnter = (event) => {
    if(event.key === 'Enter') { 
      this.addTask()
    }
  }

  changeTaskState = (index) => {
    store.commit(action_types.UPDATE_TASK_STATE, { index })
  }

  removeTask = (index) => {
    store.commit(action_types.REMOVE_TASK, { index })
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Todos</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.taskList}>
            { this.props.store.getState().task_list.map((task, index) => 
              <TaskItem task={task} index={index} key={index} 
                onClick={() => this.changeTaskState(index)}
                onRemove={() => this.removeTask(index)}/>) }

            <div className={styles.task}>
              <i className={`${styles.add} fa fa-plus`} onClick={this.addTask} />
              <input className={styles.text} name="temp_task" type="text" 
                value={this.state.temp_task} onChange={this.updateTempTask} onKeyUp={this.addTaskByEnter} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
