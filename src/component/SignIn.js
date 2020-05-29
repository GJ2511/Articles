import React from 'react';
import { Link } from 'react-router-dom';

function SignIn() {
    return (
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5 bg-light ">
                    <div className="card-header">
                        <h5 className="card-title text-center">Sign In</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control rounded-pill"
                                    id="password"
                                    placeholder="Password "
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block rounded-pill">
                                Login
                            </button>
                        </form>
                    </div>
                    <div className="card-footer">
                        Do not have an account? <Link to="/signup"> Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
