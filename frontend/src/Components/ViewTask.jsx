import React, { useCallback, useState } from "react";
import { Modal } from "./ui/Modal";
import checkedBlue from "../assets/blue-checked.svg";
import {FilePenLine, Trash2, X, AlarmClockCheck} from "lucide-react";
import moment from "moment";
import { DeleteTask } from "./ui/DeleteTask";


export const ViewTask = ({
  task,
  showTaskListScreen,
  fetchAllTasks,
  setActiveTask,
  showEditTaskScreen
}) => {
  const [showDeleteTaskPopup,setShowDeleteTaskPopup] = useState(false);

  const handleEditTask = useCallback(() => {
    setActiveTask(task);
    showEditTaskScreen();
  }, [setActiveTask, showEditTaskScreen, task]);

  const openDeleteTaskPopup = useCallback(() => setShowDeleteTaskPopup(true),[]);
  const closeDeleteTaskPopup = useCallback(() => setShowDeleteTaskPopup(false),[]);
  
  return(
    <Modal isOpen={true} onClose={showTaskListScreen}>
      <div className="flex justify-between view-task-header">
        <div className="flex">
          <span className="task-icon-wrapper">
            <img src={checkedBlue} alt="task icon" className="task-icon" />
          </span>
          <h2 className="view-task-title">{task.title}</h2>
        </div>
        <div className="close-modal-btn" onClick={showTaskListScreen}>
          {" "}
          <X style={{color:"black"}}/>{" "}
        </div>
      </div>
      <div className="flex">
        <pre className="view-task-description">{task.description}</pre>
        <div className="view-task-right-section">
          {task.due_date && (
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex date-container">
                <AlarmClockCheck style={{color:"blue"}}/>
                <p className="date-text">{moment(task.due_date).format("DD MMM YYYY")}</p>
            </div>
            </div>
          )}
          <div
            className="view-task-info-box flex cursor-pointer"
            onClick={handleEditTask}
          >
            <FilePenLine style={{color:"green",marginRight:"10px"}}/>
            <p className="label-12">Edit Task</p>
          </div>
          <div 
            className="view-task-info-box flex cursor-pointer" 
            onClick={openDeleteTaskPopup}
          >
            <Trash2 style={{color:"red",marginRight:"10px"}}/>
            <p className="label-12">Delete Task</p>
          </div>
        </div>
      </div>
      {showDeleteTaskPopup && (
        <DeleteTask
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          task={task}
          fetchAllTasks={fetchAllTasks}
        />
      )}
    </Modal>
  )
};
