import React from 'react'
import styles from './TaskItem.module.css'

function TaskItem(props) {
  const task = props.task;
  //const index = props.index;
  const check = task.done ? <i className='fa fa-check'/> : null;

  return (
    <div className={styles.task}>
      <div className={styles.checkbox}>
        { check }
      </div>
      <div className={styles.text}>{ task.text }</div>
      <i className={`${styles.remove} fa fa-times`} title='Delete'/>
    </div>
  )
}

export default TaskItem
