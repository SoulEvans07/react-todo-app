import types from './action_types'

export function addTask(payload) {
  return { type: types.ADD_TASK, payload }
}

export function removeTask(payload) {
  return { type: types.REMOVE_TASK, payload }
}

export function updateTaskState(payload) {
  return { type: types.UPDATE_TASK_STATE, payload }
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
      console.log(res)
      dispatch(setTaskList({ task_list: res }))
    })
  }
}