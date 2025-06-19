import React, { useCallback } from "react";
import folderImg from "../assets/folder-white.svg";
import { TaskTile } from "./TaskTile";

export const TaskList = ({
  tasks,
  fetchAllTasks,
  showCreateTaskScreen,
  showEditTaskScreen,
  showViewTaskScreen,
  setActiveTask,
}) => {
  
  const viewTask = useCallback(function(task){
    setActiveTask(task);
    showViewTaskScreen();
  },[setActiveTask,showEditTaskScreen]);
  
  return(
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">🔥 Task</p>
          <button className="add-task-btn cursor-pointer" onClick={showCreateTaskScreen}>
            <img src={folderImg} alt="add task icon" />
            Add New Task
          </button>
        </div>
        
        {/* TaskList */}
        <div className="task-list-container">
          {tasks.map(task => (
            <TaskTile 
              key={task._id+"-task-tile"} 
              task={task} 
              fetchAllTasks={fetchAllTasks}
              setActiveTask={setActiveTask}
              showEditTaskScreen={showEditTaskScreen}
              onClick={() => viewTask(task)}
            />
          ))}
        </div>
      </div>
    </div>
  )
};
