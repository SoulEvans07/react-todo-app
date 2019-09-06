import React, { Component } from 'react'
import './TaskTag.scss'

class TaskTag extends Component {
  render() {
    const tag = this.props.tag

    return (
      <div className="taskTag" style={{background: tag.background, color: tag.color}}>
        <div className="name">{tag.name}</div>
      </div>
    )
  }
}

export default TaskTag