import React, { useContext, useEffect, useRef, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Authprovider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import "../Components/stylesheet/signin.css"

const Dshboard = () => {
  const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: Date.now(),
        Taskname:'',
        dueDate:'',
        status:'To-Do',
        category:'Work',
        description:'',
    })

    const [selectedTasks, setselectedTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setsearchQuery] = useState('');
    const [filterCategory, setfilterCategory] = useState(null);
    const [filterDue, setfilterDue] = useState('');
    const [duedate, setduedate] = useState('');
    const dateInputRef = useRef(null);

    const [activview, setactivview] = useState('list');
    const [showADDtask, setshowADDtask ] = useState(false);
    const [showForm, setshowForm] = useState(false);
    const [showEditForTask, setShowEditForTask] = useState(null);
    const [showBulkstatusList, setshowBulkstatusList] = useState(false);
    const [chooseCat, setchooseCat] = useState(false);
    const [showlogout, setshowlogout] = useState(false);

    const [iscollapsed, setIscollapsed] = useState({
      todo:false,
      inProgress:false,
      Completed:false,
    });

      const navigate = useNavigate();


const handleLabelClick = () => {
  if(dateInputRef.current){
    dateInputRef.current.showPicker();
  }
}


const toggleCollapse = (section) => {
  setIscollapsed((prevState) => ({
    ...prevState, [section] : !prevState[section],
  }));
}


  // load taks from localStorage
  useEffect(() => {
    if (user) {
      const userTasks = JSON.parse(localStorage.getItem(user.uid)) || [];
      setTasks(userTasks);
    }
  }, [user]);

      // save Tasks to local storage
      useEffect(() => {
        if (user) {
          localStorage.setItem(user.uid, JSON.stringify(tasks));
        }
      }, [tasks, user]);

    const noteSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z"/></svg>
    const exitSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 273c9.4-9.4 9.4-24.6 0-33.9L377 111c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l87 87L184 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l246.1 0-87 87c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273zM168 80c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32C39.4 32 0 71.4 0 120L0 392c0 48.6 39.4 88 88 88l80 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-80 0c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l80 0z"/></svg>
    const board = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M50.7 58.5L0 160l208 0 0-128L93.7 32C75.5 32 58.9 42.3 50.7 58.5zM240 160l208 0L397.3 58.5C389.1 42.3 372.5 32 354.3 32L240 32l0 128zm208 32L0 192 0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-224z"/></svg>
    const listSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 96C0 60.7 28.7 32 64 32l448 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM128 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm32-128a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm96-248c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l224 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-224 0z"/></svg>
    const searchSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
    const svgPlus = <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
    const editSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/></svg>
    const emptick = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    const penSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
    const trashSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"/></svg>
    const crossIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
    const clearFilterSvg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>

    const todoTaskCount = tasks.filter(task => task.status === 'To-Do');
    const inProgressTaskCount = tasks.filter(task => task.status === 'In-Progress');
    const completedTaskCount = tasks.filter(task => task.status === 'Completed');


// show filter category
const toggleCat = () => {
  setchooseCat(!chooseCat);
}

// filter by date
    const handleDateChange = (e) => {
      const selectedDate = new Date(e.target.value);
      setduedate(selectedDate); // Store as a Date object
      setfilterDue(selectedDate);
      }


// view change
const handleViewChange = (view) => {
  setactivview(view);
}


//filter category
const handlefilterCategory = (category) => {
  setfilterCategory(category);
  setchooseCat(false);
} 


// search function
const handleSearchChange = (e) => {
  setsearchQuery(e.target.value.toLowerCase());
}

// show logout btn
const handletoggleLogout = () => {
  setshowlogout(!showlogout);
}

// show form when new task or edit task is clicked
const handleshowform = () => {
  setshowForm(!showForm);
  setShowEditForTask(null);
}

    // delete tasks
    const handleDeleteTasks = () => {
      setTasks(tasks.filter((task) => !selectedTasks.includes(task)));
      setselectedTasks([]); //clear selected tasks
    }

    // change status
    const handleChangeStatus = (newStatus) => {
      const updatedTasks = tasks.map((task) =>
        selectedTasks.includes(task) ? {...task, status: newStatus} : task);
      setTasks(updatedTasks);
      setselectedTasks([]);
      setshowBulkstatusList(false);
    };

    // checkbox toggle
    const handleCheckboxChange = (task) => {
      // Check if the task is already selected
     if(selectedTasks.includes(task)){
       // Remove task from selectedTasks
       setselectedTasks(selectedTasks.filter((t) => t !== task));
     } else {
       // Add task to selectedTasks
       setselectedTasks([...selectedTasks, task]);
     }
   }



    const viewADDtask = () => {
        setshowADDtask(!showADDtask);
    }
    const viewEditDel = (taskid) => {
      setShowEditForTask((prevTask)=> (prevTask === taskid ? null : taskid));
  };
  const viewBulkstatus = () => {
    setshowBulkstatusList(!showBulkstatusList);
}

