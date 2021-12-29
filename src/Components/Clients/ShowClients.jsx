import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import EditClientModal from './EditClientModal';
import { ClientContext } from '../Clients/ClientContext';
import { useContext } from 'react';
import TableContent from '../AbstractComponents/TableContent';

const ShowClients = ({ onDelete, onEditClient }) => {
  const [clients, setClients] = useContext(ClientContext);
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


  const createData = (id, email, name, surname) => {
    return { id, email, name, surname};
  }

  const rows = clients.map(client => createData(client.id, client.email, client.name, client.surname));

  const columnNames = ['id', 'email', 'name', 'surname'];
  const actions = [
    {
      name: 'Edit',
      actions: handleClickOpen,
      color: 'success',
      depend: 'none'
    },
    {
      name: 'Delete',
      actions: onDelete,
      color: 'error',
      depend: 'none'
    },
  ]

  const modal = {
    open: open,
    onClose: handleClose,
    client: editClient,
    onEdit: onEditClient
  }

  return (
    <TableContent   rows={rows} columnNames={columnNames} actions={actions} modal={modal} />
    // <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
    //   <Table  aria-label="simple table"  stickyHeader={true}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">id</TableCell>
    //         <TableCell align="center">email</TableCell>
    //         <TableCell align="center">name</TableCell>
    //         <TableCell align="center">surname</TableCell>
    //         <TableCell align="center">actions</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow
    //           key={row.id}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell align="center">
    //             {row.id}
    //           </TableCell>
    //           <TableCell align="center">{row.email}</TableCell>
    //           <TableCell align="center">{row.name}</TableCell>
    //           <TableCell align="center">{row.surname}</TableCell>
    //           <TableCell align="center">
    //             <Stack direction="row" spacing={2}>
    //               <Button variant="outlined" color="success" onClick={()=>handleClickOpen(row)}>Edit</Button>
    //               <Button variant="outlined" color="error" onClick={() => onDelete(row.id)}>Delete</Button> 
                  
    //             </Stack>         
    //           </TableCell>

    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    //   <EditClientModal open={open} onClose={handleClose} client={editClient} onEdit={onEditClient}/>
    // </TableContainer>
    
  )
}

export default ShowClients
