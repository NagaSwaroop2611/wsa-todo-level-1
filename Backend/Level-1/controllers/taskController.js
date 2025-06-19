import Task from "../models/taskModels.js";
const newTask = async(req,res) => {
  try {
    // 1. Extract data from req.body
  const {title, description, due_date} = req.body;

  // 2. Validation on incoming data
  if(!title || !description){
    return res.status(400).json({message : "Title and description are not found"});
  }

  // Create a document based on the schema
  const newTask = await Task.create({title,description,due_date});

  // Sucess response
  res.status(201).json({
    success : true,
    message : "Task created successfully",
    task : newTask,
  });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success : false,
      message : "Failed to create task",
    });
  }
};

const getTasks = async(req,res) => {
  // Get all tasks from MongoDB
 try {
  const tasks = await Task.find({});

  res.status(200).json(
    {
      success: true,
      tasks,
      message : "Fetched all tasks succesfully"
    }
  );
 } catch (error) {
  console.log(error.message);
    res.status(400).json({
      success : false,
      message : "Failed to fetch tasks",
    });
 }
};

const updateTask = async(req,res) => {
  try {
    // get id from params 
    const {id} = req.params;
    // get the data to update from body
    const {title,description,due_date} = req.body;
    // validation of body and id
    if(!id){
      return res.status(400).json({message : "Task id required"})
    };
    // // find the document according to the id
    // const task = await Task.findById(id)
    // // update the document
    // if(title) task.title=title;
    // if(description) task.description=description;
    // if(due_date) task.due_date=due_date;
    // if(!due_date) task.due_date = null;
    // // save the document
    // console.log(title,description,due_date);
    
    // const updatedTask = await task.save();

    // const updateTask = await Task.findByIdAndUpdate(
    //   id,
    //   {title,description,due_date:due_date||null},
    //   {new:true} //returns the updated Document
    // );

    
    const updateTask = await Task.findByIdAndUpdate(
      id,
      {title,description,due_date:due_date||null},
      {new:true}
    );

    // send a response
    res.status(200).json(
      {
        success: true,
        task : updateTask,
        message : "Task updated succesfully"
      }
    );
  } catch (error) {
    console.log("Failed to update the task");
    res.status(400).json({
      success : false,
      message : "Failed to update the task",
    });
  }
}

const deleteTask = async(req,res) => {
  try {
    // get the id from req.params
    const {id} = req.params;

    // Validate the id
    if(!id){
      return res.status(400).json({
        success:false,
        message : "Id not provided",
      });
    }

    // delete the document using findBtIdAndDelete()
    await Task.findByIdAndDelete(id);
    // const tasks = await Task.find({});
    // send a response
    res.status(200).json({
      success:true,
      // tasks,
      message:"Task is succesfully deleted"
    });
  } catch (error) {
    console.log("Failed to delete the task",error);
    res.status(400).json({
      success : false,
      message : "Failed to delete the task",
    });
  }
}

export {newTask,getTasks,updateTask,deleteTask};