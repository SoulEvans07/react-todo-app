import React, { Component } from 'react'
import styles from './TaskItem.module.css'

class TaskItem extends Component {
  render() {
    return (
      <div className={styles.task}>
        <div className={styles.checkbox}>
          { this.props.task.done ? <i className='fa fa-check'/> : null }
        </div>
        <div className={styles.text}>{ this.props.task.text }</div>
        <i className={`${styles.remove} fa fa-times`} title='Delete'/>
      </div>
    )
  }
}
export default TaskItem
