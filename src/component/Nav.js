import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Nav({ isAuthenticated, signOutRequested }) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-info">
            <NavLink className="nav-link text-white" to="/" exact strict>
                Articles Demo Application
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarsExample02"
                aria-controls="navbarsExample02"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample02">
                <ul className="navbar-nav ml-auto text-white">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/new/article">
                                    Create New Article{' '}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <span href="#" className="nav-link" onClick={signOutRequested}>
                                    Sign Out{' '}
                                </span>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">
                                    Sign In{' '}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">
                                    Sign Up
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

Nav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    signOutRequested: PropTypes.func.isRequired,
};

export default Nav;
