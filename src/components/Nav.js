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
                        <form className="d-flex nav-search">
                            <div className="input-group">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-secondary" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                </button>
                            </div>
                        </form>
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

