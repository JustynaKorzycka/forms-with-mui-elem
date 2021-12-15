import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddClient from './AddClient';


const EditClientModal = ({open, onClose, client, onEdit}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {client.name} {client.surname}</DialogTitle>
      <DialogContent>
        <AddClient onAdd={onEdit} oldData={client} onClose={onClose}/>
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>
  )
}

export default EditClientModal
