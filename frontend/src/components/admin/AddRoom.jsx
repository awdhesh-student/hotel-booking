import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';

function AddRoom() {
  const [room, setRoom] = useState({
    roomNumber: '',
    count: '',
    rent: '',
    type: '',
    photos: [],
    description: ''
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const fileArray = [...files];
      setRoom({ ...room, [name]: fileArray });
    } else if (name === 'type') {
      setRoom({ ...room, type: value });
    } else {
      setRoom({ ...room, [name]: value });
    }
  };





  const submitRoom = async () => {
    const newRoom = {
      roomNumber: room.roomNumber,
      count: room.count,
      rent: room.rent,
      type: room.type,
      photos: [room.img1, room.img2, room.img3],
      description: room.description

    }
    console.log(newRoom)
    try {
      const response = await axios.post('http://localhost:8000/addroom', newRoom)
      console.log(response)
      alert("Successfully added the Room")
    } catch (error) {
      console.log(error.response.data['non_field_errors']) 
    }
      

      
    
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form className='mb-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }} validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Room Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Room Number"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Max. Capicity</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="no. of peoples"
            name="count"
            value={room.count}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Room Rent</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="rent per day"
            name="rent"
            value={room.rent}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='my-4' as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Room Photos</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="img1 url"
            name="img1"
            value={room.img1}
            onChange={handleChange}
          />
          <Form.Control
            required
            type="text"
            placeholder="img2 url"
            name="img2"
            value={room.img2}
            onChange={handleChange}
            
          />
          <Form.Control
            required
            type="text"
            placeholder="img3 url"
            name="img3"
            value={room.img3}
            onChange={handleChange}
          />

        </Form.Group>
        <FormControl className='my-4' as={Col} md="4" >
          <Form.Label id="type">Room Type</Form.Label>
          <RadioGroup
            row
            aria-labelledby="type"
            name="type"
            value={room.type}
            onChange={handleChange}
          >
            <FormControlLabel value="Delux" control={<Radio />} label="Delux" />
            <FormControlLabel value="Non-Delux" control={<Radio />} label="Non-Delux" />
          </RadioGroup>
        </FormControl>
        <Form.Group className='my-4' as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Room Description </Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              style={{ height: '100px' }}
              name="description"
              value={room.description}
              onChange={handleChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>
      <div className='text-center text-md-start mt-4 pt-2'>
        <MDBBtn onClick={submitRoom} className="mb-0 px-5" size='lg'>Register</MDBBtn>
      </div>
    </Form>
  );
}

export default AddRoom;