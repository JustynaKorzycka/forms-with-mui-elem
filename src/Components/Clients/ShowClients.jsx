import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import EditClientModal from './EditClientModal';
import { ClientContext } from '../Clients/ClientContext';
import { useContext } from 'react';
import TableContent from '../AbstractComponents/TableContent';

const ShowClients = () => {
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

   //edit client
  const onEditClient = async (client, id) => {
    client.id = id
    await fetch(`http://localhost:3000/clients/${id}`, {
    method: "PATCH",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(client)
    })
    setClients(clients.map(item=>item.id !== id ? item : client))
  }

  //deleteclient
  const onDelete = async (row) => {
    await fetch(`http://localhost:3000/clients/${row.id}`, {
      method: "DELETE"
    })
    setClients(clients.filter(client=>client.id !== row.id))
  }

  const createData = (id, email, name, surname) => {
    return { id, email, name, surname};
  }

  const rows = clients.map(client => createData(client.id, client.email, client.name, client.surname));

  const columnNames = ['id', 'email', 'name', 'surname'];
  const actions = [
    {
      name: 'Edit',
      action: handleClickOpen,
      color: 'success',
      depend: 'none'
    },
    {
      name: 'Delete',
      action: onDelete,
      color: 'error',
      depend: 'none'
    },
  ]


  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
      <TableContent rows={rows} columnNames={columnNames} actions={actions} />
       <EditClientModal open={open} onClose={handleClose} client={editClient} onEdit={onEditClient}/>
    </TableContainer>
  )
}

export default ShowClients
