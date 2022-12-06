import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useResolvedPath, resolvePath } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import logo from './ukglogo.jpg';
import icon from './icon1.png';
import ManagerDashboard from "./ManagerDashboard.js";
import CommentCard from './components/CommentCard';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Box from '@mui/material/Box';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AlertBox from './components/AlertBox.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { GridActionsCellItem, GridRowId, GridColumns } from '@mui/x-data-grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Cookies from 'universal-cookie';
import NewGoalModal from  './NewGoalModal';
import GoalDetailModal from './GoalDetailModal'
import EmployeeDashboard from './EmployeeDashboard';

const numOfCards = 4;

const convertGoalFormat = (goal) => {
  return {
    id: goal.id,
    title: goal.title,
    description: goal.description,
    startdate: goal.start_date.split("T")[0], //just in case, /docs says these could include
    completedate: goal.end_date.split("T")[0], //full datetimes and we just want year-month-day
    status: goal.status,
    createdate: goal.created_at,
    createdBy: 33, //TODO
    assignedto: goal.assignee_id
  }
}


const convertUserFormat = (user) => {
  return {
      firstname: user.first_name,
      lastname: user.last_name,
      id: user.id,
      title: user.position_title,
      email: user.email,
      compid: user.company_id, 
      mid: user.manager_id, 
  }
}

const convertCommentFormat = (comment) => {
  return {
    id: comment.id,
    createdate: new Date(comment.created_at),
    description: comment.description,
    gid: comment.goal_id,
    eid: comment.employee_id,
  }
}

