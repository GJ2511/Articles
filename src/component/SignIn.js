import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Field } from 'formik';

import ErrorList from './ErrorList';

function SignIn({ errors, touched, hasError, isSubmitting }) {
    return (
        <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5 bg-light ">
                    <div className="card-header">
                        <h5 className="card-title text-center">Sign In</h5>
                    </div>
                    <div className="card-body">
                        {Object.keys(hasError).length > 0 && <ErrorList errors={hasError} />}
                        <Form noValidate>
                            <div className="form-group">
                                <Field
                                    type="email"
                                    className="form-control rounded-pill"
                                    id="email"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Email address"
                                    autoFocus
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
                                Login
                            </button>
                        </Form>
                    </div>
                    <div className="card-footer">
                        Do not have an account? <Link to="/signup"> Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignIn.propTypes = {
    errors: PropTypes.object,
    hasError: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    touched: PropTypes.object,
};

export default SignIn;
