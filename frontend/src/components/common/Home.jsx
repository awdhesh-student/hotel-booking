import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Header from './Header';
import GetRooms from '../user/GetRooms';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../Images/p1.jpg'
import p2 from '../../Images/p2.jpg'
import p3 from '../../Images/p3.jpg'
import About from './About';

const Home = () => {

   const [index, setIndex] = useState(0);
   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };
   return (
      <>
         <Header />
         <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
               <img
                  className="d-block w-100"
                  src={p1}
                  alt="First slide"
               />
               <Carousel.Caption>
                  <h3>Luxirous Rooms</h3>
                  <p>lavish and indulgent experience for discerning guests</p>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <img
                  className="d-block w-100"
                  src={p2}
                  alt="Second slide"
               />

               <Carousel.Caption>
                  <h3>Fully Furnished Rooms</h3>
                  <p>Step into a beautifully designed room that is thoughtfully furnished to provide a cozy and welcoming atmosphere</p>
               </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
               <img
                  className="d-block w-100"
                  src={p3}
                  alt="Third slide"
               />

               <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
               </Carousel.Caption>
            </Carousel.Item>
         </Carousel>
         
         <div className="rooms">
            <h1 className='text-center'>About Us</h1>
            <Container style={{ width: '100%', display: "flex", flexWrap: "wrap", padding: '20px' }}>
               <About />
            </Container>
         </div>

         <div className="rooms">
            <h1 className='text-center'>Rooms to Stay</h1>
            <Container style={{ width: '100%', display: "flex", flexWrap: "wrap", padding: '20px' }}>
               <GetRooms isUser={false} />
            </Container>
         </div>

      </>
   )
}

export default Home
