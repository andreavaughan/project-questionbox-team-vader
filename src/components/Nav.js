import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/nav.css'

export const Nav = ({ token, clearStorage, username }) => {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <div className="main-nav">
                        <Link to="/">
                            <p className="navbar-brand">QBox</p>
                        </Link>
                        { token 
                            ? <ul className="navbar-nav">
                                <Link to="/profile">
                                    <li className="nav-item nav-link active">
                                        Profile
                                    </li>
                                </Link>
                            </ul>  
                            : null
                        }
                    </div>
                    <div className="end-nav">
                        { token 
                            ? <div className="loggedin">
                                <p>Hello, {username}!</p>
                                <button type="button" className="btn btn-outline-dark" onClick={() => clearStorage('token')} >Logout</button>
                            </div>
                            : <div>
                                <Link to="/register">
                                    <button type="button" className="btn btn-dark">Sign up</button>
                                </Link>
                                <Link to="/login">
                                    <button type="button" className="btn btn-light">Login</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}

