import React, { Component } from 'react'
import './TaskItemLoad.scss'

class TaskItemLoad extends Component {
  render() {
    return (
      <div className="taskLoadItem">
        <div className="checkbox" />
        <div className="title" style={{animationDelay: this.props.delay+'s'}}/>
        <i className="remove fa fa-time" />
      </div>
    )
  }
}
export default TaskItemLoad
