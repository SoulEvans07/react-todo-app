import React, { Component } from 'react'
import './TaskItem.scss'
import TaskTag from './TaskTag'
import { removeTask, updateTaskState, selectTask } from '../store/actions'

class TaskItem extends Component {
  changeTaskState = () => {
    this.props.store.dispatch(updateTaskState({ task: this.props.task }))
  }

  removeTask = () => {
    this.props.store.dispatch(removeTask({ _id: this.props.task._id }))
  }

  selectTask = () => {
    this.props.store.dispatch(selectTask({ _id: this.props.task._id }))
  } 

  render() {
    const task = this.props.task
    const taskStyleClass = [ "taskItem" ]
    if(task.done)
      taskStyleClass.push("done")

    return (
      <div className={taskStyleClass.join(' ')}>
        <div className="checkbox" onClick={this.changeTaskState}>
          { task.done ? <i className='fa fa-check'/> : null }
        </div>
        <div className="text" title={task.text} onClick={this.selectTask}>
          { task.text }
        </div>
        <div className="tagList">
          { task.tags.length > 0 &&
            task.tags.map(tag => 
            <TaskTag key={tag._id} tag={tag}></TaskTag>
          )}
        </div>
        <i className="remove fa fa-times" title='Delete' onClick={this.removeTask}/>
      </div>
    )
  }
}
export default TaskItem
