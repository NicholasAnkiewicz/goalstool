import React, { useState } from 'react';
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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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
        startdate: '2020/01/05',
        completedate: '2021/01/05',
        title: 'Test Employee Dashboard Frontend',
        description: "Try to break inputs, look for undefined behavior.",
        status: "Done",
      },
      {
        id: 292,
        startdate: '2020/01/02',
        completedate: '2021/01/02',
        title: 'Spend More Time Outside',
        description: "Vitamin D, fresh air, exercise! Before it gets cold. ",
        status: "In-Progress",
      },
    ],
  };
}

function GoalDetailModal(props) {
  const [radioValue, setRadioValue] = useState('2');
  const radios = [
    { name: 'Not Started', value: '1' },
    { name: 'In-progress', value: '2' },
    { name: 'Done', value: '3' },
    { name: 'Missed', value: '4' },
  ];
  const variant = [
    'outline-info', 'outline-success', 'outline-secondary', 'outline-danger'
  ];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="goalDetailModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="goalDetailModal">
          Goal ID
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="goalDetailTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="goalDetailDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailCompletionDate">
            <Form.Label>Completion Date</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="goalDetailCreationDate">
            <Form.Label>Creation Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="12/34/5678"
              autoFocus
              readOnly
            />
          </Form.Group>
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
            controlId="goalDetailManagerComment"
          > 
            <Badge bg="danger" pill>!</Badge>
            <Form.Label>Manager Comment</Form.Label>
            <Form.Control as="textarea" rows={3} readOnly>
              Good job!
            </Form.Control>
            <Form.Text>Last edited on </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="goalDetailComment"
          >
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3}>
              I think so.
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" type="submit" onClick={() => null}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Row(props) {
  const { row } = props;
  const { setCurUser } = props;
  const { setCurRows } = props;
  const { setSelectedGoals } = props;
  const { setSelectedGoalIndex } = props;
  const { numOfCards } = props;
  const [open, setOpen] = React.useState(false);
//  const [modalShow, setModalShow] = React.useState(false);

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
            setCurRows(row.goals)
            setSelectedGoals(row.goals.slice(0,numOfCards))
            setSelectedGoalIndex(0)
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
                    <TableCell>Goal Title</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Completion Date</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goals.map((GoalsRow) => (
                    <TableRow key={GoalsRow.goaltitle}>
                      <TableCell component="th" scope="row">
                        <IconButton size="small" onClick={() => 1}>
                          {<ReviewsIcon color="primary"/>}
                        </IconButton>
                        {GoalsRow.title}
                      </TableCell>
                      <TableCell>
                        {GoalsRow.startdate} 
                      </TableCell>
                      <TableCell>
                        {GoalsRow.completedate}
                      </TableCell>
                      <TableCell>
                        {GoalsRow.description}
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
  setSelectedGoals: PropTypes.func.isRequired,
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

export default function ManagerDashboard(setCurUser, setCurRows, setSelectedGoals, setSelectedGoalIndex, numOfCards) {
  return (
    <box style={{width:"100%"}}>
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
            <TableCell sx={{width: 300}}>Name</TableCell>
            <TableCell sx={{width: 80}}>ID</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} 
              row={row} 
              setCurUser={setCurUser} setCurRows={setCurRows} 
              setSelectedGoals={setSelectedGoals} setSelectedGoalIndex={setSelectedGoalIndex}
              numOfCards={numOfCards}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </box>
  );
}
