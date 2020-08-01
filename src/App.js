// import React, { useState, useEffect } from "react";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FilterButton　from "./components/FilterButton";
import Todo from "./components/Todo";

// function usePrevious(value) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

function App(props){
  // useEffect(() => {
  //   if (tasks.length - prevTaskLength === -1) {
  //     listHeadingRef.current.focus();
  //   }
  // }, [tasks.length, prevTaskLength]);

  // const listHeadingRef =useRes(null);
  
  const [filter, setFilter] = useState('All');

  const [tasks, setTasks] = useState(props.tasks);
  //
  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };
  //
  const FILTER_NAMES = Object.keys(FILTER_MAP);

　function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  //　タスクを消します
  function deleteTask(id) {
    const remaininngTasks = tasks.filter(task => id !== task.id);
    setTasks(remaininngTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList)
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // const prevTaskLength = usePrevious(tasks.length);
 
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>

      <h2 id="list>-heading">{headingText}</h2>
      {/* <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2> */}

      {taskList }
    </div>
  );
}

export default App;