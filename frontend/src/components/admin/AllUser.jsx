import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';

const GetBookings = () => {
   const [users, setUsers] = useState([])
   
   useEffect(() => {
      axios.get('http://localhost:8000/userhistory')
         .then(res => {
            setUsers(res.data);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   return (
      <div>
         <MDBTable striped>
            <MDBTableHead>
               <tr>
                  <th scope='col'>User ID</th>
                  <th scope='col'>User Name</th>
                  <th scope='col'>User Email</th>
                  <th scope='col'>Phone</th>
                  <th scope='col'>Type</th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {users.map((data, index) => {
                  return (
                     <tr key={index}>
                        <th scope='row'>{data._id}</th>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.userType}</td>
                     </tr>
                  )
               })}
            </MDBTableBody>
         </MDBTable>
         <p>There are {users.length} Users in the Hotel.</p>
      </div>
   )
}

export default GetBookings

