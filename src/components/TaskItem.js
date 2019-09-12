import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './TaskItem.scss'
import TaskTag from './TaskTag'
import * as actions from '../store/actions'

class TaskItem extends Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.title)
    if(node) {
      node.addEventListener('keypress', this.handleKeyPress)
      node.addEventListener('keydown', this.handleKeyDown)
    }
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this.refs.title)
    if(node) {
      node.removeEventListener('keypress', this.handleKeyPress)
      node.removeEventListener('keydown', this.handleKeyDown)
    }
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

  selectTask = () => {
    const task = this.props.task
    this.props.store.dispatch(actions.selectTask({ selected_task: task }))
  }

  openFolder = () => {
    const task = this.props.task
    if(task.subtasks && task.subtasks.length > 0) {
      task.open = !task.open
      this.props.store.dispatch(actions.selectFolder(task))
    }
  }

  focusTask = (task) => {
    setTimeout(() => {
      const taskTitle = document.querySelector(`#task_${task._id} .title`)
      if(taskTitle) {
        taskTitle.focus()
        this.props.store.dispatch(actions.selectTask({ selected_task: task }))
      }
    }, 0)
  }

  handleKeyDown = async (event) => {
    const store = this.props.store
    let task = this.props.task

    const handleBackspace = async () => {
      if(event.srcElement.innerText === '') {
        event.stopPropagation()
        event.preventDefault()

        if(task.parent) this.focusTask(task.parent)
        if(store.getState().selected_task._id === task._id)
          store.dispatch(actions.selectTask({ selected_task: null }))
        store.dispatch(actions.removeTask({ task }))
      }
    }

    const handleArrow = async () => {
      event.stopPropagation()
      event.preventDefault()

      let index = task.parent.subtasks.map(subtask => typeof subtask === 'string' ? subtask : subtask._id).indexOf(task._id)
      if(index !== 0 && index !== task.subtasks.length-1) {
        // select index +-1
      } else if(index === 0) {
        // select parent
      } else {
        // get index of parent in parent.parent
        //
      }
    }

    switch (event.key) {
      case 'Backspace': await handleBackspace()
        break
      case 'ArrowUp':
        break
      case 'ArrowDown':
        break
      default:
        console.log(event.key)
    }
  }

  handleKeyPress = async (event) => {
    const store = this.props.store
    let task = this.props.task

    const handleEnter = async () => {
      event.stopPropagation()
      event.preventDefault()

      const newTask = { title: "" }
      event.srcElement.blur()
      task = await store.dispatch(actions.addTaskUnder({ new_task: newTask, parent: task }))

      this.focusTask(task)
    }

    switch (event.key) {
      case 'Enter': await handleEnter()
        break
      default:
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
        <div className={taskContentStyleClass.join(' ')} id={'task_'+task._id}>
          <div className="checkbox" onClick={this.changeTaskState}>
            { task.done ? icon : isFolder ? icon : null }
          </div>
          <div className="title"
            title={task.title}
            ref="title"
            contentEditable
            suppressContentEditableWarning
            onClick={this.selectTask}
            onDoubleClick={this.openFolder}
            onBlur={this.saveTitle}>
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
