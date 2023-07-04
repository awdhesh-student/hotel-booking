import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
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
                     <Link className="nav-link" to={'/'}>Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to={'/login'}>Login</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link" to={'/signup'}>SignUp</Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Header;
