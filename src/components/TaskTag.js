import React, { Component } from 'react'
import './TaskTag.scss'
import pSBC from '../helpers/pSBC'

class TaskTag extends Component {
  render() {
    const tag = this.props.tag

    const style = {
      background: tag.background,
      color: tag.color,
      borderColor: pSBC(tag.background, -5)
    }

    return (
      <div className="taskTag" style={style}>
        <div className="name">{tag.name}</div>
      </div>
    )
  }
}

export default TaskTag
