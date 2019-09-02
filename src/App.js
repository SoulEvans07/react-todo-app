import React from 'react';
import TaskItem from './components/TaskItem'
import styles from './App.module.css';

function App() {
  const task_list = [
    { done: true, text: 'Learn Javascript' },
    { done: false, text: 'Learn ES6' },
    { done: false, text: 'Learn Vue' },
    { done: false, text: 'Build something awesome!' }
  ];

  const taskItems = task_list.map((task, index) => (
    <TaskItem task={task} index={index} key={index}/>
  ));

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1>Todos</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.taskList}>
          { taskItems }

          <div className={styles.task}>
            <i className={`${styles.add} fa fa-plus`} />
            <input className={styles.text} type="text"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
