//Hooks
import { useState, useEffect } from "react";
import axios from 'axios';

//Components
import NewItem from "./NewItem";
import EditItem from "./EditItem";

export default function List() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/items`)
      .then(function (res) {
        setItems([...res.data])
      })
  }, [])

  function deleteItem(id) {
    return axios.delete(`http://localhost:8001/items/delete/${id}`)
    .then(res => {
      setItems(items.filter(item => item.user_id !== id))
      console.log(`Console message: The item with id ${id} has been deleted`)
    })
  }


  return (
    <>
      <div className="tabletitle">
        List
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Password</td>
                    <td>Is Admin?</td>
                  </tr>
                  {items.map(item =>
                    <tr key={item.user_id}>
                      <td>{item.user_id}</td>
                      <td>{item.user_name}</td>
                      <td>{item.user_email}</td>
                      <td>{item.user_password}</td>
                      <td>{String(item.user_is_administrator)}</td>
                      <td>
                        <button className="button_delete"
                          onClick={() => deleteItem(item.user_id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <EditItem item={item} items={items} setItems={setItems}/>
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <NewItem items={items} setItems={setItems}/>
    </>
  )
}