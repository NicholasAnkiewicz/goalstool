import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'react-bootstrap/Image';
import icon from './icon2.png';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';

function createData(firstname, lastname, id, title) {
  return {
    firstname,
    lastname,
    id,
    title,
    //Sample Data
    goals: [
      {
        id: 235,
        createdate: '2020-01-05',
        completedate: '2021-01-05',
        name: 'Test Employee Dashboard Frontend',
        description: "Try to break inputs, look for undefined behavior.",
        type: "Dev",
        status: "Done",
      },
      {
        id: 292,
        createdate: '2020-01-02',
        completedate: '2021-01-02',
        name: 'Spend More Time Outside',
        description: "Vitamin D, fresh air, exercise! Before it gets cold. ",
        type: "Personal",
        status: "In-Progress",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const { setCurUser } = props;
  const { setCurRows } = props;
  const [open, setOpen] = React.useState(false);


  return (
    <React.Fragment>
      <TableRow >
        <TableCell style={{width: 20}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          
        </TableCell>
        <TableCell component="th" scope="row">
         
        <IconButton size="small" onClick={() => {
            setCurUser( {firstname: row.firstname, lastname: row.lastname, id: row.id, title: row.title } )
            setCurRows( row.goals)
          }}>
          {<PersonIcon color="primary"/>}
          <strong>{row.firstname + " " + row.lastname}  </strong>
        </IconButton>
        </TableCell>
        <TableCell >{row.id}</TableCell>
        <TableCell >{row.title}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Goals
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Goal Name</TableCell>
                    <TableCell>Creation Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goals.map((GoalsRow) => (
                    <TableRow key={GoalsRow.goalname}>
                      <TableCell component="th" scope="row">
                        <IconButton size="small" onClick={() => 1}>
                          {<ReviewsIcon color="primary"/>}
                        </IconButton>
                        {GoalsRow.name}
                      </TableCell>
                      <TableCell>
                        {GoalsRow.createdate} 
                      </TableCell>
                      <TableCell>{GoalsRow.description}</TableCell>
                      <TableCell>
                        {GoalsRow.type}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  setCurUser: PropTypes.func.isRequired,
  setCurRows: PropTypes.func.isRequired,
  row: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    
    goals: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        goalname: PropTypes.string.isRequired,
        createdate: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

//Sample Data
const rows = [
  createData('Jill', 'Johnson', 159, 'Engineer'),
  createData('Tim','Thompson', 237, 'Project Manager'),
  createData('Eclair','', 262, "Engineer"),
];

export default function ManagerDashboard(setCurUser, setCurRows) {
  return (
    <div style={{width:"100%"}}>
    <br/>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className="fw-bold fs-2" style={{color: '#005151'}} colSpan={2}>
              <Image height="50" src={icon}/>
              Your Employees
            </TableCell>
            </TableRow>
          <TableRow>
            <TableCell />
            <TableCell style={{width: '300px'}}>Name</TableCell>
            <TableCell style={{width: '80px'}}>ID</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} setCurUser={setCurUser} setCurRows={setCurRows}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
