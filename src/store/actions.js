import types from './action_types'

export function selectTask(payload) {
  return { type: types.SELECT_TASK, payload }
}

export function addTask(payload) {
  return dispatch => {
    fetch('http://localhost:5000/api/tasks/new', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
      if(res.error !== undefined)
        dispatch(setError({ error: res.error }))
      else
        dispatch({ type: types.ADD_TASK, payload: res })
    })
  }
}

export function removeTask(payload) {
  return dispatch => {
    fetch('http://localhost:5000/api/tasks/' + payload._id, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.error !== undefined)
        dispatch(setError({ error: res.error }))
      else
        dispatch({ type: types.REMOVE_TASK, payload })
    })
  }
}

export function updateTaskState(payload) {
  return dispatch => {
    fetch(`http://localhost:5000/api/tasks/${payload.task._id}/update`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ done: !payload.task.done })
    })
    .then(res => res.json())
    .then(res => {
      if(res.error !== undefined)
        dispatch(setError({ error: res.error }))
      else
        dispatch({ type: types.UPDATE_TASK_STATE, payload: { _id: res._id } })
    })
  }
}

export function setTaskList(payload) {
  return { type: types.SET_TASK_LIST, payload }
}

export function fetchTaskList() {
  return dispatch => {
    fetch('http://localhost:5000/api/tasks', { 
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      dispatch(setTaskList({ task_list: res }))
    })
  }
}

export function setError(payload) {
  return { type: types.SET_ERROR, payload }
}