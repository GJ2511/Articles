import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import ArticleForm from '../../component/ArticleForm';
import Loader from '../../component/Loader';
import { handleArticleFormValidation } from './helper.js';
import { createArticle } from './ducks';

const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
};

class CreateArticle extends Component {
    handleSubmit = (values) => {
        this.props.createArticle(values);
    };

    render() {
        const { error, loading, successMsg } = this.props;

        if (loading) {
            return <Loader />;
        }

        if (successMsg.length) {
            return (
                <div className="alert alert-primary" role="alert">
                    {successMsg}
                </div>
            );
        }

        return (
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
        );
    }
}

CreateArticle.propTypes = {
    createArticle: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    successMsg: PropTypes.string.isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
    error: articleReducer.error,
    loading: articleReducer.loading,
    successMsg: articleReducer.successMsg,
});

export default connect(mapStateToProps, { createArticle })(CreateArticle);
