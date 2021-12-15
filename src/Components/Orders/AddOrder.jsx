import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Formik, useFormik } from 'formik';
import * as yup from "yup";

let validationSchema = yup.object().shape({
  order_details: yup.string().min(7, 'Musi być dłuższe niż 7 znaków').required('To pole jest wymagane'),

})

const AddOrder = ({ onAdd }) => {
  
  const formik = useFormik({
    initialValues: {
      order_details: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      onAdd(values);
        
    }
  });

  return (
    <div className='new-client-form'>
      <h1>Add new order!</h1>
      <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e)}}>
        <TextField name='order_details' label='Order details' variant='outlined' margin="normal" fullWidth onChange={formik.handleChange}
          error={formik.touched.order_details && Boolean(formik.errors.order_details)} helperText={formik.touched.order_details && formik.errors.order_details} />
        
        <Button variant="contained" fullWidth  type='submit'>Save</Button>
      </form>
    </div>
  )
}


export default AddOrder
