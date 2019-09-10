import React, { Component } from 'react'
import './TaskItem.scss'
import TaskTag from './TaskTag'
import * as actions from '../store/actions'

class TaskItem extends Component {
  changeTaskState = () => {
    this.props.store.dispatch(actions.updateTaskState({ task: this.props.task }))
  }

  removeTask = () => {
    this.props.store.dispatch(actions.removeTask({ task: this.props.task }))
  }

  selectTask = () => {
    const task = this.props.task
    this.props.store.dispatch(actions.selectTask({ selected_task: task }))
  }

  openFolder = () => {
    const task = this.props.task
    if(task.subtasks && task.subtasks.length > 0) {
      this.props.store.dispatch(actions.selectFolder({ _id: task._id }))
    }
  }

  render() {
    const state = this.props.store.getState()
    const task = this.props.task
    const taskContentStyleClass = [ "taskContent" ]
    const isFolder = !!(task.subtasks && task.subtasks.length > 0)
    const isOpen = isFolder && !!task.open
    let icon = <i className='fa fa-check'/>

    if(task.done) { taskContentStyleClass.push("done") }
    if(state.selected_task && task._id === state.selected_task._id) { taskContentStyleClass.push("selected") }
    if(isFolder) { icon = <i className={(task.done ? 'fas' : 'far') + ' fa-folder'}/> }

    return (
      <div className="taskItem">
        <div className={taskContentStyleClass.join(' ')}>
          <div className="checkbox" onClick={this.changeTaskState}>
            { task.done ? icon : isFolder ? icon : null }
          </div>
          <div className="text" title={task.text} contentEditable
            onClick={this.selectTask} onDoubleClick={this.openFolder}>
            { task.text }
          </div>
          <div className="tagList">
            { !!(task.tags && task.tags.length > 0) &&
              task.tags.map(tag =>
              <TaskTag key={tag._id} tag={tag}></TaskTag>
            )}
          </div>
          <i className="remove fa fa-times" title='Delete' onClick={this.removeTask}/>
        </div>
        { isOpen &&
          <div className="subtaskList">
            { task.subtasks.map((subtask, index) =>
                <TaskItem task={subtask} index={index} key={subtask._id} store={this.props.store}/>)
            }
          </div>
        }
      </div>
    )
  }
}
export default TaskItem
