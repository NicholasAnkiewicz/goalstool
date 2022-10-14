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
import { useNavigate } from "react-router-dom";
import Pageview from '@mui/icons-material/Pageview';




function createData(name, id, title) {
  return {
    name,
    id,
    title,
    goals: [
      {
        createdate: '2020-01-05',
        goalname: 'Test Employee Dashboard Frontend',
        description: "Try to break inputs, look for undefined behavior.",
        type: "Dev"
      },
      {
        createdate: '2020-01-02',
        goalname: 'Spend More Time Outside',
        description: "Vitamin D, fresh air, exercise! Before it gets cold.",
        type: "Personal"
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();


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
          {row.name}
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
                    <TableCell>Creation Date</TableCell>
                    <TableCell>Goal Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.goals.map((GoalsRow) => (
                    <TableRow key={GoalsRow.createdate}>
                      <TableCell component="th" scope="row">
                        <IconButton size="small" onClick={() => navigate('/goalview')}>
                          {<Pageview color="warning"/>}
                        </IconButton>
                        {GoalsRow.createdate}
                      </TableCell>
                      <TableCell>{GoalsRow.goalname}</TableCell>
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
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    
    Goals: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.number.isRequired,
        goalname: PropTypes.string.isRequired,
        createdate: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('Jill Johnson', 159, 'Engineer', 24, 4.0, 3.99),
  createData('Tim Thompson', 237, 'Project Manager', 37, 4.3, 4.99),
  createData('Eclair', 262, "Engineer", 24, 6.0, 3.79),
];

export default function CollapsibleTable() {
  return (
    <div style={{width:"80%"}}>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{width: '200px'}}>Name</TableCell>
            <TableCell style={{width: '80px'}}>ID</TableCell>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
