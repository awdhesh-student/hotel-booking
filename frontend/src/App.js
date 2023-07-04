import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import Home from "./components/common/Home";

import AdminHome from "./components/admin/AdminHome";
import UserHome from './components/user/UserHome';
import BookingStatus from "./components/user/BookingStatus";
import BookingHistory from "./components/user/BookingHistory";

function App() {
  const userLoggedIn = !!localStorage.getItem("user");

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            {userLoggedIn ? (
              <>
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/userHome" element={<UserHome />} />
                <Route
                  path="/bookingstatus/:roomid/:fromdate/:todate"
                  element={<BookingStatus />}
                />
                <Route path="/bookinghistory" element={<BookingHistory />} />
              </>
            ) : (
              <Route path="/login" element={<Login />} />
            )}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;




