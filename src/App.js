import React, { useState } from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FileButton　from "./components/FilterButton";
import Todo from "./components/Todo";


function App(props){
  //追記 const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  //追記 const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  
  const taskList = tasks.map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        //追記 toggleTaskCompleated={toggleTaskCompleated}
      />
    )
  );
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FileButton />
        <FileButton />
        <FileButton />
      </div>
      <h2 id="list-heading">3 tasks remaning</h2>
       {/* 上記消して下記追加 */}
      {/* <h2 id="list-heading">{headingText}</h2>  */}
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