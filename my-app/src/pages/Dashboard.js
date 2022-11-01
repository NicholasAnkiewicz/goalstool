import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from './ukglogo.jpg';
import ManagerDashboard from "./ManagerDashboard.js"
import { useNavigate, useLocation } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import icon from './icon1.png';
import GoalCard from './components/GoalCard'
import ReviewsIcon from '@mui/icons-material/Reviews';
import IconButton from '@mui/material/IconButton';
import { darken, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertBox from './components/AlertBox.js'

import {
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';

//Sample Data
let rows = [

  {
    id: 298, name: 'Purchase New Coffee Machine',
    description: 'Jon says Keurig is preferred!',
    createdate: "9/26/2021", completedate: "10/27/2021",
    type: "Purchase", status: "In-Progress"
  },

  {
    id: 62, name: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work? I am now going to write a bunch more here to test whether or not anything breaks when a verrrrry long description is used. This should roughly be the maximum length of a description, right?',
    createdate: "11/2/21", completedate: "11/11/21",
    type: "IT", status: "Missed"
  },

  { id: 3876, name: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    createdate: "2/3/1989", completedate: "1/1/2040",
    type: "Evil", status: "Done"
  },

  { id: 3877, name: 'Test Employee Dashboard Frontend', 
    description: 'Try to break inputs, look for undefined behavior.', 
    createdate: "10/11/2022", completedate: "10/13/2022",
    type: "Dev", status: "In-Progress"
  },

  { id: 5, name: 'Spend More Time Outside', 
    description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    createdate: "4/12/2020", completedate: "5/16/2023",
    type: "Personal", status: "In-Progress"

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

function EmployeeDashboard(selectedRows,setSelectedRows,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns) {
  const navigate = useNavigate();
  const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
  
  // Below code not in use
  const dateComp = (str) => {
    const today = new Date()
    const [day, month, year] = str.split("/");
    const date = new Date(+year, month - 1, +day);
    return date.getTime() > today.getTime() ? true : false
  }

  return (
    <div style={{ height: 450, width: '100%' }}>

      <div className="p-1 d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-2" style={{color: '#005151'}}  >
        <Image height="50" src={icon}/>
          {curEmployee == loggedInUser ? "Your" : curEmployee.firstname + " " +curEmployee.lastname + "'s"} Goals
        </div>
        <div>
          <Button className="m-1" variant="success" onClick={()=>navigate('/NewGoal')}>New Goal</Button>
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
      }}
      
      components={{ Toolbar: () => 
        <Box sx = {{ p: 0.5, pb: 0, }} > <GridToolbarQuickFilter /> </Box> }}

      initialState={{
        sorting: {
          sortModel: [{ field: 'status', sort: 'desc'}],
        },
      }}

      pageSize={10}
      rowsPerPageOptions={[6]}
      checkboxSelection={false}
      sx={{
        '& .super-app-theme--Done': {backgroundColor: 'rgba(0, 0, 0, 0.14)', color: 'text.disabled',
          '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 0, 0, 0.14)'),}},
        '& .super-app-theme--In-Progress': {backgroundColor: 'rgba(0, 255, 0, 0.24)',
          '&:hover': {bgcolor: getHoverBackgroundColor('rgba(0, 255, 0, 0.24)')}},
        '& .super-app-theme--Missed': {backgroundColor: 'rgba(255, 0, 0, .12)',
          '&:hover': {bgcolor: getHoverBackgroundColor('rgba(255, 0, 0, .12)')}},
      }}
      getRowClassName={(params) => `super-app-theme--${params.row.status}`}
    />
      <TableRow sx={{width: '100%'}}>
        {selectedRows.map((GoalsRow) => (
          <TableCell sx={{height: "350px", width: "25%"}}>
            {GoalCard(GoalsRow,curEmployee)}
          </TableCell>
              ))}   
      </TableRow>
  </div>
  )
}

export default function Dashboard() {

  const {state} = useLocation();
  if (state != null){
    loggedInUser = state.user;
    rows = state.goals;
    console.log(state);
  }

  const [selectedGoalIndex,setSelectedGoalIndex] = React.useState(0);
  const [selectedGoals, setSelectedGoals] = React.useState(rows.slice(0,numOfCards));
  const [curEmployee, setCurEmployee] = React.useState(loggedInUser);
  const [curRows, setCurRows] = React.useState(rows);
  const navigate = useNavigate();

  const columns = [

    { field: 'id', 
      headerName: 'ID', 
      width: 80,
      description: "The goal's unique 'id'entifier, or ID"
    },
  
    { field: 'name', 
      headerName: 'Name', 
      flex: 0.5,
      description: "What the goal is!",
      minWidth: 200,
    },
  
    { field: 'description', 
      headerName: 'Description', 
      flex: 1,
      description: "More information about what the goal entails",
      minWidth: 125,
    },
  
    {
      field: 'type',
      headerName: 'Type',
      width: 110,
      description: 'What type of goal this is'
    },
  
    {
      field: 'createdate',
      description: 'The date of creation for the goal',
      headerName: 'Creation Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      width: 130,
    },
  
    {
      field: 'completedate',
      description: "The predicted completion date for a goal",
      headerName: 'Completion Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      width: 155,
    },
  
    {
      field: 'status',
      description: 'Done/In-Progress/Missed',
      headerName: 'Status',
      width: 120,
    },
  
    {
      field: "actions",
      type: 'actions',
      headerName: "Actions",
      description: 'Click for Full Goal Information!',
      sortable: false,
      filterable: false,
      width: 80,
  
      getActions: (params) => [

        <GridActionsCellItem icon={<ReviewsIcon color="primary" />} onClick={ () => 1} />,
        
        AlertBox(
          {
            deny: "Cancel", 
            accept: "I'm Sure", 
            body: "Are you sure you want to delete this goal?", 
            title: "Delete Goal #" + params.id
          },
          () => {
            setCurRows( curRows.filter( (row) => row.id !== params.id ))
            rows=rows.filter( (row) => row.id !== params.id)
          }, 
          () => 1,
          <DeleteIcon color="warning"/>,
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
            {setCurEmployee(loggedInUser); 
            setCurRows(rows); 
            if(curEmployee != loggedInUser){setSelectedGoals(rows.slice(0,numOfCards))} }}>
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
        {EmployeeDashboard(selectedGoals,setSelectedGoals,curEmployee,curRows,selectedGoalIndex,setSelectedGoalIndex,columns)}
        <div>
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/>
          <br/><br/>

          <div>
          {loggedInUser.isManager ? ManagerDashboard(setCurEmployee,setCurRows,setSelectedGoals,setSelectedGoalIndex,numOfCards) : "(not a manager)"}
          </div>
        </div>

      </div>
    </div>

  );
}