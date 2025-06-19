import React, { useCallback, useEffect, useState } from 'react'
import { Loading } from './ui/Loading';
import { TaskList } from './TaskList';
import { NoTask } from './NoTask';
import { CreateTask } from './CreateTask';
import { EditTask } from './EditTask';
import { ViewTask } from './ViewTask';
import fetchTaskAPI from "../Components/api/fetchTask";

export default function TaskMain() {
  const [currComponent,setScurrComponent] = useState("loading");
  const [tasks,setTasks] = useState([]);
  const [activeTask,setActiveTask] = useState();

  const showNoTaskScreen = useCallback(function(){
    setScurrComponent("noTask");
  },[]);
  const showCreateTaskScreen = useCallback(function(){ 
    setScurrComponent("createTask");
  },[]);
  const showTaskListScreen = useCallback(function(){
    setScurrComponent("taskList");
  },[]);
  const showEditTaskScreen = useCallback(function(){
    setScurrComponent("editTask");
  },[])
  const showViewTaskScreen = useCallback(function(){
    setScurrComponent("viewTask");
  },[]);

  const handleResponse = useCallback(function(responseData){
    // console.log(responseData);  
    const extractedTasks = responseData.tasks;
    setTasks(extractedTasks); 
    if(extractedTasks.length){
      showTaskListScreen();
    }else{
      showNoTaskScreen();
    }
  },[showTaskListScreen,showNoTaskScreen])

  const handleError = useCallback(function(errorMsg){
    alert(errorMsg)
    console.error(errorMsg);
  },[]);

  const fetchAllTasks = useCallback(() => {
    fetchTaskAPI(handleResponse, handleError);
  }, [handleResponse,handleError]);
  

  useEffect(()=>{
    fetchAllTasks()
  },[fetchAllTasks]);//Every render of a React functional component creates new instances of any variables or functions declared inside it.


  return (
    <>
     {currComponent === "loading" && <Loading/>}
      <div className='container-div'>
        {currComponent === "noTask" &&( <NoTask showCreateTaskScreen={showCreateTaskScreen}/>)}
        {currComponent === "taskList" && (
          <TaskList 
            tasks={tasks}
            fetchAllTasks = {fetchAllTasks}
            showCreateTaskScreen={showCreateTaskScreen}
            showEditTaskScreen={showEditTaskScreen}
            showViewTaskScreen={showViewTaskScreen}
            setActiveTask={setActiveTask}
          />
        )}
        {currComponent === "createTask" && (
          <CreateTask 
            fetchAllTasks={fetchAllTasks} 
            showTaskListScreen={showTaskListScreen}
          />)}
        {currComponent === "editTask" && (
          <EditTask 
            fetchAllTasks = {fetchAllTasks}
            showTaskListScreen={showTaskListScreen}
            task = {activeTask}
          />
        )}
        {currComponent === "viewTask" && (
          <ViewTask
            task ={activeTask}
            showTaskListScreen={showTaskListScreen}
            fetchAllTasks={fetchAllTasks}
            setActiveTask={setActiveTask}
            showEditTaskScreen={showEditTaskScreen}
          />)}
      </div> 
    </>
  )
}
