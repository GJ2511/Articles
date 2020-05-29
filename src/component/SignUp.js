import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Field } from 'formik';

import ErrorList from './ErrorList';

function SignUp({ errors, touched, hasError, isSubmitting }) {
    return (
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signUp my-5 bg-light ">
                    <div className="card-header">
                        <h5 className="card-title text-center">Sign Up</h5>
                    </div>
                    <div className="card-body">
                        {Object.keys(hasError).length > 0 && <ErrorList errors={hasError} />}
                        <Form noValidate>
                            <div className="form-group">
                                <Field
                                    type="text"
                                    className="form-control rounded-pill"
                                    id="username"
                                    name="username"
                                    aria-describedby="usernameHelp"
                                    placeholder="User Name"
                                    autoFocus
                                />
                                {errors.username && touched.username && (
                                    <small className="form-text text-danger">{errors.username}</small>
                                )}
                            </div>
                            <div className="form-group">
                                <Field
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    name="email"
                                    placeholder="Email address"
                                />
                                {errors.email && touched.email && (
                                    <small className="form-text text-danger">{errors.email}</small>
                                )}
                            </div>
                            <div className="form-group">
                                <Field
                                    type="password"
                                    className="form-control rounded-pill"
                                    id="password"
                                    name="password"
                                    placeholder="Password "
                                />
                                {errors.password && touched.password && (
                                    <small className="form-text text-danger">{errors.password}</small>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block rounded-pill"
                                disabled={isSubmitting}
                            >
                                Sign Me Up
                            </button>
                        </Form>
                    </div>
                    <div className="card-footer">
                        Already have an account? <Link to="/signin"> Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignUp.propTypes = {
    errors: PropTypes.object,
    hasError: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    touched: PropTypes.object,
};

export default SignUp;
