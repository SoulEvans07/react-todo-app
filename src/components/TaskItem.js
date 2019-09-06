import React, { Component } from 'react'
import './TaskItem.scss'
import TaskTag from './TaskTag'

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
        <div className="tagList">
          { this.props.task.tags.length > 0 &&
            this.props.task.tags.map(tag => 
            <TaskTag key={tag._id} tag={tag}></TaskTag>
          )}
        </div>
        <i className="remove fa fa-times" title='Delete' onClick={this.props.onRemove}/>
      </div>
    )
  }
}
export default TaskItem
