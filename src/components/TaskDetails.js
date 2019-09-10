import React, { Component } from 'react'
import * as actions from '../store/actions'
import './TaskDetails.scss'

class TaskDetails extends Component {
  cancel = () => {
    this.props.store.dispatch(actions.selectTask({ _id: null }))
  }

  changeTaskState = () => {
    const task = { ...this.props.task }
    task.done = !task.done
    this.props.store.dispatch(actions.updateTask({ task }))
  }

  saveTitle = () => {
    const task = { ...this.props.task }
    if(task.title !== this.refs.title.innerText) {
      task.title = this.refs.title.innerText
      this.props.store.dispatch(actions.updateTask({ task }))
    }
  }

  removeTask = () => {
    this.props.store.dispatch(actions.selectTask({ selected_task: null }))
    this.props.store.dispatch(actions.removeTask({ task: this.props.task }))
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
          <div className="title" ref="title" contentEditable suppressContentEditableWarning
            onBlur={this.saveTitle}>
            {task.title}
          </div>
          <div className="remove" onClick={this.removeTask}>
            <span className="text">Delete</span>
            <i className="icon fa fa-times" title='Delete'/>
          </div>
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
