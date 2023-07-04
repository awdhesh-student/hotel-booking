import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GetRooms from './GetRooms';
import Container from '@mui/material/Container';

function UserHome() {

   const navigate = useNavigate()
   const [user, setUser] = useState()

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

      getData();
   }, [navigate]);

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

         <Container style={{ width: '100%', display: "flex", flexWrap: "wrap", padding: '20px' }}>
            <GetRooms isUser={user} />
         </Container>


      </>
   )
}

export default UserHome
