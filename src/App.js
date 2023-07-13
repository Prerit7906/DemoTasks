import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  const myData=useHttp();
  const [isLoading,error,fetchTasks]=myData;
  // const isLoading=myData.isLoading;
  // const error=myData.error;
  // const fetchTasks=myData.fetchTasks;
  useEffect(() => {
    const transformedTasks=(data)=>{
      const loadedTasks = [];
  
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
  
    setTasks(loadedTasks);
    }
    fetchTasks({
      url:'https://mybackend-bf49e-default-rtdb.firebaseio.com/tasks.json'
    },transformedTasks);
  }, [fetchTasks]);
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };
  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
