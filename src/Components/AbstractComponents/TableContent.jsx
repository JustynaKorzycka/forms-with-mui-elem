import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditClientModal from '../Clients/EditClientModal';
import { useState } from 'react';


const TableContent = ({ rows, columnNames, actions, modal = false }) => {
  const [open, setOpen] = useState(false);
  const [editClient, setEditClient] = useState('');

  const handleClickOpen = (row) => {
    setOpen(true);
    setEditClient(row);
  };

  const handleClose = () => {
    setOpen(false);
    setEditClient('');
  };

  return (
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
      <Table  aria-label="simple table"  stickyHeader={true}>
        <TableHead>
          <TableRow>
            {columnNames.map(column => (
              <TableCell align="center">{column}</TableCell>
            ))}
            {actions && <TableCell align="center">actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row[columnNames[0]]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columnNames.map(column => (
               <TableCell align="center"> {row[column]} </TableCell>
            ))}
              {actions && <TableCell align="center">
                <Stack direction="row" spacing={2} >
                  {actions.map(action => {
                    if (action.depend === 'none') {
                      return   <Button variant="outlined" color={action.color} onClick={() => action.action(row)}>{action.name}</Button>
                    } else {
                      return (
                        row[action.depend] === 'to do' &&  <Button variant="outlined" color={action.color} onClick={() => action.action(row)}>{action.name}</Button>
                      )
                    }
                  })}
                </Stack>                  
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {modal && 
         <EditClientModal open={open} onClose={handleClose} client={editClient} onEdit={modal.onEditClient}/>
      }
    </TableContainer>
  )
}

export default TableContent
