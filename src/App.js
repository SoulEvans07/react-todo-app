import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import styles from './App.module.css'

import task_list from './data/task_list'

class App extends Component {
  state = {
    temp_task: "",
    task_list: task_list
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  addTask = (event) => {
    this.setState(state => {
      const new_list = state.task_list
      new_list.push({ done: false, text: state.temp_task })
      return { 
        task_list: new_list,
        temp_task: ""
      }
    })
  }

  addTaskByEnter = (event) => {
    if(event.key === 'Enter') { 
      this.addTask()
    }
  }

  changeTaskState = (index) => {
    this.setState(state => {
      const new_list = state.task_list.map((task, ind) => {
        task.done = (ind === index ? !task.done : task.done)
        return task
      })
      return { task_list: new_list }
    })
  }

  removeTask = (index) => {
    this.setState(state => {
      const new_list = state.task_list.filter((task, ind) => ind !== index);
      return { task_list: new_list }
    })
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Todos</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.taskList}>
            { this.state.task_list.map((task, index) => 
              <TaskItem task={task} index={index} key={index} 
                onClick={() => this.changeTaskState(index)}
                onRemove={() => this.removeTask(index)}/>) }

            <div className={styles.task}>
              <i className={`${styles.add} fa fa-plus`} onClick={this.addTask} />
              <input className={styles.text} name="temp_task" type="text" 
                value={this.state.temp_task} onChange={this.handleChange} onKeyUp={this.addTaskByEnter} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
