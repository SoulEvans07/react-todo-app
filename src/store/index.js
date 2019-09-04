import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import types from './action_types'

const initialState = {
  task_list: []
}

function addTask (state, payload) {
  const new_list = [...state.task_list]
  new_list.push(payload)
  return { ...state, task_list: new_list }
}

function updateTaskState (state, payload) {
  const new_list = state.task_list.map(task => {
    task.done = (task._id === payload._id ? !task.done : task.done)
    return task
  })
  return { ...state, task_list: new_list }
}

function removeTask (state, payload) {
  const new_list = state.task_list.filter(task => task._id !== payload._id);
  return { ...state, task_list: new_list }
}

function setTaskList(state, payload) {
  return { ...state, task_list: payload.task_list }
}

function rootReducer(state, action) {
  switch (action.type) {
    case types.ADD_TASK:
      return addTask(state, action.payload)
    case types.REMOVE_TASK:
      return removeTask(state, action.payload)
    case types.UPDATE_TASK_STATE:
      return updateTaskState(state, action.payload)
    case types.SET_TASK_LIST:
      return setTaskList(state, action.payload)
    default:
      return state
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store