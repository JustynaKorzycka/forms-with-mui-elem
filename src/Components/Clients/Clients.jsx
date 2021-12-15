import { useEffect, useState } from "react"
import AddClient from "./AddClient";
import ShowClients from "./ShowClients";


const Clients = () => {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const clientsFromServ = await fetchClients();
      setClients(clientsFromServ);
    }
    getData()
  }, []);

  //Fetch data
  const fetchClients = async () => {
    const res = await fetch('http://localhost:3000/clients');
    const data = await res.json();
    return data;
  }

  //add new client
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
    setClients([...clients, data]);
  }
  //edit client
  const editClient = async (client, id) => {
    client.id = id
    await fetch(`http://localhost:3000/clients/${id}`, {
    method: "PATCH",
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(client)
    })
    setClients(clients.map(item=>item.id !== id ? item : client))
  }



  //deleteclient
  const deleteClient = async (id) => {
    await fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE"
    })
    setClients(clients.filter(client=>client.id !== id))
  }
 

  return (
    <div>
      <h1>Clients section</h1>
      <ShowClients clients={clients} onDelete={deleteClient} onEditClient={editClient} />
       <h2>Add new client!</h2>
      <AddClient onAdd={addClient} />
     
    </div>
  )
}

export default Clients
