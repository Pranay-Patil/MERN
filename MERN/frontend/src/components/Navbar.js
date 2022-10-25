import React from 'react'
import { NavLink,useNavigate,Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsBookmarkHeart } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { useGlobalContext } from '../context'
import jwtDecode from 'jwt-decode'
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const  Navbar = () => {

    const navigate = useNavigate()
    const { userRole } = useGlobalContext()
    let name;
    let decodetoken;
    let token = localStorage.getItem("login_user");
    if (token) {
        decodetoken = jwtDecode(token);
        name = decodetoken.name;
        var avatar = name.slice(0,1)
    }

    function logout() {
        localStorage.removeItem("login_user");
        // navigate('/')

        toast.success('Logout Successfully', {
            position: "top-right",
        });
        setTimeout(() => {
            navigate("/");
        }, 2000);
    } 
    

    
    return (
        <div className="nav-container">
            <div className="logo"><h2>ShopForHome</h2></div>
            <nav className='row'>
                <div className="nav-items col">
                    <p><NavLink to='/' className="NavLink">Home</NavLink></p>
                    <p><NavLink to='about' className="NavLink">About</NavLink></p>
                    <p><NavLink to='products' className="NavLink">Products</NavLink></p>
                    {decodetoken && decodetoken.user_type === 'admin' ? <p><NavLink to='userlist' className="NavLink">Users</NavLink></p> : <></>}
                    {decodetoken && decodetoken.user_type === 'admin' ? <p><NavLink to='sales' className="NavLink">Sales</NavLink></p> : <></>}
                    {decodetoken && decodetoken.user_type === 'admin' ? <p><NavLink to='stocks' className="NavLink">Stocks</NavLink></p> : <></>}
                </div>
                <ul className='col'>
                    <li className="item">
                    {decodetoken && decodetoken.user_type === 'user' ?<NavLink to='wishlist' className="NavLink"><BsBookmarkHeart className='icons'/></NavLink>: <></>}

                    </li>
                    <li className="item">
                    {decodetoken && decodetoken.user_type === 'user' ?<NavLink to='cart' className="NavLink">
                            {/* <Badge badgeContent={4} color="primary">
                            </Badge> */}
                                <GrCart className='icons cart-icon'/>
                        </NavLink>: <></>}

                    </li>
                    <li className="item">
                            <div className="dropdown">
                            <div className="dropdown-toggle"  role="button" data-bs-toggle="dropdown">
                                {token ? 
                                <Avatar
                                        sx={{ bgcolor: '#FF0063' }}
                                        className='avatar'
                                        >
                                        {avatar}
                                </Avatar>: <CgProfile className='icons'/>}
                            </div>

                            <ul className="dropdown-menu">
                                { token ? <>
                                <li><a  className="dropdown-item" >{name}</a></li>
                                <li><a onClick={logout} className="dropdown-item">Logout</a></li>
                                </>    :   
                                <>
                                <li><a to='signup' className="dropdown-item" onClick={()=>navigate('signup')} >Signup</a></li>
                                <li><a to='login' className="dropdown-item" onClick={()=>navigate('login')} >Login</a></li>
                                </>                             

                                }

                                {/* <li><a className="dropdown-item" >others</a></li> */}
                            </ul>
                            </div>
                    </li>
                </ul>
            </nav>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </div>
    )
}

export default Navbar;