import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Invoice(props) {
  const {booking} = props
  return (
    <MDBContainer className="py-5">
      <MDBCard>
        <MDBCardBody className="mx-4">
          <MDBContainer>
            <p className="my-5 text-center" style={{ fontSize: "30px" }}>
              <h1>RoomsForUse </h1><br />
              Thank for Booking the Room
              
            </p>
            <MDBRow>
              <MDBTypography listUnStyled>
                <li className="text-black">Name: {booking.username}</li>
                <li className="text-muted mt-1">
                  <span className="text-black">Invoice ID: #{booking._id}</span> 
                </li>
                <li className="text-muted mt-1">
                  <span className="text-black">From Date: {booking.fromdate}</span> 
                </li>
                <li className="text-muted mt-1">
                  <span className="text-black">To Date: {booking.todate}</span> 
                </li>
                <li className="text-muted mt-1">
                  <span className="text-black">Phone: {booking.phone}</span> 
                </li>
                <li className="text-muted mt-1">
                  <span className="text-black">Status: {booking.status}</span> 
                </li>
                
              </MDBTypography>
              <hr />
              <MDBCol xl="10">
                <p>Total days</p>
              </MDBCol>
              <MDBCol xl="2">
                <p className="float-end">{booking.totaldays}</p>
              </MDBCol>
              <hr />
            </MDBRow>
            <MDBRow>
              <MDBCol xl="10">
                <p>Total Amount</p>
              </MDBCol>
              <MDBCol xl="2">
                <p className="float-end">Rs.{booking.totalAmount}</p>
              </MDBCol>
              <hr />
            </MDBRow>
            <MDBRow>
              <hr style={{ border: "2px solid black" }} />
            </MDBRow>
            <MDBRow className="text-black">
              <MDBCol xl="12">
                <p className="float-end fw-bold">Total: Rs.{booking.totalAmount}</p>
              </MDBCol>
              <hr style={{ border: "2px solid black" }} />
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}