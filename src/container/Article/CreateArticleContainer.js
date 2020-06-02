import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import ArticleForm from '../../component/ArticleForm';
import Loader from '../../component/Loader';
import { handleArticleFormValidation } from './helper.js';
import { createArticle, reset } from './ducks';

const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
};

class CreateArticleContainer extends Component {
    handleSubmit = (values) => {
        this.props.createArticle(values);
    };

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { error, loading, successMsg } = this.props;

        if (loading) {
            return (
                <div className="mt-5">
                    <Loader />
                </div>
            );
        }

        if (successMsg.length) {
            return (
                <div className="alert alert-primary mt-5" role="alert">
                    {successMsg}
                </div>
            );
        }

        return (
            <div className="container container-fluid">
                <Formik
                    initialValues={initialValues}
                    // eslint-disable-next-line react/jsx-handler-names
                    validate={handleArticleFormValidation}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={this.handleSubmit}
                >
                    {(props) => <ArticleForm {...props} hasError={error} />}
                </Formik>
            </div>
        );
    }
}

CreateArticleContainer.propTypes = {
    createArticle: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    successMsg: PropTypes.string.isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
    error: articleReducer.error,
    loading: articleReducer.loading,
    successMsg: articleReducer.successMsg,
});

export default connect(mapStateToProps, { createArticle, reset })(CreateArticleContainer);
