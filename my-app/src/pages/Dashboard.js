import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './ukglogo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const columns = [

  { field: 'id', 
    headerName: 'ID', 
    width: 100,
    description: "The goal's unique 'id'entifier, or ID"
  },

  { field: 'name', 
    headerName: 'Name', 
    width: 300,
    description: "What the goal is!"
  },

  { field: 'description', 
    headerName: 'Description', 
    width: 400,
    description: "More information about what the goal entails"
  },

  {
    field: 'type',
    headerName: 'Type',
    width: 200,
    description: 'What type of goal this is'
  },

  {
    field: 'created',
    description: 'The date of creation for the goal',
    headerName: 'Creation Date',
    type: 'date',
    width: 130,
  },

  {
    field: 'completionDate',
    description: "The predicted completion date for a goal",
    headerName: 'Completion Date',
    type: 'date',
    width: 155,
  },

  {
    field: 'editableField',
    description: "A placeholder in case we want this functionality",
    headerName: 'Editable Field',
    sortable: false,
    width: 350,
    editable: true,
  },

  {
    field: "moreInfo",
    headerName: "More Info",
    description: 'Click for Full Goal Information!',
    sortable: false,
    width: 125,
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
    created: "9/26/2021", completionDate: "10/27/2021",
    editableField: "this field can be editedd (try fixing the typo)",
  },

  {
    id: 62, name: 'Set Up New Laptops',
    description: 'Jane says that she\'d like a new XPS15, while Max is really itching for a Macbook. Can we get him an M2 chip for his development work?',
    created: "11/2/21", completionDate: "11/11/21",
    editableField: "this one too!",
  },

  { id: 3876, name: 'Create Killer Robots', 
    description: 'Pretty self explanatory, really.',
    created: "2/3/1989", completionDate: "1/1/2040",
    editableField: "even the one underneath, with no text!",
  },

  { id: 3877, name: 'Test Employee Dashboard Frontend', 
    description: 'Try to break inputs, look for undefined behavior.', 
    created: "10/11/2022", completionDate: "10/13/2022",
  },

  { id: 5, name: 'Spend More Time Outside', 
    description: 'Vitamin D, fresh air, exercise! Before it gets cold.', 
    created: "4/12/2020", completionDate: "5/16/2023"

  },

];


      

export default function dashboard() {
  return (

    <div>

      <Navbar className="fs-4" expand="lg" style={{backgroundColor: '#005151'}}>
        <Container>

          <Navbar.Brand className="fw-bold fs-3 navbar-light" href="#home">
            <img className="me-2 rounded mx-auto" src={logo} height="50" alt="Employee logo" />
            Employee Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="navbar-light" href="#home">Home</Nav.Link>
              <Nav.Link className="navbar-light" href="#link">Manager View</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          pageSize={10}
          rowsPerPageOptions={[6]}
          checkboxSelection
        />
      </div> 
    </div>

  );
}

