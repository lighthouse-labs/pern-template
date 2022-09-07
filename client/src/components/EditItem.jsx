//Hooks
import { useState } from "react"

//Libraries
import axios from 'axios';

export default function EditItem({ item, items, setItems }) {

  const [user_name, setUserName] = useState(item.user_name);
  const [user_email, setUserEmail] = useState(item.user_email);
  const [user_password, setUserPassword] = useState(item.user_password);
  const [user_is_administrator, setUserIsAdministrator] = useState(item.user_is_administrator);

  const editItem = async () => {

    try {
      const body = { user_name, user_email, user_password, user_is_administrator };
      const response = await fetch(`http://localhost:8001/items/edit/${item.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      axios.get(`http://localhost:8001/items/`)
        .then(function (res) {
          setItems([...res.data])
        })
    } catch (err) {
      console.error(err.message)
    }
  }


  return (
    <div>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user_name}
        onChange={e => setUserName(e.target.value)}
      ></input>

      <label>Email</label>
      <input
        type="text"
        name="name"
        value={user_email}
        onChange={e => setUserEmail(e.target.value)}
      ></input>

      <label>Password</label>
      <input
        type="text"
        name="name"
        value={user_password}
        onChange={e => setUserPassword(e.target.value)}
      ></input>

      <label>Is administrator?</label>
      <input
        type="text"
        name="name"
        value={user_is_administrator}
        onChange={e => setUserIsAdministrator(e.target.value)}
      ></input>

      <button
        type="Submit"
        onClick={e => editItem(e)}
      >
        Edit item
      </button>
    </div>
  )
}