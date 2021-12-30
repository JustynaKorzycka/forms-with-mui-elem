import { useContext } from 'react';
import TableContent from '../AbstractComponents/TableContent'
import { OrderContext } from './OrderContext';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


const ShowOrders = ({onDone }) => {
  const [orders, setOrders] = useContext(OrderContext);
  const createData = (id, order_details, status) => {
    return { id, order_details, status };
  }

 //delete order
  const handleDelete = async(order)=> {
    await fetch(`http://localhost:3000/order/${order.id}`, {
      method: "DELETE"
    })
    setOrders(orders.filter(item=>item.id !== order.id))
  }

  //done order
  const handleOnDone = async (order) => {
    order.status = "done";
    await fetch(`http://localhost:3000/order/${order.id}`, {
      method: "PATCH",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(order)
    })

    setOrders(orders.map(item=>item.id !== order.id ? item : order))
  }

  const rows = orders.map(order => createData(order.id, order.order_details, order.status));
  const columnNames = ['id', 'order_details', 'status'];
  const actions = [{ name: 'Done', action: handleOnDone, color: 'success', depend: 'status' }, { name: 'Delete', action: handleDelete, color: 'error', depend: 'none' }];

  

  return (
     <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
      <TableContent rows={rows} columnNames={columnNames} actions={actions} />
      </TableContainer>
    
  )
}

export default ShowOrders
