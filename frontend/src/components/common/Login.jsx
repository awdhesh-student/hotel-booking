import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/login", user)
      .then((res) => {
        alert("Successfully logged in");
        localStorage.setItem("user", JSON.stringify(res.data));
        const isLoggedIn = JSON.parse(localStorage.getItem("user"));
        const { userType } = isLoggedIn
        switch (userType) {
          case "Admin":
            navigate("/adminHome")
            break;
          case "Ordinary":
            navigate("/userhome")
            break;

          default:
            navigate("/Login")
            break;
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("User doesn`t exists");
        }
        navigate("/Login");
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
              <p className="text-center fw-bold mx-3 mb-0">Login for the Account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' name='email' value={user.email} onChange={handleChange} label='Email address' id='formControlLg' type='email' size="lg" />
              <MDBInput wrapperClass='mb-4' name='password' value={user.password} onChange={handleChange} label='Password' id='formControlLg' type='password' size="lg" />

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to={'/signup'} className="link-danger">Register</Link></p>
              </div>
            </form>

          </MDBCol>

        </MDBRow>

      </MDBContainer>
    </>

  );
}

export default App;