import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import headshot from './filler_headshot.jpg';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 130 },
  {
    field: 'created',
    headerName: 'Creation Date',
    type: 'date',
    width: 90,
  },

  { field: 'daysToCompletion',
    headerName: 'Days To Completion',
    type: 'date',
    width: 90,
  },

  {
    field: 'expiration',
    headerName: 'Due Date',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 160,
    valueGetter: (params) =>
      `${params.row.description || ''} ${params.row.name || ''}`,
  },
];

const rows = [
  { id: 1, name: 'Purchase New Coffee Machine', 
    description: 'Jon says Keurig is preferred!', 
    created: 35 },
  { id: 2, name: 'Set Up New Laptops', description: 'Cersei', age: 42 },
  { id: 3, name: 'Lannister', description: 'Jaime', age: 45 },
  { id: 4, name: 'Stark', description: 'Arya', age: 16 },
  { id: 5, name: 'Targaryen', description: 'Daenerys', age: null },
 
];

export default function DataTable() {
  return (
    <div>
      <p> Employee Dashboard
        <div>
          <img src={headshot} width="100" height="100" alt="Employee Headshot" />
        </div>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[6]}
            checkboxSelection
          />
        </div>
      </p>
    </div>
  );
}

