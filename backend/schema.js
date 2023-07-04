const mongoose = require("mongoose");

/////////////////user///////////////////////////////
const userSchema = mongoose.Schema({
  name: { type: String, required: 'Name is require' },
  email: { type: String, required: 'Email is require' },
  password: { type: String, required: 'Password is require' },
  c_password:{type: String, required: 'Confirm Password is require'},
  phone: { type: Number, required: 'Phone is require' }, 
  userType: { type: String, required: 'UserType is require' },
},
{
  timestamps: true,
});

const userModel = mongoose.model("users", userSchema);

const roomSchema = mongoose.Schema({
  roomNumber: {
    type :Number,
    required: true
  },
  count:{
    type: Number,
    required: true
  },
  rent: {
    type: Number,
    required: true
  },
  type: {
    type :String ,
    required: true
  },
  photos: [],
  description: {
    type: String,
    required: true
  },
  currentbooking: []
})
const roomModel = mongoose.model("rooms", roomSchema);

const bookingSchema = mongoose.Schema({
  roomid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fromdate: {
    type: String,
    required: true,
  },
  todate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totaldays: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  cardDetails: {
    cardholdername: {
      type: String,
      required: true,
    },
    cardnumber: {
      type: String,
      required: true,
    },
    cvvcode: {
      type: String,
      required: true,
    },
    expmonthyear: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    default:'booked'
  }
},{
  timestamps :true
}

);

const bookingsModel = mongoose.model('bookingschemas', bookingSchema)
module.exports = {
  userModel,
  roomModel,
  bookingsModel,
}