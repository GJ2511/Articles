import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import SignIn from '../../component/SignIn';
import { signInRequested } from './ducks';

const initialValues = {
    email: '',
    password: '',
};

class SignInContainer extends Component {
    handleValidation = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length > 20 || values.password.trim().length < 8) {
            errors.password = 'Password must contain characters between 8 - 20';
        }

        return errors;
    };

    handleSubmit = (values) => {
        this.props.signInRequested(values);
    };

    render() {
        const { error, isSubmitting } = this.props;

        return (
            <Formik
                initialValues={initialValues}
                // eslint-disable-next-line react/jsx-handler-names
                validate={this.handleValidation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleSubmit}
            >
                {(props) => <SignIn {...props} isSubmitting={isSubmitting} hasError={error} />}
            </Formik>
        );
    }
}

SignInContainer.propTypes = {
    error: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    signInRequested: PropTypes.func.isRequired,
};

const mapStateToProps = ({ signInReducer }) => ({
    error: signInReducer.error,
    isSubmitting: signInReducer.isSubmitting,
});

export default connect(mapStateToProps, { signInRequested })(SignInContainer);
