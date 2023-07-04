import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import Header from './Header';

function SignUp() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: '',
    phone: '',
    userType: ""
  })

  const [title, setTitle] = useState('Select user')

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleTitle = (select) => {
    setTitle(select)
    setUser({ ...user, userType: select });
  }

  const submitData = async (e) => {
    e.preventDefault();
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.c_password === "" ||
      user.phone === "" ||
      user.userType === ""
    ) {
      alert('All fields need to be filled');
      return;
    }

    if (user.password !== user.c_password) {
      alert("Password does not match");
      setUser({
        name: "",
        email: "",
        password: "",
        c_password: "",
        phone: "",
        userType: ""
      });
      return;
    }
    const newUser = { ...user, userType: title };
    axios.post("http://localhost:8000/SignUp", newUser)
      .then((res) => {
        alert("record submitted")
        navigate('/login')

      })
      .catch((err) => {
        console.log(err)
      })

    setUser({
      name: "",
      email: "",
      password: "",
      c_password: "",
      phone: "",
      userType: ""
    });
  };



  return (
    <>
      <Header />
      <MDBContainer fluid className="p-3 my-5 h-custom">

        <MDBRow>

          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Login form illustration" />
          </MDBCol>

          <MDBCol col='4' md='4'>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Register for the Account</p>
            </div>

            <form onSubmit={submitData}>
              <MDBInput wrapperClass='mb-4' name='name' value={user.name} onChange={handleChange} label='Full Name' id='formControlLg' type='text' size="lg" />
              <MDBInput wrapperClass='mb-4' name='email' value={user.email} onChange={handleChange} label='Email Address' id='formControlLg' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4' name='password' value={user.password} onChange={handleChange} label='Password' id='formControlLg' type='password' size="lg" />
              <MDBInput wrapperClass='mb-4' name='c_password' value={user.c_password} onChange={handleChange} label='Confirm Password' id='formControlLg' type='password' size="lg" />
              <MDBInput wrapperClass='mb-4' name='phone' value={user.phone} onChange={handleChange} label='Enter Mobile no.' id='formControlLg' type='tel' size="lg" />


              <DropdownButton id="dropdown-basic-button" title={title}>
                <Dropdown.Item onClick={() => handleTitle("Admin")} href="#/action-1">Admin</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTitle("Ordinary")} href="#/action-2">Ordinary</Dropdown.Item>
              </DropdownButton>

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg'>Register</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Had an account? <Link to={'/login'} className="link-danger">Login</Link></p>
              </div>
            </form>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>
  );
}

export default SignUp;