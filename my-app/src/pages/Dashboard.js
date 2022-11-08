import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import logo from './ukglogo.jpg';
import icon from './icon1.png';
import ManagerDashboard from "./ManagerDashboard.js";
import GoalCard from './components/GoalCard';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ReviewsIcon from '@mui/icons-material/Reviews';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { darken, lighten } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import AlertBox from './components/AlertBox.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { GridActionsCellItem, GridRowId, GridColumns } from '@mui/x-data-grid';
import InventoryIcon from '@mui/icons-material/Inventory';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';


//Sample Data
let totalGoals = 10;
let rows = [

  {
    id: 298, title: 'Purchase New Coffee Machine',
    description: 'Jon says Keurig is preferred!',
    startdate: '2022-10-27', completedate: "2021-10-28", 
    status: "In-Progress", createdate: '2020-08-20',
  },

  {
    id: 62, title: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work? I am now going to write a bunch more here to test whether or not anything breaks when a verrrrry long description is used. This should roughly be the maximum length of a description, right?',
    startdate: "2021-11-02", completedate: "2021-11-11",
    status: "Missed", createdate: '2020-08-20',
  },

  { id: 3876, title: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    startdate: "1989-02-03", completedate: "2040-01-01",
    status: "Done", createdate: '2020-08-20',
  },

  { id: 3877, title: 'Test Employee Dashboard Frontend', 
    description: 'Try to break inputs, look for undefined behavior.', 
    startdate: "2022-10-11", completedate: "2022-10-13",
    status: "Not-Started", createdate: '2020-08-20',
  },

  { id: 5, title: 'Spend More Time Outside', 
    description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    startdate: "2020-04-13", completedate: "2023-05-16",
    status: "In-Progress", createdate: '2020-08-20',
  },

];

//Sample Data
let loggedInUser = {
  firstname: "Jim",
  lastname: "Johnson",
  eid: 42, //Employee ID
  title: "Generic Middle Manager",
  isManager: true,
  email: "jimjohnson@acme.com",
  compid: 2, //Company ID
  mid: 43, //Manager ID
  password: "password",
}



const numOfCards = 4;

function EmployeeDashboard(selectedRows,setSelectedRows,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns,setCurRows,setSelectedGoal,showModal) {
  const [modalShow, setModalShow] = React.useState(false);
  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
  
  // Below code not in use
  const dateComp = (str) => {
    const today = new Date()
    const [day, month, year] = str.split("/");
    const date = new Date(+year, month - 1, +day);
    return date.getTime() > today.getTime() ? true : false
  }
  // Above code not in use

  return (
    <div style={{  height: 410, width: '100%' }}>
      <div className="p-1 d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        <Image height="50" src={icon}/>
          {curEmployee == loggedInUser ? "Your" : curEmployee.firstname + " " +curEmployee.lastname + "'s"} Goals
        </div>
        <div>
          <Button className="m-1" variant="success" onClick={()=>setModalShow(true)}>New Goal</Button>
          <NewGoalModal
            setCurRows={setCurRows}
            curRows={curRows}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />        
        </div>
      </div>
      <DataGrid
        rows={curRows}
        columns={columns}
        onRowClick={
          (params, event, details) => {
            if (!selectedRows.includes(params.row)){
              let temp = [...selectedRows];
              temp[selectedGoalIndex] = params.row;
              if (selectedGoalIndex+1 == selectedRows.length){
                selectedGoalIndex=-1;
              }
              setSelectedGoalIndex(selectedGoalIndex+1);
              setSelectedRows(temp);
            }
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
        rowsPerPageOptions={[5]}
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
      <TableRow sx={{width: '100%'}}>
        {selectedRows.map((GoalsRow) => (
          <TableCell sx={{height: "350px", width: "25%"}}>
            {GoalCard(GoalsRow,curEmployee,() =>{setSelectedGoal(GoalsRow); showModal(true)  } )}
          </TableCell>
        ))}   
      </TableRow>
    </div>
  )
}

function NewGoalModal(props) {
  const [validated, setValidated] = useState(false);
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'Not Started', value: '1' },
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
    formDataObj.id = Math.floor(Math.random() * 1000000000);
    let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
    formDataObj.status = r;


    const postObject = {
      title: formDataObj.title,
      description: formDataObj.description,
      assignee_id: loggedInUser.eid,
      status: formDataObj.status,
      start_date: new Date(formDataObj.startdate),
      end_date: new Date(formDataObj.completedate),
    }
    fetch("http://localhost:8000/goals", {
      method: "POST",
      headers: { "content-type" : "application/json"},
      body: JSON.stringify(postObject)

    })

    const newRows = [formDataObj].concat(props.curRows);
    props.setCurRows(newRows);
    props.onHide();
  };

  const onClose = () => {
    setRadioValue('1');
    props.onHide();
  }

  return (
    <Modal
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
          <Form.Group
            className="mb-3"
            controlId="newGoalComment"
          >
            <Form.Label>Comment</Form.Label>
            <Form.Control name="comment" as="textarea" rows={3} />
          </Form.Group>
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
  const row = props.row;
  const radios = [
    { name: 'Not-Started', value: '1' },
    { name: 'In-Progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];
  const [changed, setChanged] = useState(false);
  const [radioValue, setRadioValue] = useState('-1');
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

  const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())

    let r = radios.reduce( (prev, cur, i) => cur.value===radioValue?cur.name:prev,"N/A");
    const modifiedObj = {
      id: row.id,
      title: formDataObj.title,
      description: formDataObj.description,
      startdate: formDataObj.startdate,
      completedate: formDataObj.completedate,
      createdate: row.createdate,
      status: r,

    }
    props.changeRow(modifiedObj);
    if (props.selectedGoals.includes(row)){
      props.setSelectedGoals([modifiedObj].concat(props.selectedGoals.filter( (r) => r.id !== row.id)));
    }
    
    props.setCurRows([modifiedObj].concat(props.rows.filter( (r) => r.id !== row.id)));
    setChanged(false);
  }

  const onClose = () => {
    if (changed){
      setChanged(false);
    }
    props.onHide();
  };

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
          Goal #{row.id}
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
              value={row.createdate}
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

          <Form.Group
            className="mb-3"
            controlId="goalDetailManagerComment"
          > 
          <Form.Label>Comment</Form.Label>
            <ListGroup as="ol" numbered>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Employee</div>
                  xxx
                </div>
                <Badge bg="primary" pill>
                  !
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Manager</div>
                  xxx
                </div>
                <Badge bg="danger" pill>
                  !
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                disabled
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Manager</div>
                  xxx
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Form.Group>

          
          <Form.Group
            className="mb-5"
            controlId="goalDetailComment"
          >
            <Form.Label>Add Comment</Form.Label>
            <Form.Control className="mb-1" defaultValue={"I think so."}as="textarea" rows={2}/>
            <Button style={{float: 'right'}} onClick={onClose}>Add</Button>
          </Form.Group>
          <br/>
          <Modal.Footer>
        <Button onClick={onClose} >Close</Button>
        <Button variant="success" disabled={!changed} type="submit" >Save Changes</Button>
      </Modal.Footer>
        </Form>
      </Modal.Body>
     
    </Modal>
  );
}

