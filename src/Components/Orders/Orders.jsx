import { useContext, useEffect } from "react"
import AddOrder from "./AddOrder";
import ShowOrders from "./ShowOrders";
import { OrderContext } from "./OrderContext";

const Orders = () => {

  const [orders, setOrders] = useContext(OrderContext);

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

  return (
    <div>
      <h1>Orders section</h1>
        <ShowOrders/>
        <AddOrder />
    </div>
  )
}

export default Orders
