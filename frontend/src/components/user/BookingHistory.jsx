import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Container } from 'react-bootstrap';
import Invoice from './Invoice';

const BookingHistory = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState();
   const [bookings, setBookings] = useState([]);
   const [selectedBooking, setSelectedBooking] = useState(null);

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name } = user;
               setUser(name);
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      const getBookingHistory = async () => {
         const user = JSON.parse(localStorage.getItem('user'));
         const { _id } = user;
         axios
            .get(`http://localhost:8000/bookinghistory/${_id}`)
            .then((res) => {
               setBookings(res.data);
            })
            .catch((err) => {
               console.log(err);
            });
      };
      getData();
      getBookingHistory();
   }, [navigate]);

   const handleCancelBooking = async (bookingid, roomid) => {
      try {
         const result = await axios.post('http://localhost:8000/cancelbooking', {
            bookingid,
            roomid,
         });
         if (!result) {
            alert('Something went wrong');
         } else {
            console.log(result);
            window.location.reload();
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleBookingInvoice = (booking) => {
      setSelectedBooking(booking);
      
   };

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
               <button
                  className="navbar-toggler"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <i className="fa fa-bars"></i>
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <h1>RoomsForUse</h1>
               </div>
               <div className="d-flex align-items-center">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <p className="nav-link" to={'/login'}>
                           Hi {user}
                        </p>
                     </li>
                     <li className="nav-item">
                        <Link to={'/bookinghistory'} className="nav-link">
                           My Bookings
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={Logout}>
                           Logout
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>

         <Container style={{ marginBottom: '341px' }}>
            <h5 className="my-4">Your Booking History</h5>
            <MDBTable>
               <MDBTableHead light>
                  <tr>
                     <th scope="col">Room Type</th>
                     <th scope="col">From Date</th>
                     <th scope="col">To Date</th>
                     <th scope="col">Status</th>
                     <th scope="col">Date and Time of Booking</th>
                     <th scope="col">Cancel Booking</th>
                     <th scope="col">Invoice</th>
                  </tr>
               </MDBTableHead>
               <MDBTableBody>
                  {bookings.map((data, index) => {
                     return (
                        <tr key={index}>
                           <td>{data.type}</td>
                           <td>{data.fromdate}</td>
                           <td>{data.todate}</td>
                           <td>{data.status}</td>
                           <td>{data.createdAt}</td>
                           <td>
                              {data.status === 'cancelled' ? (
                                 <></>
                              ) : (
                                 <MDBBtn
                                    onClick={() => handleCancelBooking(data._id, data.roomid)}
                                    outline
                                    rounded
                                    className="mx-2"
                                    color="danger"
                                 >
                                    Cancel
                                 </MDBBtn>
                              )}
                           </td>
                           <td>
                              <MDBBtn
                                 onClick={() => handleBookingInvoice(data)}
                                 outline
                                 rounded
                                 className="mx-2"
                                 color="danger"
                              >
                                 Download
                              </MDBBtn>
                           </td>
                        </tr>
                     );
                  })}
               </MDBTableBody>
            </MDBTable>
            {selectedBooking && (
            <Invoice booking={selectedBooking} />
         )}
         </Container>

         
      </>
   );
};

export default BookingHistory;




// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
// import { Container } from 'react-bootstrap';
// import Invoice from './Invoice';

// const BookingHistory = () => {
//    const navigate = useNavigate()
//    const [user, setUser] = useState()
//    const [bookings, setBookings] = useState([])

//    useEffect(() => {
//       const getData = async () => {
//          try {
//             const user = JSON.parse(localStorage.getItem('user'));
//             if (user) {
//                const { name } = user;
//                setUser(name);
//             } else {
//                navigate('/');
//             }
//          } catch (error) {
//             console.log(error);
//          }
//       };

//       const getBookingHistory = async () => {
//          const user = JSON.parse(localStorage.getItem('user'));
//          const { _id } = user
//          axios.get(`http://localhost:8000/bookinghistory/${_id}`)
//             .then((res) => {
//                setBookings(res.data)
//             })
//             .catch((err) => {
//                console.log(err);
//             });
//       }
//       getData();
//       getBookingHistory()
//    }, [navigate]);

//    const handleCancelBooking = async(bookingid, roomid) =>{
//       try{
//          const result = await axios.post('http://localhost:8000/cancelbooking',{bookingid, roomid})
//          if(!result){
//             alert("Something went wrong")
//          }else{
//             console.log(result)
//             window.location.reload();
//          }
//       }
//       catch(error){
//          console.log(error)
//       }
//    }

//    const Logout = () => {
//       localStorage.removeItem('user');
//       navigate('/');
//    };

//    const handleBookingInvoice = ()=>{

//    }

//    return (
//       <>
//          <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                <button
//                   className="navbar-toggler"
//                   type="button"
//                   data-mdb-toggle="collapse"
//                   data-mdb-target="#navbarSupportedContent"
//                   aria-controls="navbarSupportedContent"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                >
//                   <i className="fa fa-bars"></i>
//                </button>


//                <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                   <h1>RoomsForUse</h1>
//                </div>
//                <div className="d-flex align-items-center">
//                   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                      <li className="nav-item">
//                         <p className="nav-link" to={'/login'}>Hi {user}</p>
//                      </li>
//                      <li className="nav-item">
//                         <Link to={'/bookinghistory'} className="nav-link">My Bookings</Link>
//                      </li>
//                      <li className="nav-item">
//                         <Link className="nav-link" to={'/'} onClick={Logout}>Logout</Link>
//                      </li>
//                   </ul>
//                </div>
//             </div>
//          </nav>

//          <Container style={{ marginBottom: '341px' }}>
//             <h5 className='my-4'>Your Booking History</h5>
//             <MDBTable>
//                <MDBTableHead light>
//                   <tr>
//                      <th scope='col'>Room Type</th>
//                      <th scope='col'>From Date</th>
//                      <th scope='col'>To Date</th>
//                      <th scope='col'>Status</th>
//                      <th scope='col'>Date and Time of Booking</th>
//                      <th scope='col'>Cancel Booking</th>
//                      <th scope='col'>Invoice</th>

//                   </tr>
//                </MDBTableHead>
//                <MDBTableBody>
//                   {bookings.map((data, index) => {
//                      return (
//                         <tr key={index}>
//                            <td>{data.type}</td>
//                            <td>{data.fromdate}</td>
//                            <td>{data.todate}</td>
//                            <td>{data.status}</td>
//                            <td>{data.createdAt}</td>
//                            <td>{data.status ==="cancelled" ? <></> : <MDBBtn onClick = {()=>handleCancelBooking(data._id, data.roomid)} outline rounded className='mx-2' color='danger'>
//                               Cancel
//                            </MDBBtn> }</td>
//                            <td><MDBBtn onClick = {()=>handleBookingInvoice()} outline rounded className='mx-2' color='danger'>
//                               Download
//                            </MDBBtn></td>
//                         </tr>
//                      )
//                   })}

//                </MDBTableBody>
//             </MDBTable>
//          </Container>

//       </>
//    )
// }

// export default BookingHistory
