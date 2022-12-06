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
import Cookies from 'universal-cookie'



const numOfCards = 4;

function EmployeeDashboard(props) {
  let {
    setTopComments, comments,
    loggedInUser, topComments, curUser, curGoals, AddGoal,
    columns, activateModal, getGoalByID, getUserByID, users,
  } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
  
  return (
    <div style={{  height: 410, width: '100%' }}>
      <div className="p-1 d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        <Image height="50" src={icon}/>
          {curUser === loggedInUser ? "Your" : curUser.firstname + " " +curUser.lastname + "'s"} Goals
        </div>
        <div>
          <Button className="m-1" variant="success" onClick={()=>setModalShow(true)}>New Goal</Button>
          <NewGoalModal
            AddGoal={AddGoal}
            loggedInUser={loggedInUser}
            managedUsers={users.filter((user)=>user.mid===loggedInUser.id)}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
      <DataGrid
        rows={curGoals}
        columns={columns}
        onRowClick={
          (params, event, details) => {
            setTopComments(comments.filter((comment)=>comment.gid === params.id).slice(0,numOfCards));
            // activateModal(params.row);
          }
        }
        components={{ Toolbar: () => 
          <Box sx = {{ p: 0.5, pb: 0, }} > <GridToolbarQuickFilter /> </Box> 
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'status', sort: 'desc'}],
          },
        }}
        pageSize={5}
        goalsPerPageOptions={[5]}
        checkboxSelection={false}
        sx={{
          '& .super-app-theme--Not-Started': {backgroundColor: 'rgba(0, 255, 255, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 255, 255, 0.5)')}},
          '& .super-app-theme--In-Progress': {backgroundColor: 'rgba(0, 255, 0, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 255, 0, 0.5)')}},
          '& .super-app-theme--Done': {backgroundColor: 'rgba(0, 0, 0, 0.25)', color: 'text.disabled',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 0, 0, 0.5)'),}},
          '& .super-app-theme--Missed': {backgroundColor: 'rgba(255, 0, 0, 0.25)',
            '&:hover': {bgcolor: getHoverBackgroundColor('rgba(255, 0, 0, 0.5)')}},
        }}
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      />
      <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        Recent Comments
      <Container fluid>
      <Row sx={{width: '100%'}}>
        {topComments.length === 0 ? <div className="fw-italic"><br/> no recent comments... </div>: topComments.map((comment) => (
          <Col key={comment.eid} sx={{height: "300px", width: "25%"}}>
            {CommentCard(comment,getGoalByID,getUserByID,() => activateModal(getGoalByID(comment.gid))  )}
          </Col>
        ))}
      </Row>
      </Container>
      </div>
    </div>
  )
}

function NewGoalModal(props) {
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Not-Started', value: '1' },
    { name: 'In-Progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];
  const variant = [
    'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
  ];

  const onFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())
    formDataObj.id = -1;
    formDataObj.createdate = new Date();
    formDataObj.createdBy = props.loggedInUser.id;
    let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
    formDataObj.status = r;
    const aTo = formDataObj.assignedto;
    if (aTo === "Me"){
      formDataObj.assignedto = props.loggedInUser.id;
    }
    else{
      const id = parseInt(aTo.split("(")[1].slice(0,-1));
      formDataObj.assignedto = id;
    }

    

    props.AddGoal(formDataObj);
    props.onHide();
  };

  const onClose = () => {
    setRadioValue('1');
    props.onHide();
  }

  return (
    <Modal
      key={Modal.uid}
      {...props}
      onHide={onClose}
      size="lg"
      aria-labelledby="newGoalModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="newGoalModal">
          New Goal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="newGoalDescription">
              <FloatingLabel controlID="floatingInputGrid" label="Title">
                <Form.Control
                  name = "title"
                  type="text"
                  required
                  placeholder=""
                />
              </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="newGoal"
          >
            <FloatingLabel controlID="floatingInputGrid" label="Description">
              <Form.Control required 
                name="description" 
                as="textarea" 
                style={{height: '160px'}} 
                placeholder=""
              />
            </FloatingLabel>
          </Form.Group>
          <Row><Col>
          <Form.Group className="mb-3" controlId="newGoalStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name = "startdate"
              type="date"
              required
            />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="newGoalCompletionDate">
            <Form.Label>Completion Date</Form.Label>
            <Form.Control
              name="completedate"
              type="date"
              required
            />
          </Form.Group>
          </Col>
          </Row>
          <Row>
            <Col>
          <Form.Group className="mb-3" controlId="newGoalStatus">
            <Form.Label>Status</Form.Label><br/>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={variant[idx]}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                  required
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
            <Form.Label>Assigned To</Form.Label>
            <Form.Select name="assignedto">
            <option>Me</option>
              {props.managedUsers.map((user) => 
                <option> {user.firstname + " " + user.lastname + " (" + user.id + ")"} </option>
              )}
            </Form.Select>
            
          </Form.Group>
          </Col>
          </Row>
        
          <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
        <Button variant="success" type="submit"> Create</Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
}