const cancelTask = () => {
  setNewTask({
      Taskname:'',
      dueDate:'',
      status:'To-Do',
      category:'Work',
      description:'',
  });
  setEditingTask(null);
  setshowForm(false);
}
     // delete task
     const handleDeleteSoloTask = (task) => {
      setTasks(tasks.filter((t) => t !==task));
     } 

    // add new task
    const handleAddTask = () =>{
          // Validate input
         if (!newTask.Taskname || !newTask.dueDate) {
           alert("Please fill in all the area");
           return;
         }

         if(editingTask){
          const updatedTask = tasks.map((task) => 
            task.id === editingTask ? { ...task, ...newTask } : task
          );
          setTasks(updatedTask);
          setEditingTask(null);
         } else {
          // Add new task with id
          setTasks([...tasks, { ...newTask, id: Date.now() }]);
         }
         
        // reset data
        setNewTask({
             id: Date.now(),
            Taskname:'',
            dueDate:'',
            status:'To-Do',
            category:'Work',
            description:'',
        })
        setshowForm(false);
    }
    // ........................add task ends

    // edit esisting task
    const handleEditTask = (taskid) => {
      const taskToEdit = tasks.find(task => task.id === taskid); // Find the task by ID
      if (taskToEdit) {
          setEditingTask(taskid); // Set the editing task ID
          setNewTask({
            ...taskToEdit,
          });
          setshowForm(true); // Show the form
      }
    }


    const handleLogout = async () => {
      try {
        await signOut(auth); // Logs out the user from Firebase
        navigate("/signin");
      } catch (error) {}
    };
    

      //render tasks by status
      const rendertheTasks = (status) =>{
        const filteredTasks = tasks.filter((task) => task.status === status )
      .filter((task) => task.Taskname.toLowerCase().includes(searchQuery))
      .filter((task) => !filterCategory || task.category === filterCategory)
      .filter((task) => !duedate ||  new Date(task.dueDate).toDateString() === duedate.toDateString());

      if(filteredTasks.length === 0) {
        return <p id="notaskBoard" className="nottask">No {
          status === 'To-Do' ? `Tasks in To-Do` : status === 'In-Progress' ? `Tasks in Progress` : 'Completed Tasks' }</p>
      }

      return filteredTasks.map((task, index) => {
        return (<>            
          <div className="renderTasks" key={index}>
          <div className="inptCheck">
            <input type="checkbox" checked={selectedTasks.includes(task)} onChange={() => handleCheckboxChange(task)}/>
            <div id="checkColn">{editSvg}</div>
            <div className={task.status === 'Completed' ? 'greenTick' : 'tickCircle'}>{emptick}</div>
            <p id="renTitle" className={task.status === 'Completed' ? 'linethru' : ''} data-fulltext={task.Taskname}>{task.Taskname}</p>
          </div>
           <p id="dateRend" className="txtShow" >{task.dueDate}</p>
           <p id='statRend' className="txtShow" >{task.status}</p>
           <p id="catRend"  className="txtShow"> {task.category}</p>
           <div className="editMainCont"><div id="editEchTashIcon" onClick={()=>viewEditDel(task.id)}>{editSvg}</div>
           {showEditForTask === task.id && <div className="penTrashBox">
           <div id="penBox" className="penBox1" onClick={()=>{handleEditTask(task.id);setShowEditForTask(null);}}><div id="penIcon">{penSvg}</div><p>Edit</p></div>
           <div id="penBox" onClick={()=>{handleDeleteSoloTask(task);setShowEditForTask(null);}}><div id="trashIcon">{trashSvg}</div><p id="delClr">Delete</p></div>
           </div>}
           </div>

      </div>
      </>
        )
      })
    }
      

      // .......render in board view
         const boardRenderTasks = (status) => {
                const filteredTasks =  
                tasks.filter((task) => task.status === status )
                .filter((task) => task.Taskname.toLowerCase().includes(searchQuery))
                .filter((task) => !filterCategory || task.category === filterCategory)
                .filter((task) => !duedate ||  new Date(task.dueDate).toDateString() === duedate.toDateString());

                if(filteredTasks.length === 0) {
                  return <p id="notaskBoard">No {
                    status === 'To-Do' ? `Tasks in To-Do` : status === 'In-Progress' ? `Tasks in Progress` : 'Completed Tasks' }</p>
                }


                return filteredTasks.map((task, index) => {
                  return (<>

               <div className="boardTask" key={index}>
                 <div className="boardTaskSEC">
                  <p id="boardTitle" className={task.status === 'Completed' ? 'linethru' : ''} >{task.Taskname}</p> 
                  <div className="editMainCont"><div id="editEchTashIcon" onClick={()=>viewEditDel(task.id)}>{editSvg}</div>
                   {showEditForTask === task.id && <div className="penTrashBox penTrashBoxBoard">
                   <div id="penBox" className="penBox1" onClick={()=>{handleEditTask(task.id);setShowEditForTask(null);}}><div id="penIcon">{penSvg}</div><p>Edit</p></div>
                   <div id="penBox" onClick={()=>{handleDeleteSoloTask(task);setShowEditForTask(null);}}><div id="trashIcon">{trashSvg}</div><p id="delClr">Delete</p></div>
                   </div>}
                   </div>
                 </div>
                 <div className="boardTaskSEC boardTaskSEC2"><p>{task.category}</p> <p>{task.dueDate}</p></div>
               </div>
               </>)
              })
            }

      
    return (<>
    <div className="dashboard">

          {showlogout && (
            <div className="logoutdivMobile" onClick={handleLogout}>
                 <div className="exiticon">{exitSvg}</div>
                <p id="logt" >Logout</p> 
            </div>
            )}
            {!user &&
            (<p className="loginmobile" onClick={()=>navigate('/signin')}>Login</p> )
            } 
            

      { selectedTasks.length > 0 && (
        <div className="bulkselectedContainer">
        <p>{selectedTasks.length} {selectedTasks.length > 1 ? 'Tasks' : 'Task'} Selected</p>
        <div className="bulkstatusdel">
          <div id="bulkstatuslists"><p onClick={viewBulkstatus}>Status</p>
          { showBulkstatusList && (<div className="changeStatusList">
          <p onClick={()=>handleChangeStatus('To-Do')}>TO-DO</p>
          <p onClick={()=>handleChangeStatus('In-Progress')}>IN-PROGRESS</p>
          <p onClick={()=>handleChangeStatus('Completed')}>COMPLETED</p></div>)}
          </div>
          <p id="buldDel" onClick={handleDeleteTasks}>Delete</p>
        </div>
      </div>)
      }

      {/* ....................edit task form */}
      <div>
        {showForm && <div className="overlay"/>}
      { showForm && (
    <div className="taskForm">
      <div className="fromHead"> <h3>{editingTask ? 'Update Task' : 'Create Task'}</h3> <div className="crossIcon" onClick={cancelTask}>{crossIcon}</div> </div>
        <form>
            <input type="text" name="Taskname" value={newTask.Taskname}  placeholder="Task Title" className="formTextInput" 
            onChange={(e) => setNewTask((prev) => ({...prev, Taskname:e.target.value}))} />
            <textarea placeholder="Description" value={newTask.description} className="formTextInput txtArea" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}/>
            <div className="formTaskCatBox">
              <div className="formTaskCat"><p id="formTaskCatHead">Task Category</p>

              <div className="formWrkPrsnl">
              <input type='radio' id="formwork" name="category" checked={newTask.category === 'Work'} value={newTask.Work} onChange={()=> setNewTask({...newTask, category: 'Work'})}/>
              <label className="workForm" htmlFor="formwork">Work</label>
              <input type='radio' id="formpersonal" name="category" checked={newTask.category === 'Personal'} value={newTask.Personal} onChange={()=> setNewTask({...newTask, category: 'Personal'})} />
              <label className="perForm" htmlFor='formpersonal'>Personal</label>
              </div>
              </div>
              
              <div className="formTaskCat formTaskCatCal"><p id="formTaskCatHead">Due on</p><input type="date" value={newTask.dueDate} onChange={(e)=> setNewTask({...newTask, dueDate:e.target.value})}/></div>
              <div className="formTaskCat"><p id="formTaskCatHead">Task Status</p>
              <select id="formSelect" name="status" value={newTask.status} onChange={(e)=> setNewTask({...newTask, status:e.target.value})}>  
                <option value='To-Do'>To-Do</option>
                <option value='In-Progress'>In-Progress</option>
                <option value='Completed'>Completed</option>
              </select>
              </div>
            </div>

            <div className="formBtnDiv"><button type="button" className="formCancel" onClick={cancelTask}>CANCEL</button>
            <button className="formCreate" type="button" onClick={handleAddTask}>{editingTask ? 'Update' : 'CREATE' }</button></div>
        </form>
    </div>
 )} 
 </div>



        <div className="sec1 mobilieProfile">
            <div className="subSec1">
                <div className="noteicondash">{noteSvg}</div>
                <p id="dashTitle">TaskBuddy</p>
            </div>
            <div className="subSec1">
            {user && user.photoURL && user.displayName && (
  <>
    <div className="profileImg" onClick={handletoggleLogout}>
      <img src={user.photoURL} alt={`${user.displayName} profile`} />
    </div>
    <p id="dashName">{user.displayName}</p>
  </>
)}

            </div>
        </div>

        
        <div className="sec1 mobileSec1">
        <div className="subSec1 subSec2">
            <div className={`sub1Div ${activview === 'list' ? 'active' : ''} `} onClick={()=>handleViewChange('list')}>
                <div className="listboardsvg">{listSvg}</div>
                <p id="list">List</p>
                </div>
                <div className={`sub1Div ${activview === 'board' ? 'active' : ''}`} onClick={()=>handleViewChange('board')}>
                <div className="listboardsvg boardicon">{board}</div>
                <p id="board">Board</p>
                </div>
            </div>
            {user ? (
  user.displayName ? (
    <div className="logoutdiv" onClick={handleLogout}>
      <div className="exiticon">{exitSvg}</div>
      <p id="logt">Logout</p>
    </div>
  ) : null
) : (
  <p id="login" onClick={() => navigate('/signin')}>Login</p>
)}

        </div>

    <div className="sec3">
         <div className="subsecFilter subsecFilterLap">
        <p id="sort">Filter by:</p>

        <div className="subSec3">
            <div className="subSecDIV" onClick={toggleCat}>
                <p id="catTop" className={filterCategory && 'makeBold'}>{filterCategory || 'Category'}</p>
                <span className={`arrowCat ${chooseCat && 'rotCatfilter'} `}>&#10094;</span>

                { chooseCat && <div className="filCatBox">
                  <p id="filtrWork"  onClick={() => handlefilterCategory('Work')}>Work</p>
                  <p id="filtrPrsnl" onClick={() => handlefilterCategory('Personal')}>Personal</p>
               </div>}
                </div>
            <input type="date" id="duedateFilter" ref={dateInputRef} value={duedate} onChange={handleDateChange}/>
            <div className="subSecDIV disMOB" onClick={handleLabelClick}>
                <label htmlFor="duedateFilter" id="dueTop">
                  {duedate ? duedate.toLocaleDateString() : "On date"}
                </label>
                </div>
                <div id="clrFiltr" className={ duedate || filterCategory ? '' : 'cancelclrFiltr' }
                 onClick={() => { setduedate(''); setfilterCategory(null) }}>{clearFilterSvg}</div>
            </div>
            </div>

            <div className="search-addtask">
                <form className="searchLAP">
                    <div className="search">
                    <span className="searchIcon">{searchSvg}</span>
                    <input type="search" placeholder="Search" className="search-input" value={searchQuery} onChange={handleSearchChange}/>
                    </div>
                </form>
                <p id="addTask" onClick={handleshowform}>ADD TASK</p>
            </div>
    
        </div>

        <div className="subsecFilter subsecFilterMobile">
        <p id="sort">Filter by:</p>

        <div className="subSec3">
            <div className="subSecDIV" onClick={toggleCat}>
                <p id="catTop">{filterCategory || 'Category'}</p>
                <span className={`arrowCat ${chooseCat && 'rotCatfilter'} `}>&#10094;</span>
                { chooseCat && <div className="filCatBox">
                  <p id="filtrWork"  onClick={() => handlefilterCategory('Work')}>Work</p>
                  <p id="filtrPrsnl" onClick={() => handlefilterCategory('Personal')}>Personal</p>
                </div>}
                </div>
                <input type="date" id="duedateFilter" ref={dateInputRef} value={duedate} onChange={handleDateChange}/>
               <div className="subSecDIV disMOB" onClick={handleLabelClick}>
                <label htmlFor="duedateFilter" id="dueTop">{duedate ? duedate.toLocaleDateString() : "On date"}</label>
                </div>
                <div id="clrFiltr" className={ duedate || filterCategory ? '' : 'cancelclrFiltr' }
                 onClick={() => { setduedate(''); setfilterCategory(null) }}>{clearFilterSvg}</div>
            </div>
            </div>

        <form className="searchMobile">
                    <div className="search">
                    <span className="searchIcon">{searchSvg}</span>
                    <input type="search" placeholder="Search" className="search-input"  value={searchQuery} onChange={handleSearchChange}/>
                    </div>
        </form>
{/* .......................................... sction2*/}
{ activview === 'list' ? 
     <div className="section2">

        { searchQuery ? (
          tasks.filter(task => task.Taskname.toLowerCase().includes(searchQuery.toLowerCase()))
          .filter((task) => filterCategory ? task.category === filterCategory : true)
          .filter((task) => filterDue ? new Date(task.dueDate).toDateString() === filterDue.toDateString() : true)   
          .length === 0 ? (
            <img className="searchImg" src={""} alt="No tasks found" />
        ) : (<>
        <div className={ iscollapsed.todo ? 'hidesection2Sub2' : "section2Sub2" }>
            <div id="todoHead" className="todoHeadTo-Do">
                <p id="Sec2catHead">{todoTaskCount.length > 0 ? `Todo (${todoTaskCount.length})` : 'Todo' }</p>
                <span className={ iscollapsed.todo ? 'todoArrowMove' : "todoArr" } onClick={()=>toggleCollapse('todo')}>&#10094;</span>
            </div>
            <div>{rendertheTasks('To-Do')}</div>
            </div>

            <div className={ iscollapsed.inProgress ? 'hidesectionprog' : "prog2Sub2" }>
            <div id="todoHead" className="todoHeadProgr">
                <p id="Sec2catHead">{inProgressTaskCount.length > 0 ? `In-Progress (${inProgressTaskCount.length})` : 'In-Progress' }</p>
                <span className={ iscollapsed.inProgress ? 'progArrowMove' : "todoArr" } onClick={()=>toggleCollapse('inProgress')}>&#10094;</span>
            </div>
            <div>
              {rendertheTasks('In-Progress')}
              </div>
            </div>

            <div className={ iscollapsed.Completed ? 'hidesectionCMPLTD' : "cmpltd2Sub2" }>
            <div id="todoHead" className="todoHeadCmpltd">
                <p id="Sec2catHead">{completedTaskCount.length > 0 ? `Completed (${completedTaskCount.length})` : 'Completed' }</p>
                <span  className={ iscollapsed.Completed ? 'CmpltdArrowMove' : "todoArr" } onClick={()=>toggleCollapse('Completed')}>&#10094;</span>
            </div>
            <div>{rendertheTasks('Completed')}</div>
            </div>
        </>)
        ) : (<>

           <div className="tasksHead">
            <p id="tsknameMain">Task Name</p>
            <p id="leftDue">Due on</p>
            <p id="stas">Task status</p>
            <p id="catgry">Task Category</p>
            </div>

          <div className= { iscollapsed.todo ? 'hidesection2Sub2' : "section2Sub2"}>
            <div id="todoHead" className="todoHeadTo-Do">
                <p id="Sec2catHead">{todoTaskCount.length > 0 ? `Todo (${todoTaskCount.length})` : 'Todo' }</p>
                <span className={ iscollapsed.todo ? 'todoArrowMove' : "todoArr" } onClick={()=>toggleCollapse('todo')}>&#10094;</span>
            </div>
            
            <div className="plusAddCont">
            <div id="plusAdd" onClick={viewADDtask}>
            <span>{svgPlus}</span>
            <p id="sec2Addtask">ADD TASK</p>
            </div>
            </div>

            { showADDtask && 
            <div className="addtaskInput">
            <div className="addtaskCancel">
              <input type="text" name="Taskname" value={newTask.Taskname} onChange={(e)=> setNewTask({...newTask, Taskname:e.target.value})}
               className="writetask" placeholder="Task Title"/>
              <div className="addcancelsub">
                <div id="entrKey" onClick={handleAddTask}><p>ADD</p><span>&#8617;</span></div>
                <p id="cnclTas" onClick={cancelTask}>CANCEL</p>
              </div>
              </div>
              <input  className="addTskInputSelect addTskInput" type="date" name="dueDate" value={newTask.dueDate} onChange={(e)=> setNewTask({...newTask, dueDate:e.target.value})}/>
              <select className="addTskInputSelect addTskCat" name="status" value={newTask.status} onChange={(e)=> setNewTask({...newTask, status:e.target.value})}>
                <option value='To-Do'>To-Do</option>
                <option value='In-Progress'>In-Progress</option>
                <option value='Completed'>Completed</option>
              </select>
              <select name="category" className="addTskInputSelect addTskwork" value={newTask.category} onChange={(e)=> setNewTask({...newTask, category:e.target.value})}>
                <option value='Work'>Work</option>
                <option value='Personal'>Personal</option>
              </select>
            </div>}
            <div className="renderDiv">
            {rendertheTasks('To-Do')}</div>
            </div>

            <div className={ iscollapsed.inProgress ? 'hidesectionprog' : "prog2Sub2" }>
            <div id="todoHead" className="todoHeadProgr">
                <p id="Sec2catHead">{inProgressTaskCount.length > 0 ? `In-Progress (${inProgressTaskCount.length})` : 'In-Progress' }</p>
                <span  className={ iscollapsed.inProgress ? 'progArrowMove' : "todoArr" } onClick={()=>toggleCollapse('inProgress')}>&#10094;</span>
            </div>
            <div className="renderDiv">
              {rendertheTasks('In-Progress')}
              </div>
            </div>

            <div className={ iscollapsed.Completed ? 'hidesectionCMPLTD' : "cmpltd2Sub2" }>
            <div id="todoHead" className="todoHeadCmpltd">
                <p id="Sec2catHead">{completedTaskCount.length > 0 ? `Completed (${completedTaskCount.length})` : 'Completed' }</p>
                <span className={ iscollapsed.Completed ? 'CmpltdArrowMove' : "todoArr" } onClick={()=>toggleCollapse('Completed')}>&#10094;</span>
            </div>
            <div className="renderDiv">
              {rendertheTasks('Completed')}
              </div>
            </div>
            </>)
            }

     </div>

:
<div className="boardSuperContainer">
  {searchQuery ? (
    tasks.filter(task => task.Taskname.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((task) => (filterCategory ? task.category === filterCategory : true))
      .filter((task) => (filterDue ? new Date(task.dueDate).toDateString() === filterDue.toDateString() : true))
      .length === 0 ? (
        <img className="searchImg" src={""} alt="No tasks found" />
      ) : (
        <>
          <div className="boardContainer">
            <div className="boardSubContainer">
              <p id="brdviewHead" className="brdviewHeadToDo">TO-DO</p>
              {boardRenderTasks('To-Do')}
            </div>
          </div>

          <div className="boardContainer">
            <div className="boardSubContainer">
              <p id="brdviewHead" className="brdviewHeadProg">IN-PROGRESS</p>
              {boardRenderTasks('In-Progress')}
            </div>
          </div>

          <div className="boardContainer">
            <div className="boardSubContainer">
              <p id="brdviewHead" className="brdviewHeadCompltd">COMPLETED</p>
              {boardRenderTasks('Completed')}
            </div>
          </div>
        </>
      )
  ) : (
    <>
      <div className="boardContainer">
        <div className="boardSubContainer">
          <p id="brdviewHead" className="brdviewHeadToDo">TO-DO</p>
          {boardRenderTasks('To-Do')}
        </div>
      </div>

      <div className="boardContainer">
        <div className="boardSubContainer">
          <p id="brdviewHead" className="brdviewHeadProg">IN-PROGRESS</p>
          {boardRenderTasks('In-Progress')}
        </div>
      </div>

      <div className="boardContainer">
        <div className="boardSubContainer">
          <p id="brdviewHead" className="brdviewHeadCompltd">COMPLETED</p>
          {boardRenderTasks('Completed')}
        </div>
      </div>
    </>
  )}
</div>


}



    </div>
    </>)
}
export default Dshboard;