export default function Dashboard() {

  const [selectedGoalIndex,setSelectedGoalIndex] = React.useState(0);
  const [selectedGoals, setSelectedGoals] = React.useState(rows.slice(0,numOfCards));
  const [selectedGoal, setSelectedGoal] = React.useState(rows[0]);
  const [curEmployee, setCurEmployee] = React.useState(loggedInUser);
  const [curRows, setCurRows] = React.useState(rows);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  
  const {state} = useLocation();
  if (state != null){
    loggedInUser = state.user;
    rows = state.goals;
    console.log(state);
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
      minWidth: 110,
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
      width: 155,
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
      width: 85,
  
      getActions: (params) => [
        <GridActionsCellItem icon={<ReviewsIcon color="primary" />} 
          onClick={ () => {
            setSelectedGoal(params.row);
            setModalShow(true);
          }}/>,
      ]
    
    },

    {
      field: "Archive",
      type: 'actions',
      headerName: "Archive",
      description: 'Set it to archive!',
      sortable: false,
      filterable: false,
      width: 85,
  
      getActions: (params) => [
        
        AlertBox(
          {
            deny: "Cancel", 
            accept: "I'm Sure", 
            body: "Are you sure you want to archive this goal?", 
            title: "Archive Goal #" + params.id
          },
          () => {
            setCurRows( curRows.filter( (row) => row.id !== params.id ))
            rows=rows.filter( (row) => row.id !== params.id)
          }, 
          () => 1,
          <InventoryIcon color="warning"/>,
        )

      ]
    
    }
  
  ];

  return (

    <div>
      <Navbar style={{backgroundColor: '#005151'}}>
          <Navbar.Brand style={{paddingLeft: '6%'}}className="fw-bold fs-3 navbar-light" href="#home">
            <Image className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Dashboard
          </Navbar.Brand>
          <Button variant="light" onClick={() => 
            { 
            if(curEmployee != loggedInUser){setCurEmployee(loggedInUser); 
              setCurRows(
                rows
              ); setSelectedGoals(rows.slice(0,numOfCards))} }}>
              Your Goals
          </Button>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Navbar.Text style={{paddingRight: '3px'}} className="fw-bold navbar-light">
              Signed in as <Button style={{marginRight: '5px'}} className="btn-md"><strong>{loggedInUser.firstname}</strong></Button>
              ID: {loggedInUser.eid}
            <Button className="m-1" variant="warning" onClick={()=>navigate('/')}>Logout</Button>

            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
      <div>
        {EmployeeDashboard(selectedGoals,setSelectedGoals,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns,setCurRows,setSelectedGoal,setModalShow)}
      <div>
      
      <GoalDetailModal
          changeRow= { setSelectedGoal }
          row={ selectedGoal }
          show={modalShow}
          rows = {curRows}
          setCurRows = {setCurRows}
          setSelectedGoals = {setSelectedGoals}
          selectedGoals = {selectedGoals}
          onHide={() => setModalShow(false)}
        />:
    
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/>

          <div>
          {loggedInUser.isManager ? ManagerDashboard(setCurEmployee,setCurRows,setSelectedGoals,setSelectedGoalIndex,numOfCards,setModalShow,setSelectedGoal) : "(not a manager)"}
          </div>
        </div>
      </div>
    </div>

  );
}