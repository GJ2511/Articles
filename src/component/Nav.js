import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Nav({ isAuthenticated }) {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink className="nav-link" to="/" exact strict>
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
                <ul className="navbar-nav ml-auto">
                    {isAuthenticated ? (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signout">
                                Sign Out{' '}
                            </NavLink>
                        </li>
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
    isAuthenticated: PropTypes.bool,
};

export default Nav;