function GoalDetailModal(props) {
  const { row, getCommentsByGoal, changeRow, getEmployee, AddComment, loggedInUser, managedUsers} = props;
  
  const [changed, setChanged] = useState(false);
  const [makingNewComment,setMakingNewComment] = useState(false);
  const [radioValue, setRadioValue] = useState('-1');



  if (row === undefined){return;}
  let users = managedUsers.concat([loggedInUser]);

  let comments = getCommentsByGoal(row.id).sort((a,b) => {
    return b.createdate.getTime() - a.createdate.getTime();
  });

  const radios = [
    { name: 'Not-Started', value: '1' },
    { name: 'In-Progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];

  let newRadio = radios.reduce((ret,obj,i) => { 
    if (obj['name'] === row.status){
      return obj['value'];
    }
    return ret;
  },'0');

  if (!changed && newRadio !== radioValue){
    setRadioValue(newRadio);
  }

  const variant = [
    'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
  ];

  const createdBy = props.getEmployee(33) // UNCOMMENT WHEN BACKEND HAS CREATEDBY props.getEmployee(row.createdBy); 
  const assignedTo = props.getEmployee(row.assignedto);

  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())
    
    if (!users.includes(createdBy)){formDataObj.assignedto=row.assignedto;}
    else {formDataObj.assignedto = parseInt(formDataObj.assignedto.split("(")[1].slice(0,-1));}

    let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
    const modifiedObj = {
      id: row.id,
      title: formDataObj.title,
      description: formDataObj.description,
      startdate: formDataObj.startdate,
      completedate: formDataObj.completedate,
      createdate: row.createdate,
      status: r,
      assignedto: formDataObj.assignedto,
      createdate: row.createdate,
      createdBy: row.createdBy,
    }
    changeRow(modifiedObj).then(()=>setChanged(false));
  }

  const onClose = () => {
    if (changed){
      setChanged(false);
    }
    if (makingNewComment){
      setMakingNewComment(false);
    }
    props.onHide();
  };

  const addComment = (e) => {
    e.preventDefault()

    const comment = {
      gid: row.id,
      description: Object.fromEntries(new FormData(e.target).entries()).commentbody,
      eid: loggedInUser.id, createdate: new Date(),
      viewedBy: [],
    }
    if (comment.description !== ""){
      AddComment(comment).then( () => setMakingNewComment(false));
    }
    setMakingNewComment(false);
  } 

  return (
    <Modal
      {...props}
      onHide={onClose}
      size="lg"
      aria-labelledby="goalDetailModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="goalDetailModal">
          View/Edit Goal #{row.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form  onSubmit={onFormSubmit} onChange={() => setChanged(true)}>
        <Form.Group className="mb-3" controlId="goalDetailTitle">
            <FloatingLabel
              controlID="floatingInput"
              label="Title"
              className="mb-3"
              >
              <Form.Control
                name="title"
                size="lg"
                type="text"
                autoFocus
                required
                defaultValue={row.title}
                placeholder=""
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="goalDetailDescription"
          >
            <FloatingLabel
              controlID="floatingInput"
              label="Description"
              className="mb-3"
            >
              <Form.Control 
                name="description"
                placeholder="" 
                as="textarea" 
                style={{height: '160px'}} 
                defaultValue={row.description} />
            </FloatingLabel>
          </Form.Group>
          <Row className="g-2">
            <Col md>
          <Form.Group className="mb-3" controlId="goalDetailStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="startdate"
              type="date"
              placeholder=""
              required
              defaultValue={ row.startdate }
            />
          </Form.Group>
            </Col>
            <Col>
          <Form.Group className="mb-3" controlId="goalDetailCompletionDate">
            <Form.Label>Completion Date</Form.Label>
            <Form.Control
              name="completedate"
              type="date"
              placeholder=""
              required
              defaultValue={row.completedate}
            />
          </Form.Group>
          </Col>
          <Col>
          <Form.Group className="mb-3" controlId="goalDetailCreationDate">
            <Form.Label>Creation Date</Form.Label>
            <Form.Control
              name="createdate"
              type="date"
              placeholder=""
              readOnly
              disabled
              value={row.createdate.split("T")[0]}
            />
          </Form.Group>
          </Col>
          </Row>
          <Form.Group className="mb-3" controlId="goalDetailStatus">
            <Form.Label>Status</Form.Label><br/>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={variant[idx]}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => {setChanged(true); setRadioValue(e.currentTarget.value); }}
                  required
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>
          <Form.Group>
            <Row>
                <Col><Form.Label>Created By</Form.Label></Col>
                <Col><Form.Label>Assigned To</Form.Label></Col>
            </Row>
            <Row>
                <Col>
                <Form.Control
                  name="createdBy"
                  type="string"
                  placeholder=""
                  readOnly
                  disabled
                  value={createdBy.firstname + " " + createdBy.lastname}
            />
                </Col>
                <Col>
                <Form.Select defaultValue={assignedTo.firstname + " " + assignedTo.lastname + " (" + assignedTo.id + ")"} disabled={!users.includes(createdBy)} name="assignedto">
              {users.map((user) => 
                <option> {user.firstname + " " + user.lastname + " (" + user.id + ")"} </option>
              )}
            </Form.Select>
            </Col>
            </Row>
          </Form.Group>
          <br/>

          <Form.Group
            className="mb-3"
            controlId="goalDetailManagerComment"
          > 
          <Form.Label>Comments</Form.Label>
            <ListGroup as="ol" numbered>
              {comments.map( (comment) => {
              const author = getEmployee(comment.eid);
              return (<ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{author.firstname + " " + author.lastname}</div>
                  {comment.description}
                </div>
                {comment.createdate.toLocaleDateString() + " at " + comment.createdate.toLocaleTimeString()}
              </ListGroup.Item>
              )})}
            </ListGroup>
          </Form.Group>
          
          
          <br/>
          <Modal.Footer>
        <Button onClick={onClose} >Close</Button>
        <Button variant="success" disabled={!changed} type="submit" >Save Changes</Button>
      </Modal.Footer>
        </Form>
        <Form 
          onChange={(e)=>{e.commentbody!==""?setMakingNewComment(true):setMakingNewComment(false)}} 
          onSubmit={addComment}>
          <Form.Group
            className="mb-5"
            controlId="goalDetailComment"
          > <FloatingLabel
          controlID="floatingInput"
          label="New Comment"
          className="mb-3"
          >
            <Form.Control name="commentbody" 
              className="mb-1" 
              defaultValue={""} 
              placeholder={""}as="textarea" style={{height: '100px'}}/>
            </FloatingLabel>
            <Button style={{float: 'right'}} disabled={!makingNewComment} type="submit">Add Comment</Button>
          </Form.Group>
          </Form>
      </Modal.Body>
     
    </Modal>
  );
}

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


    // {
    //   id: 1, gid: 3877,
    //   description: "I'm hoping to be done with this soon",
    //   eid: 43, createdate: new Date(),
    //   viewedBy: [],
    // },
    // {
    //   id: 2, gid: 3877,
    //   description: "nice job!",
    //   eid: 32, createdate: new Date(),
    //   viewedBy: [32],
    // },
  
    // {
    //   id: 3, gid: 298,
    //   description: "This makes sense, keep up the good work.",
    //   eid: 32, createdate: new Date(2020, 10, 6, 30, 5),
    //   viewedBy: []
    // },
  
    // {
    //   id: 4, gid: 62,
    //   description: "cool stuff, keep it up",
    //   eid: 32, createdate: new Date(),
    //   viewedBy: []
    // },
    // {
    //   id: 5, gid: 3876,
    //   description: "Jim, this is not a realistic goal...",
    //   eid: 41, createdate: new Date(),
    //   viewedBy: []
    // },
  //]);

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
    .then( (c) => {         console.log("HEY!",out);
      if (c.detail === "No comments found for goal id "+g.id) {return out;} 
      else {return out.then( (o) => o.concat( c.map( (comment)=>convertCommentFormat(comment) ) ));}})
    ,Promise.resolve([])).then( setComments );
  }, []);
  
    
    // {
    //   firstname: "Elon",
    //   lastname: "Tusk",
    //   id: 41, //Employee ID
    //   title: "Generic Middle Manager",
    //   isManager: true,
    //   email: "tusk@acme.com",
    //   compid: 2, //Company ID
    //   mid: 40, //Manager ID
    //   password: "password",
    //   currentUser: false,
    // },
    // {
    //   firstname: "Jim",
    //   lastname: "Johnson",
    //   id: 32, //Employee ID
    //   title: "Generic Middle Manager",
    //   isManager: true,
    //   email: "jimjohnson@acme.com",
    //   compid: 2, //Company ID
    //   mid: 41, //Manager ID
    //   password: "password",
    //   currentUser: true,
    // },
    // {
    //   firstname: "Jill",
    //   lastname: "Johnson",
    //   id: 43, //Employee ID
    //   title: "Generic Middle Manager",
    //   isManager: true,
    //   email: "jimjohnson@acme.com",
    //   compid: 2, //Company ID
    //   mid: 32, //Manager ID
    //   password: "password",
    //   currentUser: false,
    // },
    // {
    //   firstname: "Tim",
    //   lastname: "Thompson",
    //   id: 44, //Employee ID
    //   title: "Generic Middle Manager",
    //   isManager: true,
    //   email: "jimjohnson@acme.com",
    //   compid: 2, //Company ID
    //   mid: 32, //Manager ID
    //   password: "password",
    //   currentUser: false,
    // },
    // {
    //   firstname: "Eclair",
    //   lastname: "",
    //   id: 45, //Employee ID
    //   title: "Generic Middle Manager",
    //   isManager: true,
    //   email: "jimjohnson@acme.com",
    //   compid: 2, //Company ID
    //   mid: 32, //Manager ID
    //   password: "password",
    //   currentUser: false,
    // },
  //]);
  
  


  


    
  
    // {
    //   id: 298, title: 'Purchase New Coffee Machine',
    //   description: 'Jon says Keurig is preferred!',
    //   startdate: '2022-10-27', completedate: "2021-10-28", 
    //   status: "In-Progress", createdate: '2020-08-20',
    //   createdBy: 32, assignedto: 45,
  
    // },
  
    // {
    //   id: 62, title: 'Set Up New Laptops',
    //   description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work? I am now going to write a bunch more here to test whether or not anything breaks when a verrrrry long description is used. This should roughly be the maximum length of a description, right?',
    //   startdate: "2021-11-02", completedate: "2021-11-11",
    //   status: "Missed", createdate: '2020-08-20',
    //   createdBy: 32, assignedto: 32,
  
    // },
  
    // { id: 3876, title: 'Create Killer Robots', 
    //   description: 'Pretty self explanatory, really.',
    //   startdate: "1989-02-03", completedate: "2040-01-01",
    //   status: "Done", createdate: '2020-08-20',
    //   createdBy: 32, assignedto: 32,
    // },
  
    // { id: 3877, title: 'Test Employee Dashboard Frontend', 
    //   description: 'Try to break inputs, look for undefined behavior.', 
    //   startdate: "2022-10-11", completedate: "2022-10-13",
    //   status: "Not-Started", createdate: '2020-08-20',
    //   createdBy: 32, assignedto: 43,
    // },
  
    // { id: 5, title: 'Spend More Time Outside', 
    //   description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    //   startdate: "2020-04-13", completedate: "2023-05-16",
    //   status: "In-Progress", createdate: '2020-08-20',
    //   createdBy: 32, assignedto: 32,
  
    // },
  
  //]);
  
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
    console.log(id);
    console.log(comments);
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

  const AddComment = async (newComment) => { //TODO integrate 
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
      description: "The goal's unique 'id'entifier, or ID"
    },
  
    { 
      field: 'title', 
      headerName: 'Title', 
      flex: 0.5,
      description: "What the goal is!",
      minWidth: 200,
    },
  
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1,
      description: "More information about what the goal entails",
      minWidth: 100,
    },
  
    {
      field: 'startdate',
      description: 'The date of start for the goal',
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