import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
   MDBTabs,
   MDBTabsItem,
   MDBTabsLink,
   MDBTabsContent,
   MDBTabsPane
} from 'mdb-react-ui-kit';
import GetBookings from './GetBookings';
import { Container } from 'react-bootstrap';
import AllRooms from './AllRooms';
import AddRoom from './AddRoom'
import AllUser from './AllUser'


const AdminHome = () => {
   const [user, setUser] = useState()
   const [basicActive, setBasicActive] = useState('allbookings');


   const handleBasicClick = (val) => {
      if (val === basicActive) {
         return;
      }

      setBasicActive(val);
   };


   const navigate = useNavigate()
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
                        <Link className="nav-link" to={'/'} onClick={Logout}>Logout</Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
         <Container>
            <MDBTabs className='mb-3'>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('allbookings')} active={basicActive === 'allbookings'}>
                     All Bookings
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('allrooms')} active={basicActive === 'allrooms'}>
                     All Rooms
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('addroom')} active={basicActive === 'addroom'}>
                     Add Room
                  </MDBTabsLink>
               </MDBTabsItem>
               <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick('alluser')} active={basicActive === 'alluser'}>
                     All User
                  </MDBTabsLink>
               </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
               <MDBTabsPane show={basicActive === 'allbookings'}><GetBookings /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'allrooms'}><AllRooms /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'addroom'}><AddRoom /></MDBTabsPane>
               <MDBTabsPane show={basicActive === 'alluser'}><AllUser /></MDBTabsPane>
            </MDBTabsContent>
         </Container>
      </>
   )
}

export default AdminHome
