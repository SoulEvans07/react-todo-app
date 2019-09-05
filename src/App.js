import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import TaskItemLoad from './components/TaskItemLoad'
import styles from './App.module.css'
import { addTask, removeTask, updateTaskState, fetchTaskList, setError } from './store/actions'

class App extends Component {
  constructor(props) {
    super(props)
    this.props.store.subscribe(() => this.forceUpdate())
    
    this.props.store.dispatch(fetchTaskList())
  }

  state = {
    temp_task: ""
  }

  updateTempTask = (event) => {
    const { value } = event.target
    this.setState({ temp_task: value });
  }

  addTask = (event) => {
    if(this.state.temp_task){
      this.props.store.dispatch(addTask({ text: this.state.temp_task }))
      this.setState({ temp_task: "" })
    }
  }

  addTaskByEnter = (event) => {
    if(event.key === 'Enter') { 
      this.addTask()
    }
  }

  changeTaskState = (task) => {
    this.props.store.dispatch(updateTaskState({ task }))
  }

  removeTask = (task) => {
    this.props.store.dispatch(removeTask({ _id: task._id }))
  }

  removeError = () => {
    this.props.store.dispatch(setError({ error: null }))
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Todos</h1>
        </div>
        <div className={styles.content}>
          <div className={styles['task-list']}>
            { this.props.store.getState().error &&
                <div className={styles.error}>
                  <div className={styles.text}>[error] {this.props.store.getState().error}</div>
                  <i className={`${styles.close} fa fa-times`} onClick={this.removeError} />
                </div>
            }
            { this.props.store.getState().task_list.length === 0 &&
              [0,1,2,3,4].map((el) => 
                <TaskItemLoad key={el} delay={-0.4*el} />
              )
            }
            { this.props.store.getState().task_list.map((task, index) => 
              <TaskItem task={task} index={index} key={task._id} 
                onClick={() => this.changeTaskState(task)}
                onRemove={() => this.removeTask(task)}/>)
            }
            <div className={styles.task}>
              <i className={`${styles.add} fa fa-plus`} onClick={this.addTask} />
              <input className={styles.text} name="temp_task" type="text" autoComplete="off"
                value={this.state.temp_task} onChange={this.updateTempTask} onKeyUp={this.addTaskByEnter} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
