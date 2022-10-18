import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './ukglogo.jpg';
import { MDBSwitch } from 'mdb-react-ui-kit';
import ManagerDashboard from "./ManagerDashboard.js"
import { CSSTransition } from 'react-transition-group';


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
    field: 'createdDate',
    description: 'The date of creation for the goal',
    headerName: 'Creation Date',
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
    width: 130,
  },

  {
    field: 'completionDate',
    description: "The predicted completion date for a goal",
    headerName: 'Completion Date',
    type: 'date',
    valueGetter: ({ value }) => value && new Date(value),
    width: 155,
  },

  {
    field: 'status',
    description: 'Complete/In Progress/Initialized/Abandoned',
    headerName: 'Status',
    type: 'enum',
    width: '90',
  },

  {
    field: "moreInfo",
    headerName: "More Info",
    description: 'Click for Full Goal Information!',
    sortable: false,
    width: 90,
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
        return alert(JSON.stringify(thisRow, null, 4));
      };
      return <Button onClick={onClick}>View</Button>;
    }
  }

];


const rows = [

  {
    id: 298, name: 'Purchase New Coffee Machine',
    description: 'Jon says Keurig is preferred!',
    createdDate: "9/26/2021", completionDate: "10/27/2021",
    editableField: "this field can be editedd (try fixing the typo)",
    type: "Purchase", status: "Go"
  },

  {
    id: 62, name: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work?',
    createdDate: "11/2/21", completionDate: "11/11/21",
    editableField: "this one too!",
    type: "IT", status: "Stopped"
  },

  { id: 3876, name: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    createdDate: "2/3/1989", completionDate: "1/1/2040",
    editableField: "even the one underneath, with no text!",
    type: "Evil", status: "Done"
  },

  { id: 3877, name: 'Test Employee Dashboard Frontend', 
    description: 'Try to break inputs, look for undefined behavior.', 
    createdDate: "10/11/2022", completionDate: "10/13/2022",
    type: "Dev", status: "Go"
  },

  { id: 5, name: 'Spend More Time Outside', 
    description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    createdDate: "4/12/2020", completionDate: "5/16/2023",
    type: "Personal", status: "Go"

  },

];


function employeeDashboard() {
  return (
    <div style={{ height: 450, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      experimentalFeatures={{ newEditingApi: true }}
      pageSize={10}
      rowsPerPageOptions={[6]}
      checkboxSelection
    />
      <Button variant="success" onClick={()=>1}>New</Button>

  </div>
  )
}

const duration = 300;

const defaultStyle = {
  transition: 'opacity ${duration}ms ease-in-out',
  opacity: 0.01,
}

const transitionStyles = {
  entering: {opacity: 1},
  entered: {opacity: 1},
  exiting: {opacity: 0},
  exited: {opacity: 0},
}


export default function Dashboard() {
  const [inProp, setInProp] = React.useState(false);
  const nodeRef = React.useRef(null);
  return (
    
    <div>
      <Navbar className="fs-4" expand="lg" style={{backgroundColor: '#005151'}}>
        <Container>

          <Navbar.Brand className="fw-bold fs-3 navbar-light" href="#home">
            <img className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <MDBSwitch onClick={() => setInProp(!inProp)}
              id='flexSwitchCheckDefault' label='Manager View' />
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {employeeDashboard()}
      <CSSTransition nodeRef={nodeRef} in={inProp} 
      timeout={200} classNames="my-node" unmountOnExit>
        <div ref={nodeRef}>
          <br/>
          <br/>
          {ManagerDashboard()}
        </div>
      </CSSTransition>
      
    </div>

  );
}

