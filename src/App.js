import React, { Component } from 'react'
import TaskItem from './components/TaskItem'
import TaskItemLoad from './components/TaskItemLoad'
import './App.scss'
import { addTask, fetchTaskList, setError } from './store/actions'
import TaskDetails from './components/TaskDetails'

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
      this.props.store.dispatch(addTask({ task: { title: this.state.temp_task } }))
      this.setState({ temp_task: "" })
    }
  }

  addTaskByEnter = (event) => {
    if(event.key === 'Enter') {
      this.addTask()
    }
  }

  removeError = () => {
    this.props.store.dispatch(setError({ error: null }))
  }

  render() {
    const store = this.props.store;
    const selectedTask = store.getState().selected_task

    return (
      <div className="app">
        <div className="header">
          <h1>Todos</h1>
        </div>
        <div className="content">
          <div className="taskList">
            { store.getState().error &&
                <div className="error">
                  <div className="text">[error] {store.getState().error}</div>
                  <i className="close fa fa-times" onClick={this.removeError} />
                </div>
            }
            { store.getState().task_list === null &&
              [0,1,2,3,4].map((el) =>
                <TaskItemLoad key={el} delay={-0.4*el} />
              )
            }
            { store.getState().task_list !== null &&
              store.getState().task_list.map((task, index) =>
              <TaskItem task={task} index={index} key={task._id} store={store}/>)
            }
            <div className="newTask">
              <i className="add fa fa-plus" onClick={this.addTask} />
              <input className="title" name="temp_task" type="text" autoComplete="off"
                value={this.state.temp_task} onChange={this.updateTempTask} onKeyUp={this.addTaskByEnter} />
            </div>
          </div>
          { !!store.getState().selected_task &&
            <div className="selectedTask">
              <TaskDetails task={selectedTask} store={store}/>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default App;
