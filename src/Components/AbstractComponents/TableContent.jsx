import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const TableContent = ({ rows, columnNames, actions }) => {

  return (
     
      <Table  aria-label="simple table"  stickyHeader={true}>
        <TableHead>
          <TableRow>
            {columnNames.map((column,index) => (
              <TableCell align="center" key={index}>{column}</TableCell>
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
              {columnNames.map((column, index) => (
               <TableCell align="center" key={index}> {row[column]} </TableCell>
            ))}
              {actions && <TableCell align="center" key='actions'>
                <Stack direction="row" spacing={2} >
                  {actions.map((action, index) => {
                    if (action.depend === 'none') {
                      return   <Button variant="outlined" color={action.color} onClick={() => action.action(row)} key={index}>{action.name}</Button>
                    } else {
                      return (
                        row[action.depend] === 'to do' && <Button key={index} variant="outlined" color={action.color} onClick={() => action.action(row)}>{action.name}</Button>
                      )
                    }
                  })}
                </Stack>                  
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
  )
}

export default TableContent
