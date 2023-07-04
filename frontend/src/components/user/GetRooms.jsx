import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Container } from 'react-bootstrap';
import { DatePicker, Select } from 'antd';
import moment from 'moment/moment';


const GetRooms = ({ isUser }) => {
   const { Option } = Select;
   const { RangePicker } = DatePicker;
   const [selectedRoom, setSelectedRoom] = useState(null);
   const [show, setShow] = useState(false);
   const [rooms, setRooms] = useState([]);
   const [type, setType] = useState('All')
   const [fromDate, setFromDate] = useState()
   const [toDate, setToDate] = useState()

   const handleClose = () => setShow(false);
   const handleShow = (room) => {
      setSelectedRoom(room);
      setShow(true);
   };

   const filterChange = (value) => {
      setType(value)
   };

   useEffect(() => {
      const fetchRooms = async () => {
         try {
            const response = await axios.get("http://localhost:8000/getRooms");
            setRooms(response.data);
         } catch (error) {
            console.log(error);
         }
      };

      fetchRooms();
   }, [type]);

   const filterDate = async (date) => {
      setFromDate(moment(date[0].format('DD-MM-YYYY'))._i);
      setToDate(moment(date[1].format('DD-MM-YYYY'))._i);
   };
   const filteredRooms = type === 'All' ? rooms : rooms.filter((room) => room.type === type);

   return (
      <>
         <Container>

            {isUser && (
               <div className="row">
                  <div className="col-md-3">
                     <RangePicker format={'DD-MM-YYYY'} onChange={filterDate} />
                  </div>
                  <div className="col-md-5">
                     <Select
                        value={type}
                        defaultValue="All"
                        style={{ width: 120 }}
                        onChange={filterChange}
                     >
                        <Option value="All">All</Option>
                        <Option value="Non-Delux">Non-Delux</Option>
                        <Option value="Delux">Delux</Option>
                     </Select>

                  </div>
               </div>
            )}
         </Container>

         {filteredRooms.map((room) => {
            return (
               <Card key={room.id} style={{ width: '30%', margin: '15px' }}>
                  <CardMedia
                     component="img"
                     height="140"
                     image={room.photos && room.photos.length > 0 ? room.photos[0] : ''}
                     alt='room'
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h4" component="div">
                        <h4>Room Type: {room.type}</h4>
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        <h6>Room Capacity: {room.count} People</h6>
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        <h6>Rent: {room.rent} per day</h6>
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        <h6>Type: {room.type}</h6>
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        <h6>Description: {room.description}</h6>
                     </Typography>
                  </CardContent>
                  <CardActions>
                     {(fromDate && toDate) && (
                        <Link to={`/bookingstatus/${room._id}/${fromDate}/${toDate}`}>
                           <Button variant="primary">Book Room</Button>
                        </Link>
                     )}
                     {!isUser && (
                        <Button variant="primary" onClick={() => handleShow(room)}>
                           Learn More
                        </Button>
                     )}
                  </CardActions>

               </Card>
            )
         })}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header>
               <Modal.Title>{selectedRoom && selectedRoom.type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {selectedRoom && selectedRoom.photos && selectedRoom.photos.length > 0 && (
                  <Carousel>
                     {selectedRoom.photos.map((url) => (
                        <Carousel.Item key={url}>
                           <img className="d-block w-100" src={url} alt="Room" />
                        </Carousel.Item>
                     ))}
                  </Carousel>
               )}
               {selectedRoom && (
                  <p>{selectedRoom.description}</p>
               )}
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default GetRooms;
