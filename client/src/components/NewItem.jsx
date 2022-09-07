import { useState } from "react";
import axios from 'axios';

export default function NewItem({ items, setItems }) {

  const [user_name, setUserName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [user_is_administrator, setUserIsAdministrator] = useState(false);

  function addItem(item) {
    console.log("Item added:", item)
    return axios.post(`http://localhost:8001/items`, item)
      .then((response) => {
        const newItem = response.data;
        setItems([newItem, ...items])
      })
  }

  function resetForm() {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
  }

  function onSubmitForm(e) {
    e.preventDefault();
    const item = {
      user_name,
      user_email,
      user_password,
      user_is_administrator
    }
    addItem(item);
    resetForm()
  }

  return (
    <>
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
        onClick={onSubmitForm}
      >
        Add an item
      </button>

    </>

  )




}