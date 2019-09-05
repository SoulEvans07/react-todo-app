import React, { Component } from 'react'
import styles from './TaskItemLoad.module.css'

class TaskItemLoad extends Component {
  render() {
    return (
      <div className={styles.task}>
        <div className={styles.checkbox} />
        <div className={styles.text} style={{animationDelay: this.props.delay+'s'}}/>
        <i className={`${styles.remove} fa fa-times`} />
      </div>
    )
  }
}
export default TaskItemLoad
