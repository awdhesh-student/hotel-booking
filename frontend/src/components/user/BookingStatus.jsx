import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import axios from 'axios';
import moment from 'moment';

import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBCol,
   MDBInput,
   MDBRow,
   MDBTypography,
} from "mdb-react-ui-kit";

const BookingStatus = () => {
   const navigate = useNavigate()
   const [user, setUser] = useState()
   const [phone, setPhone] = useState()
   const [room, setRoom] = useState();
   const [cardDetails, setCardDetails] = useState({
      cardholdername: '',
      cardnumber: '',
      cvvcode: '',
      expmonthyear: '',
   })
   const { roomid, fromdate, todate } = useParams();

   const totaldays = moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'), 'days') + 1;

   const handleChange = (e) => {
      setCardDetails({ ...cardDetails, [e.target.name]: e.target.value })
   }

   useEffect(() => {
      const getData = async () => {
         try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
               const { name, phone } = user;
               setUser(name)
               setPhone(phone)
            } else {
               navigate('/');
            }
         } catch (error) {
            console.log(error);
         }
      };

      getData();
   }, [navigate]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`http://localhost:8000/book/${roomid}`);
            setRoom(response.data)
         } catch (error) {
            alert(`Error ${error}`);
         }
      };

      fetchData();
   }, [roomid]);

   const Logout = () => {
      localStorage.removeItem('user');
      navigate('/login');
   };

   const handlePayment = async () => {
      const bookingDetails = {
         roomid,
         type: room.type,
         userid: JSON.parse(localStorage.getItem('user'))._id,
         username: JSON.parse(localStorage.getItem('user')).name,
         fromdate,
         todate,
         totalAmount: (totaldays * room.rent),
         totaldays,
         phone: JSON.parse(localStorage.getItem('user')).phone,
         cardDetails:{
            cardholdername: cardDetails.cardholdername,
            cardnumber: cardDetails.cardnumber,
            cvvcode: cardDetails.cvvcode,
            expmonthyear: cardDetails.expmonthyear,
         }
      }

      console.log(bookingDetails)


      await axios.post('http://localhost:8000/getpayment', bookingDetails)
         .then((res) => {
            alert('Room Booked')
            navigate('/bookinghistory')
         })
         .catch((err) => {
            console.log("Error in payment", err);
         })
      setCardDetails({
         cardholdername: '',
         cardnumber:'',
         cvvcode:'',
         expmonthyear:''       
      })

   }

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
                        <p className="nav-link">Hi {user}</p>
                     </li>
                     <li className="nav-item">
                        <Link to={'/bookinghistory'} className="nav-link">My Bookings</Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={Logout}>Logout</Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         <Container>
            {room && (
               <div className='row room-details m-5'>
                  <div className="col-md-3">
                     <h2>Room Type: {room.type}</h2>
                     <img style={{ width: '100%' }} src={room.photos[0]} alt="" />
                  </div>
                  <div className="col-md-4 mx-5">
                     <h3>Booking Details</h3>
                     <hr className="w-100" />
                     <b>
                        <p>Name: {user}</p>
                        <p>From Date: {fromdate}</p>
                        <p>To Date: {todate}</p>
                        <p>Max. Count: {room.count}</p>
                        <p>Phone: {phone}</p>
                     </b>
                     <div className="pt-4">
                        <h3>Amount Details</h3>
                        <hr className="w-100" />
                        <b>
                           <p>Amount per day: {room.rent}</p>
                           <p>Total Days: {totaldays}</p>
                           <p>Total Amount: {totaldays * room.rent}</p>
                        </b>
                     </div>

                     {/* <div className="">
                        <button className="btn btn-primary" onClick={handlePayment}>Pay Now</button>
                     </div> */}
                  </div>
                  <div className="col-md-4">
                     <MDBCard className="bg-secondary text-white rounded-3">
                        <MDBCardBody>
                           <div className="d-flex justify-content-center align-items-center mb-4">
                              <MDBTypography tag="h3" className="mb-0">
                                 Card details
                              </MDBTypography>
                           </div>

                           <p className="small">Card type we Accept</p>
                           <MDBCardImage className="me-2" width="45px"
                              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                              alt="Visa" />
                           <MDBCardImage className="me-2" width="45px"
                              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                              alt="American Express" />
                           <MDBCardImage className="me-2" width="45px"
                              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                              alt="Mastercard" />
                           <MDBCardImage className="me-2" width="45px"
                              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                              alt="PayPal acceptance mark" />

                           <form className="mt-4">
                              <MDBInput name='cardholdername' value={cardDetails.cardholdername} onChange={handleChange} className="mb-4" label="Cardholder's Name" type="text" size="lg"
                                 placeholder="Cardholder's Name" contrast />

                              <MDBInput name='cardnumber' value={cardDetails.cardnumber} onChange={handleChange} className="mb-4" label="Card Number" type="text" size="lg"
                                 minLength="19" maxLength="19" placeholder="1234 5678 9012 3457" contrast />

                              <MDBRow className="mb-4">
                                 <MDBCol md="6">
                                    <MDBInput name='expmonthyear' value={cardDetails.expmonthyear} onChange={handleChange} className="mb-4" label="Expiration" type="text" size="lg"
                                       minLength="7" maxLength="7" placeholder="MM/YYYY" contrast />
                                 </MDBCol>
                                 <MDBCol md="6">
                                    <MDBInput name='cvvcode' value={cardDetails.cvvcode} onChange={handleChange} className="mb-4" label="Cvv" type="text" size="lg" minLength="3"
                                       maxLength="3" placeholder="&#9679;&#9679;&#9679;" contrast />
                                 </MDBCol>
                              </MDBRow>
                           </form>

                           <hr />

                           <div className="d-flex justify-content-between">
                              <p className="mb-2">Total</p>
                              <p className="mb-2">Rs.{totaldays * room.rent}</p>
                           </div>

                           <MDBBtn onClick={handlePayment} style={{ color: 'white', float: 'right' }} outline className='mx-2' color='secondary'>
                              Pay
                           </MDBBtn>
                        </MDBCardBody>
                     </MDBCard>
                  </div>
               </div>
            )}

         </Container>
      </>
   );
}

export default BookingStatus;
