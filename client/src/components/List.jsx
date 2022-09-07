//Hooks
import { useState, useEffect } from "react";
import axios from 'axios';

export default function List() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/items`)
      .then(function (res) {
        setItems([...res.data])
      })
  }, [])


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
                    </tr>
                  )}

                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}