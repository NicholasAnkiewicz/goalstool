import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from './ukglogo.jpg';
import ManagerDashboard from "./ManagerDashboard.js"
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import icon from './icon1.png';
import GoalCard from './components/GoalCard'
import ReviewsIcon from '@mui/icons-material/Reviews';
import IconButton from '@mui/material/IconButton';
import { darken, lighten } from '@mui/material/styles';


const columns = [

  { field: 'id', 
    headerName: 'ID', 
    width: 80,
    description: "The goal's unique 'id'entifier, or ID"
  },

  { field: 'name', 
    headerName: 'Name', 
    flex: 1,
    description: "What the goal is!"
  },

  { field: 'description', 
    headerName: 'Description', 
    flex: 1,
    description: "More information about what the goal entails"
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
    type: 'enum',
    width: '120',
  },

  {
    field: "moreInfo",
    headerName: "Comments",
    description: 'Click for Full Goal Information!',
    sortable: false,
    width: 100,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); 
        const api = params.api;
        const thisRow = {};
        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        return 1;
        //return alert(JSON.stringify(thisRow, null, 4));
      };
      return  <div><IconButton size="small" onClick={onClick}>
      {<ReviewsIcon color="primary"/>}
    </IconButton></div>;
    }
  }

];


const rows = [

  {
    id: 298, name: 'Purchase New Coffee Machine',
    description: 'Jon says Keurig is preferred!',
    createdate: "9/26/2021", completedate: "10/27/2021",
    editableField: "this field can be editedd (try fixing the typo)",
    type: "Purchase", status: "In-Progress"
  },

  {
    id: 62, name: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work?',
    createdate: "11/2/21", completedate: "11/11/21",
    editableField: "this one too!",
    type: "IT", status: "Missed"
  },

  { id: 3876, name: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    createdate: "2/3/1989", completedate: "1/1/2040",
    editableField: "even the one underneath, with no text!",
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


let loggedInUser = {
  firstname: "Jim",
  lastname: "Johnson"
}

function EmployeeDashboard(selectedRow,changeSelectedRow,curEmployee,curRows) {
  const navigate = useNavigate();
  const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.3);
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
          changeSelectedRow(params.row);
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
    {GoalCard(selectedRow,curEmployee)}

  </div>
  )
}

export default function Dashboard() {
  const [activeGoal, setActiveGoal] = React.useState(rows[0]);
  const [curEmployee, setCurUser] = React.useState(loggedInUser);
  const [curRows, setCurRows] = React.useState(rows);
  const nodeRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar style={{backgroundColor: '#005151'}}>
        
          <Navbar.Brand style={{paddingLeft: '6%'}}className="fw-bold fs-3 navbar-light" href="#home">
            <Image className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Dashboard
          </Navbar.Brand>
          <Button variant="light" onClick={() => {setCurUser(loggedInUser); setCurRows(rows) }}>Your Goals</Button>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Navbar.Text style={{paddingRight: '3px'}} className="fw-bold navbar-light">
              Signed in as <Button className="btn-lg">{loggedInUser.firstname}</Button>
            <Button className="m-1" variant="warning" onClick={()=>navigate('/')}>Logout</Button>

            </Navbar.Text>
          </Navbar.Collapse>
      </Navbar>
      <div>
        {EmployeeDashboard(activeGoal,setActiveGoal,curEmployee,curRows)}
        <div ref={nodeRef} style={{float: 'right', width: "80%"}}>
          <br/>
          <br/>
          {ManagerDashboard(setCurUser,setCurRows)}
        </div>

      </div>
    </div>

  );
}

