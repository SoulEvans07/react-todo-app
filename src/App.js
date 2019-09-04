import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import styles from './App.module.css'
import store from './store'
import { addTask, removeTask, updateTaskState, fetchTaskList } from './store/actions'

class App extends Component {
  constructor() {
    super()
    store.subscribe(() => this.forceUpdate())

    fetch('http://localhost:5000/api/tasks', { 
      method: 'GET',
    }).then(res => res.json())
      .then(res => console.log(res));
  }

  state = {
    temp_task: ""
  }

  updateTempTask = (event) => {
    const { value } = event.target
    this.setState({ temp_task: value });
  }

  addTask = (event) => {
    store.dispatch(addTask({ done: false, text: this.state.temp_task }))
    this.setState({ temp_task: "" })
  }

  addTaskByEnter = (event) => {
    if(event.key === 'Enter') { 
      this.addTask()
    }
  }

  changeTaskState = (index) => {
    store.dispatch(updateTaskState({ index }))
  }

  removeTask = (index) => {
    store.dispatch(removeTask({ index }))
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
                onRemove={() => this.removeTask(index)}/>)}

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
