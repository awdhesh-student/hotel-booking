import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';

const GetBookings = () => {
   const [bookings, setBookings] = useState([])
   
   useEffect(() => {
      axios.get('http://localhost:8000/bookinghistory')
         .then(res => {
            setBookings(res.data);
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
                  <th scope='col'>Booking ID</th>
                  <th scope='col'>Room Type</th>
                  <th scope='col'>From Date</th>
                  <th scope='col'>To Date</th>
                  <th scope='col'>Total Amount</th>
                  <th scope='col'>Customer Phone No.</th>
                  <th scope='col'>Status</th>
               </tr>
            </MDBTableHead>
            <MDBTableBody>
               {bookings.map((data, index) => {
                  return (
                     <tr key={index}>
                        <th scope='row'>{data._id}</th>
                        <td>{data.type}</td>
                        <td>{data.fromdate}</td>
                        <td>{data.todate}</td>
                        <td>{data.totalAmount}</td>
                        <td>{data.phone}</td>
                        <td>{data.status}</td>
                     </tr>
                  )
               })}
            </MDBTableBody>
         </MDBTable>
         <p>There are {bookings.length} bookings in your Hotel.</p>
      </div>
   )
}

export default GetBookings
