import { createStore } from 'redux'
import types from './action_types'

const initialState = {
  task_list: [
    { done: true, text: 'Learn Javascript' },
    { done: true, text: 'Learn ES6' },
    { done: false, text: 'Learn React' },
    { done: false, text: 'Learn Redux' },
    { done: false, text: 'Build something awesome!' }
  ]
}

function addTask (state, payload) {
  const new_list = [...state.task_list]
  new_list.push(payload)
  return { ...state, task_list: new_list }
}

function updateTaskState (state, payload) {
  const new_list = state.task_list.map((task, index) => {
    task.done = (index === payload.index ? !task.done : task.done)
    return task
  })
  return { ...state, task_list: new_list }
}

function removeTask (state, payload) {
  const new_list = state.task_list.filter((task, index) => index !== payload.index);
  return { ...state, task_list: new_list }
}

function setTaskList(state, payload) {
  return { ...state, task_list: payload.task_list }
}


const store = createStore((state = initialState, action) => {
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
})

export default store