import React from 'react';

function SignUp() {
    return (
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signUp my-5 bg-light ">
                    <div className="card-body">
                        <h5 className="card-title text-center">Sign Up</h5>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control rounded-pill"
                                    id="username"
                                    aria-describedby="usernameHelp"
                                    placeholder="User Name"
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address"
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
                                Sign Me Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
