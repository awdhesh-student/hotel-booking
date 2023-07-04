import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';

const GetBookings = () => {
   const [rooms, setRooms] = useState([])
   
   useEffect(() => {
      axios.get('http://localhost:8000/roomhistory')
         .then(res => {
            setRooms(res.data);
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
                  <th scope='col'>Room ID</th>
                  <th scope='col'>Room Number</th>
                  <th scope='col'>Count</th>
                  <th scope='col'>Rent Per Day</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Description</th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {rooms.map((data, index) => {
                  return (
                     <tr key={index}>
                        <th scope='row'>{data._id}</th>
                        <td>{data.roomNumber}</td>
                        <td>{data.count}</td>
                        <td>{data.rent}</td>
                        <td>{data.type}</td>
                        <td>{data.description}</td>
                     </tr>
                  )
               })}
            </MDBTableBody>
         </MDBTable>
         <p>There are {rooms.length} rooms in your Hotel.</p>
      </div>
   )
}

export default GetBookings

