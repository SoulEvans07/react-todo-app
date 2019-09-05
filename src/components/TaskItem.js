import React, { Component } from 'react'
import styles from './TaskItem.module.css'

class TaskItem extends Component {
  render() {
    const taskStyleClass = [ styles.task ];
    if(this.props.task.done)
      taskStyleClass.push(styles.done)

    return (
      <div className={taskStyleClass.join(' ')}>
        <div className={styles.checkbox} onClick={this.props.onClick}>
          { this.props.task.done ? <i className='fa fa-check'/> : null }
        </div>
        <div className={styles.text} title={this.props.task.text}>{ this.props.task.text }</div>
        <i className={`${styles.remove} fa fa-times`} title='Delete' onClick={this.props.onRemove}/>
      </div>
    )
  }
}
export default TaskItem
