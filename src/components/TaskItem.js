import React, { Component } from 'react'
import './TaskItem.scss'
import TaskTag from './TaskTag'
import * as actions from '../store/actions'

class TaskItem extends Component {
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
          <div className="title" title={task.title}
            ref="title" contentEditable suppressContentEditableWarning
            onClick={this.selectTask} onDoubleClick={this.openFolder} onBlur={this.saveTitle}>
            { task.title }
          </div>
          <div className="tagList">
            { !!(task.tags && task.tags.length > 0) &&
              task.tags.map(tag =>
              <TaskTag key={tag._id} tag={tag}></TaskTag>
            )}
          </div>
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
