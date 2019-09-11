import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import types from './action_types'

const initialState = {
  error: null,
  task_list: null,
  selected_task: null
}

function addTask (state, payload) {
  let new_list = null
  const add = (payload) => (task) => {
    if(payload.task.parent === task._id || payload.task.parent._id === task._id) {
      task.subtasks = [ ...task.subtasks, payload.task]
    } else if(task.subtasks && task.subtasks.length > 0) {
      task.subtasks = task.subtasks.map(add(payload))
    }
    return task
  }

  if(payload.task.parent === null) {
    new_list = [...state.task_list, payload.task]
  } else {
    new_list = state.task_list.map(add(payload))
  }

  return { ...state, task_list: new_list }
}

function updateTask (state, payload) {
  const update = (payload) => (task) => {
    if(task.subtasks && task.subtasks.length > 0) {
      task.subtasks = task.subtasks.map(update(payload))
    }
    if(task._id === payload.task._id) {
      task = { ...task, ...payload.task }
    }
    return task
  }

  const new_list = state.task_list.map(update(payload))
  return { ...state, task_list: new_list }
}

function removeTask (state, payload) {
  let new_list = null
  const remove = (payload) => (task) => {
    if(payload.task.parent === task._id || payload.task.parent._id === task._id) {
      task.subtasks = task.subtasks.filter(t => t._id !== payload.task._id)
    } else if(task.subtasks && task.subtasks.length > 0) {
      task.subtasks = task.subtasks.map(remove(payload))
    }
    return task
  }

  if(payload.task.parent === null) {
    new_list = state.task_list.filter(t => t._id !== payload.task._id)
  } else {
    new_list = state.task_list.map(remove(payload))
  }

  return { ...state, task_list: new_list }
}

function setTaskList(state, payload) {
  return { ...state, task_list: payload.task_list }
}

function setError(state, payload) {
  return { ...state, error: payload.error }
}

function selectTask(state, payload) {
  return { ...state, selected_task: payload.selected_task }
}

function selectFolder(state, payload) {
  const select = (payload) => (task) => {
    if(task._id === payload._id) {
      task.open = payload.open
      task.subtasks = payload.subtasks
    } else if(task.subtasks && task.subtasks.length > 0){
      task.subtasks = task.subtasks.map(select(payload))
    }
    return task
  }

  const new_list = state.task_list.map(select(payload))
  return { ...state, task_list: new_list }
}

function rootReducer(state, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return addTask(state, action.payload)
    case types.REMOVE_TASK:
      return removeTask(state, action.payload)
    case types.UPDATE_TASK:
      return updateTask(state, action.payload)
    case types.SET_TASK_LIST:
      return setTaskList(state, action.payload)
    case types.SET_ERROR:
      return setError(state, action.payload)
    case types.SELECT_TASK:
      return selectTask(state, action.payload)
    case types.SELECT_FOLDER:
      return selectFolder(state, action.payload)
    default:
      return state
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
