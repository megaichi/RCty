import React, { useState } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FileButton　from "./components/FilterButton";
import Todo from "./components/Todo";

const [isEditing, setEditing] = useState(false);

function App(props){
  const [tasks, setTasks] = useState(props.tasks);
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
      return
    });
    setTasks(editedTaskList)
  }

  const taskList = tasks.map(task => (
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

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
 
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FileButton />
        <FileButton />
        <FileButton />
      </div>
      <h2 id="list>-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;