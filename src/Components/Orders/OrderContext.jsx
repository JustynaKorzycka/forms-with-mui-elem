import { createContext, useState } from "react";


export const OrderContext = createContext();

export const OrderProvider = (props) => {
  const [orders, setOrders] = useState([]);

  return (
    <OrderContext.Provider value={[orders, setOrders]}>
      {props.children}
    </OrderContext.Provider>
  )
}

