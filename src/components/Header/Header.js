import React, { useContext } from 'react';
import logo from '../../images/logo.png'
import './header.css'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
const Header = () => {
    const [loggedInUser, setLoggedInUser]  = useContext(userContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                {loggedInUser.email && <button className ="signUp" onClick={()=>setLoggedInUser({})}>Sign Out</button> }
            </nav>

        </div>
    );
};

export default Header;