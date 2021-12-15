import { useEffect, useState } from "react"
import AddOrder from "./AddOrder";
import ShowOrders from "./ShowOrders";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const ordersFromServ = await fetchOrders();
      setOrders(ordersFromServ);
    }
    getData()
  }, []);

  //Fetch data
  const fetchOrders = async () => {
    const res = await fetch('http://localhost:3000/order');
    const data = await res.json();
    return data;
  }

  //add new order
  const addOrder = async (order) => {
  
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
    setOrders([...orders, data]);
  }

  //delete order
  const deleteOrder = async(id)=> {
    await fetch(`http://localhost:3000/order/${id}`, {
      method: "DELETE"
    })
    setOrders(orders.filter(order=>order.id !== id))
  }

  //done order
  const endOrder = async (order) => {
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

  return (
    <div>
      <h1>Orders section</h1>
      <ShowOrders orders={orders} onDelete={deleteOrder} onDone={endOrder}/>
     
      <AddOrder onAdd={addOrder}/>
    </div>
  )
}

export default Orders
