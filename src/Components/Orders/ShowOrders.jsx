import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const ShowOrders = ({orders, onDelete, onDone }) => {
   const createData = (id, order_details, status) => {
    return { id, order_details, status };
  }

  const rows = orders.map(order => createData(order.id, order.order_details, order.status));

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
      <Table  aria-label="simple table"  stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell align="center">id</TableCell>
            <TableCell align="center">order detail</TableCell>
            <TableCell align="center">status</TableCell>
            <TableCell align="center">actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.order_details}</TableCell>
              <TableCell align="center">{row.status}</TableCell>

              <TableCell align="center">
                <Stack direction="row" spacing={2} >
                  {row.status === 'to do' && <Button variant="outlined" color="success" onClick={()=>onDone(row)}>Done</Button>}
                  <Button variant="outlined" color="error" onClick={() => onDelete(row.id)}>Delete</Button> 
                  
                </Stack>         
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  )
}

export default ShowOrders
