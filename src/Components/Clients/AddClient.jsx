import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useContext } from 'react';
import { ClientContext } from './ClientContext';

let validationSchema = yup.object().shape({
  email: yup.string().email('Podaj poprawny email').required('To pole jest wymagane'),
  name: yup.string().min(4, 'Musi być więcej niż 4 znaki').required('To pole jest wymagane'),
  surname: yup.string().min(5, 'Musi być dłuższe niż 5 znaków').required('To pole jest wymagane'),

})

const AddClient = ({onClose, oldData = ''}) => {
  const [clients, setClients] = useContext(ClientContext);

   const addClient = async (client) => {
    client.id = clients[clients.length - 1].id + 1;
    const res = await fetch('http://localhost:3000/clients', {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(client)
    })
    const data = await res.json();
    setClients(prevClients=>[...prevClients, data]);
  }
  
  const initalVals = {
    email: '',
    name: '',
    surname: ''
  };
  if (oldData !== '') {
    initalVals.email = oldData.email;
    initalVals.name = oldData.name;
    initalVals.surname = oldData.surname;
  }
  
  const formik = useFormik({
    initialValues: {
      email: initalVals.email,
      name: initalVals.name,
      surname: initalVals.surname
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const id = oldData.id;
      addClient(values, id);
      resetForm();
      onClose();
      
    }
  });

  return (
    <div className='new-client-form'>
     
      <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <TextField name='email' label='Email' variant='outlined' margin="normal" fullWidth onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} defaultValue={oldData ? oldData.email: null }/>
        
        <TextField name='name' label='Name' variant='outlined'  margin="normal" fullWidth onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} defaultValue={oldData ? oldData.name: null }/>
        <TextField name='surname' label='Surname' variant='outlined'  margin="normal" fullWidth onChange={formik.handleChange} error={formik.touched.surname && Boolean(formik.errors.surname)} helperText={formik.touched.surname && formik.errors.surname} defaultValue={oldData ? oldData.surname: null }/>
        <Button variant="contained" fullWidth  type='submit'>Save</Button>
      </form>
    </div>
  )
}

export default AddClient