export default function Dashboard() {

  const {state} = useLocation();

  const [goals,setGoals] = React.useState([state.user].concat(state.managedUsers)
    .reduce( (out,user,i) => out.concat(user.goals.map( g => convertGoalFormat(g))),[]));  

  const otherUsers = [state.manager].concat(state.managedUsers);
  const [loggedInUser] = React.useState(state.user);
  const [users,setUsers] = React.useState([state.user].concat(
    otherUsers.map(u=>convertUserFormat(u))));

  const [comments,setComments] = React.useState([]);

  useEffect(() => {
    goals.reduce( (out,g,i) => 
    fetch("http://localhost:8000/goals/"+g.id+"/comments", {
      method: "GET",
      headers: { "content-type" : "application/json"},
    })
    .then( (response) => response.json())
    .then( (c) => {
      if (c.detail === "No comments found for goal id "+g.id) {return out;} 
      else {return out.then( (o) => o.concat( c.map( (comment)=>convertCommentFormat(comment) ) ));}
    })
    ,Promise.resolve([])).then( setComments );
  }, []);
  let totalComments = comments.length;


  const navigate = useNavigate();

  if (state === null){
    navigate('/');
  }
  
  const getUserByID = (id) => {
    return users.filter( (user) => user.id===id)[0];
    
  }
  
  const getGoalByID = (id) => {
    return goals.filter( (goal) => goal.id === id)[0];
  }
  
  const getCommentByID = (id) => {
    return comments.filter( (comment) => comment.id === id)[0];
  }

  const getCommentsByGoal = (id) => {
    return comments.filter( (comment) => comment.gid === id);
  }
  
  const getGoalsByUser = (id) => {
    return goals.filter( (goal) => goal.assignedto === id);
  }
  
  const getManagedUsers = (id) => {
    return users.filter( (user) => user.mid === id);
  }
  
  const [topComments, setTopComments] = React.useState(comments.filter((comment)=>comment.eid !== loggedInUser.id).slice(0,numOfCards));
  const [curGoals, setCurGoals] = React.useState(getGoalsByUser(loggedInUser.id));
  const [selectedGoal, setSelectedGoal] = React.useState(curGoals[0]);

  const UpdateLocalFromServer = () => {
    //assumes users are not deleted or added and ids are immutable
    setUsers(
      users.map( async (user) => 
        await fetch("http://localhost:8000/employee/"+user.id, {
          method: "GET",
          headers: { "content-type" : "application/json"},
        }).then( (u) => convertUserFormat(u) )
      )
    )

    let newGoals = [];
    users.forEach( async (id) =>
      await fetch("http://localhost:8000/goals/"+id, {
        method: "GET",
        headers: { "content-type" : "application/json"},
      }).then( (data) => data.map((d)=>newGoals=newGoals.concat(convertGoalFormat(d))) ));
    setGoals(newGoals);

    // TODO actually do something useful here
    setComments(comments);
  }

  const [curUser, setCurUser] = React.useState(loggedInUser);

  const AddGoal = async (newGoal) => {
    let backendGoal = {
      title: newGoal.title, id: newGoal.id===null?-1:newGoal.id,
      description: newGoal.description,
      assignee_id: newGoal.assignedto,
      status: newGoal.status,
      start_date: new Date(newGoal.startdate),
      end_date: new Date(newGoal.completedate),
    }
    // the goal is new, post it
    if (newGoal.id===null || newGoal.id===-1){
      backendGoal.created_at = new Date();
      const response = await fetch("http://localhost:8000/goals", {
        method: "POST",
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(backendGoal)
      })
      response.json().then( (data) => newGoal.id=data.id);
    }
    // otherwise, we're updating an existing goal
    else{
      backendGoal.created_at = new Date(newGoal.createdate);
      await fetch("http://localhost:8000/goals/"+newGoal.id, {
        method: "PUT",
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(backendGoal)
  
      })
    }
    // remove any goals with newgoal's id, then add newgoal 
    setGoals([newGoal].concat(goals.filter((goal) => goal.id !== newGoal.id)));

    // if goal is in curGoals, update it there too. If newgoal's assignment changed, don't bother replacing the existing goal
    if (curGoals.some( (goal) => goal.id === newGoal.id)){
      let newCurGoals = curGoals.filter((goal) => goal.id !== newGoal.id);
      if (newGoal.assignedto !== curUser.id){
        setCurGoals(newCurGoals);
      }
      else{
        setCurGoals([newGoal].concat(newCurGoals));
      }
    }
    // if it isn't in curGoals but should be because its assigned to curUser, toss it in there
    else if (curUser.id === newGoal.assignedto) {
      setCurGoals([newGoal].concat(curGoals));
    }

    // if it's the selectedGoal, update it too!
    if (selectedGoal.id === newGoal.id){
      setSelectedGoal(newGoal);
    }
  }

  const AddComment = async (newComment) => { 
    totalComments++;
    newComment.id=totalComments;

    const backendComment = {
      id: newComment.id,
      created_at: new Date(),
      description: newComment.description,
      goal_id: newComment.gid,
      employee_id: newComment.eid,
    }

    const response = await fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: { "content-type" : "application/json"},
        body: JSON.stringify(backendComment)
      })
      response.json().then( (data) => newComment.id=data.id);

    setComments([newComment].concat(comments));
    setTopComments(comments.filter((comment)=>comment.gid === selectedGoal.id).slice(0,numOfCards));

  }

  const SetCurUserAndGoals = (userID) => {
    setCurUser(getUserByID(userID));
    setCurGoals(getGoalsByUser(userID));
  }

  const [modalShow, setModalShow] = React.useState(false);
  
  const activateModal = (goal) => {
    setSelectedGoal(goal);
    setModalShow(true);
  }



  const columns = [

    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      description: "A goal's unique 'id'entifier, or ID"
    },
  
    { 
      field: 'title', 
      headerName: 'Title', 
      flex: 0.5,
      minWidth: 200,
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1,
      description: "Describing what a goal entails!",
      minWidth: 100,
    },
  
    {
      field: 'createdBy',
      description: 'Who created a goal',
      headerName: 'Author',
      valueGetter: ({ value }) => getUserByID(value).firstname+" "+getUserByID(value).lastname,
      width: 140,
    },
    {
      field: 'createdate',
      description: 'When a goal was created',
      headerName: 'Created On',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value).toISOString().split("T")[0],
      width: 140,
    },

    {
      field: 'startdate',
      description: 'The stated start date for a goal',
      headerName: 'Start Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value).toISOString().split("T")[0],
      width: 130,
    },
  
    {
      field: 'completedate',
      description: "The predicted completion date for a goal",
      headerName: 'Completion Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value).toISOString().split("T")[0],
      width: 200,
    },
  
    {
      field: 'status',
      description: 'Not-Started/In-Progress/Done/Missed',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {

        if (params.value === "Done"){return <Box sx={{color: "rgba(0,0,0,1)"}}><CheckCircleIcon />Done</Box>}
        else if (params.value === "Missed"){return <Box sx={{color: "rgba(210,0,0,1)"}}><StopCircleIcon />Missed</Box>}
        else if (params.value === "Not-Started"){return <Box sx={{color: "rgba(0,140,140,1)"}}><RadioButtonUncheckedIcon/>Not-Started</Box>}
        else if (params.value === "In-Progress"){return <Box sx={{color: "rgba(0,160,0,1)"}}> <PlayCircleIcon/>In-Progress</Box>}
        else {return "?"}
      }
    },
  
    {
      field: "actions",
      type: 'actions',
      headerName: "Full Info",
      description: 'Click for Full Goal Information!',
      sortable: false,
      filterable: false,
      width: 110,
  
      getActions: (params) => [
        <GridActionsCellItem icon={<ReviewsIcon color="primary" />} 
          onClick={ () => {
            activateModal(params.row);
          }}/>,
      ]
    
    },

    {
      field: "Archive",
      type: 'actions',
      headerName: "Archive",
      description: 'Archive the goal!',
      sortable: false,
      filterable: false,
      width: 110,
  
      getActions: (params) => [
        
        AlertBox(
          {
            deny: "Cancel", 
            accept: "I'm Sure", 
            body: "Are you sure you want to archive this goal?", 
            title: "Archive Goal #" + params.id
          },
          () => {
            const row = params.row;
            row.status = "Archived"
            AddGoal(row).then( () =>{
              setCurGoals( curGoals.filter( (r) => r.id !== params.id ))
              setGoals(goals.filter( (r) => r.id !== params.id))
            })
            
          }, 
          () => 1,
          <InventoryIcon color="warning"/>,
        )

      ]
    
    }
  
  ];
  const cookies = new Cookies();
  const handelLogout = () =>{
    cookies.remove('username');
    cookies.remove('password');
    navigate('/');
  }
  return (

    <div>
      <Navbar style={{backgroundColor: '#005151'}}>
          <Navbar.Brand style={{paddingLeft: '6%'}}className="fw-bold fs-3 navbar-light" href="#home">
            <Image className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Dashboard
          </Navbar.Brand>
          <Button variant="light" onClick={() => 
            { 
              if(curUser !== loggedInUser){
                SetCurUserAndGoals(loggedInUser.id);}
              }
            }
          
          >
          Your Goals
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Navbar.Text style={{paddingRight: '3px'}} className="fw-bold navbar-light">
              Signed in as <Button style={{marginRight: '5px'}} className="btn-md"><strong>{loggedInUser.firstname}</strong></Button>
              ID: {loggedInUser.eid}
            <Button className="m-1" variant="warning" onClick={handelLogout}>Logout</Button>

            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
      <div>
        <EmployeeDashboard
          comments = {comments}
          setTopComments = {setTopComments}
          loggedInUser={loggedInUser} getGoalByID={getGoalByID}
          topComments={topComments} curUser={curUser} users={users}
          curGoals={curGoals} columns={columns} getUserByID={getUserByID}
          setCurGoals={setCurGoals} activateModal={activateModal} AddGoal={AddGoal}
          numOfCards = {numOfCards}
        />
      <div>
      
      <GoalDetailModal
          comments = {comments}
          getCommentsByGoal = {getCommentsByGoal}
          AddComment = {AddComment}
          getUserByID={ getUserByID }
          changeRow= { AddGoal }
          row={ selectedGoal }
          show={modalShow}
          onHide={() => setModalShow(false)}
          getEmployee = {getUserByID}
          loggedInUser={loggedInUser}
          managedUsers = {getManagedUsers(loggedInUser.id)}

        />
    
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/>
          <br/>

          <div>
          {loggedInUser.isManager ? 
            ManagerDashboard(SetCurUserAndGoals,activateModal,getManagedUsers(loggedInUser.id),goals) :""}
          </div>
        </div>
      </div>
    </div>

  );
}