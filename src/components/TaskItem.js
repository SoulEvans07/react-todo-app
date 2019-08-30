import React from 'react'
import './TaskItem.css'

function TaskItem() {
  return (
    <div className='task'>
      <div className='checkbox'>
        <i className='fa fa-check'/>
      </div>
      <div className='text'>{ 'task.text' }</div>
      <i className='remove fa fa-times' title='Delete'/>
    </div>
  )
}

export default TaskItem
