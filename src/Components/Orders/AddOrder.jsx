import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  useFormik } from 'formik';
import * as yup from "yup";
import { OrderContext } from './OrderContext';
import { useContext } from 'react';

let validationSchema = yup.object().shape({
  order_details: yup.string().min(7, 'Musi być dłuższe niż 7 znaków').required('To pole jest wymagane'),

})

const AddOrder = () => {
  
  const [orders, setOrders] = useContext(OrderContext);

  
  //add new order
  const handleAdd = async (order) => {
  
    order.id = orders[orders.length - 1].id + 1;
    order.status = 'to do';
    const res = await fetch('http://localhost:3000/order', {
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(order)
    })
    const data = await res.json();
    setOrders(prevOrders =>[...prevOrders, data]);
  }


  const formik = useFormik({
    initialValues: {
      order_details: '',

    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      handleAdd(values);
        
    }
  });

  return (
    <div className='new-client-form'>
      <h1>Add new order!</h1>
      <form onSubmit={(e) => { formik.handleSubmit(e)}}>
        <TextField name='order_details' label='Order details' variant='outlined' margin="normal" fullWidth onChange={formik.handleChange}
          error={formik.touched.order_details && Boolean(formik.errors.order_details)} helperText={formik.touched.order_details && formik.errors.order_details} />
        
        <Button variant="contained" fullWidth  type='submit'>Save</Button>
      </form>
    </div>
  )
}


export default AddOrder
