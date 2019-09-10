import React, { Component } from 'react'
import * as actions from '../store/actions'
import './TaskDetails.scss'

class TaskDetails extends Component {
  cancel = () => {
    this.props.store.dispatch(actions.selectTask({ _id: null }))
  }

  changeTaskState = () => {
    this.props.store.dispatch(actions.updateTaskState({ task: this.props.task }))
  }

  editDescription = () => {

  }

  render() {
    const task = this.props.task
    const taskStyleClass = [ 'header' ]
    if(task.done)
      taskStyleClass.push('done')

    return (
      <div className="taskDetails">
        <div className={taskStyleClass.join(' ')}>
          <div className="checkbox" onClick={this.changeTaskState}>
            { task.done && <i className="fa fa-check" ></i> }
          </div>
          <div className="title">{task.title}</div>
          <i className="cancel fa fa-times" title="Cancel" onClick={this.cancel}></i>
        </div>
        <div className="description" contentEditable
          onBlur={this.editDescription}>
          {task.description}
        </div>
      </div>
    )
  }
}

export default TaskDetails
