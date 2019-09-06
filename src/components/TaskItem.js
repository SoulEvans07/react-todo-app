import React, { Component } from 'react'
import './TaskItem.scss'

class TaskItem extends Component {
  render() {
    const taskStyleClass = [ "taskItem" ];
    if(this.props.task.done)
      taskStyleClass.push("done")

    return (
      <div className={taskStyleClass.join(' ')}>
        <div className="checkbox" onClick={this.props.onClick}>
          { this.props.task.done ? <i className='fa fa-check'/> : null }
        </div>
        <div className="text" title={this.props.task.text}>{ this.props.task.text }</div>
        <i className="remove fa fa-times" title='Delete' onClick={this.props.onRemove}/>
      </div>
    )
  }
}
export default TaskItem
