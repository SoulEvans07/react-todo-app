import React from 'react';
import TaskItem from './components/TaskItem'
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="header">
        <h1>Todos</h1>
      </div>
      <div className="content">
        <div className="task-list">
          <TaskItem />

          <div className="task">
            <i className="add fa fa-plus" />
            <input className="text" type="text"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
