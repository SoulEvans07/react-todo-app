import { createStore } from 'redux'
import action_types from './action_types'

const initialState = {
  task_list: [
    { done: true, text: 'Learn Javascript' },
    { done: true, text: 'Learn ES6' },
    { done: false, text: 'Learn React' },
    { done: false, text: 'Learn Redux' },
    { done: false, text: 'Build something awesome!' }
  ]
}

const reducers = {
  [action_types.ADD_TASK]: (state, payload) => {
    const new_list = [...state.task_list]
    new_list.push(payload)
    return { ...state, task_list: new_list }
  },
  [action_types.UPDATE_TASK_STATE]: (state, payload) => {
    const new_list = state.task_list.map((task, index) => {
      task.done = (index === payload.index ? !task.done : task.done)
      return task
    })
    return { ...state, task_list: new_list }
  },
  [action_types.REMOVE_TASK]: (state, payload) => {
    const new_list = state.task_list.filter((task, index) => index !== payload.index);
    return { ...state, task_list: new_list }
  }
}

const store = createStore((state = initialState, action) => {
  if(reducers[action.type] !== undefined) {
    return reducers[action.type](state, action.payload);
  }
  
  return state;
})

store.commit = function(type, payload) {
  return store.dispatch({ type, payload })
}

export default store