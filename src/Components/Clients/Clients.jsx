import { useEffect, useContext } from "react"
import AddClient from "./AddClient";
import ShowClients from "./ShowClients";
import { ClientContext } from "./ClientContext";
import { useState } from "react";

const Clients = () => {

  const [clients, setClients] = useContext(ClientContext);
  const [loadStatus, setLoadStatus] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const clientsFromServ = await fetchClients();
      setClients(clientsFromServ);
      await setLoadStatus(false)
    }
    getData()
  }, []);

  //Fetch data
  const fetchClients = async () => {
    const res = await fetch('http://localhost:3000/clients');
    const data = await res.json();
    return data;
  } 

  return (
    <div>
      <h1>Clients section</h1>
      {loadStatus ? 'loading' : <ShowClients/>}
       <h2>Add new client!</h2>
      <AddClient/>
     
    </div>
  )
}

export default Clients
