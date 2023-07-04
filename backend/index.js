const express = require("express");
const moment = require("moment");
require("./config");

const cors = require("cors");
const { userModel, roomModel, bookingsModel } = require("./schema");
const app = express();

const PORT = 8000;

//middleware
app.use(express.json());
app.use(cors());

/**************registering user*******************/
app.post("/SignUp", async (req, res) => {
  const user = new userModel(req.body);
  try {
    const resultUser = await user.save();
    res.send(resultUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

/*************for login user**********************/
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User doesn`t exists" });
  }
  if (user.email === email && user.password === password) {
    res.json(user);
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

/*******************getting all rooms*******************************/

app.get("/getRooms", async (req, res) => {
  try {
    let allRooms = await roomModel.find({});
    res.send(allRooms);
  } catch (err) {
    res.status(500).send("Error in getting Rooms");
  }
});

/*******************getting room for booking*******************************/

app.get("/book/:roomid", async (req, res) => {
  const id = req.params.roomid;
  try {
    let bookedRoom = await roomModel.findOne({ _id: id });
    res.send(bookedRoom);
  } catch (err) {
    res.status(400).json({ message: "Error" });
  }
});

/*********************getting booked for room(payment_option)************/
app.post("/getpayment", async (req, res) => {
  const {
    roomid,
    type,
    userid,
    username,
    fromdate,
    todate,
    totalAmount,
    totaldays,
    phone,
    cardDetails,
  } = req.body;

  const { cardholdername, cardnumber, cvvcode, expmonthyear } = cardDetails;

  try {
    const bookingDetails = new bookingsModel({
      roomid,
      type,
      userid,
      username,
      fromdate: moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      todate: moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY"),
      totalAmount,
      totaldays,
      phone,
      cardDetails: {
        cardholdername,
        cardnumber,
        cvvcode,
        expmonthyear,
      },
    });

    const booking = await bookingDetails.save();

    const roomCurrentBooking = await roomModel.findOne({ _id: roomid });

    roomCurrentBooking.currentbooking.push({
      bookingid: booking._id,
      fromdate: moment(fromdate, "DD-MM-YYYY")._i,
      todate: moment(todate, "DD-MM-YYYY")._i,
      userid: userid,
      status: booking.status,
    });

    await roomCurrentBooking.save();

    return res.send("Room booked");
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
});

/********************booking history of an user*****************/
app.get("/bookinghistory/:id", async (req, res) => {
  const userId = req.params.id;
  let data = await bookingsModel.find({ userid: userId }).sort("-createdDate");
  if (!data) {
    return res.status(201).json({ message: "something went wrong" });
  } else {
    return res.status(200).json(data);
  }
});

/*******************canceling the booking***********************/
app.post("/cancelbooking", async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingItems = await bookingsModel.findById({ _id: bookingid });
    bookingItems.status = "cancelled";
    await bookingItems.save();

    const bookedRoom = await roomModel.findById({ _id: roomid });
    const bookings = bookedRoom.currentBooking;

    const temp = bookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    bookedRoom.currentBooking = temp;
    await bookedRoom.save();

    res.send("Booking cancelled ");
  } catch (err) {
    res.status(500).json("Something Went Wrong");
  }
});
/*********************all booking history**********************/
app.get("/bookinghistory", async (req, res) => {
  try {
    const allBookings = await bookingsModel.find({});
    res.send(allBookings);
  } catch (error) {
    res.status(400).json("No Bookings Found");
  }
});
/*********************room history**********************/
app.get("/roomhistory", async (req, res) => {
  try {
    const allRooms = await roomModel.find({});
    res.send(allRooms);
  } catch (error) {
    res.status(400).json("No Rooms Found");
  }
});

/*********************user history**********************/
app.get("/userhistory", async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    res.send(allUsers);
  } catch (error) {
    res.status(400).json("No Users Found");
  }
});
/*********************adding room**********************/
app.post('/addroom', async (req, res) => {
  

  try {
    const newRoom = new roomModel(req.body)

    const room = await newRoom.save();
    res.send(room);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});