/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import ArticleForm from '../../component/ArticleForm';
import Loader from '../../component/Loader';
import { handleArticleFormValidation } from './helper.js';
import { updateArticleRequest, reset, getArticleRequest } from './ducks';

class EditArticleContainer extends Component {
    componentDidMount() {
        const {
            match: {
                params: { slug },
            },
            getArticleRequest,
        } = this.props;

        getArticleRequest(slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    handleSubmit = ({ body, description, title, tagList }) => {
        const {
            match: {
                params: { slug },
            },
            updateArticleRequest,
        } = this.props;

        updateArticleRequest({ body, description, title, tagList }, slug);
    };

    render() {
        const { article, error, loading, successMsg } = this.props;

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
            <Formik
                initialValues={article}
                // eslint-disable-next-line react/jsx-handler-names
                validate={handleArticleFormValidation}
                validateOnBlur={true}
                validateOnChange={true}
                onSubmit={this.handleSubmit}
            >
                {(props) => <ArticleForm {...props} isSubmitting={loading} hasError={error} />}
            </Formik>
        );
    }
}

EditArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    getArticleRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    successMsg: PropTypes.string.isRequired,
    updateArticleRequest: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
    article: articleReducer.article,
    error: articleReducer.error,
    loading: articleReducer.loading,
    successMsg: articleReducer.successMsg,
});

export default connect(mapStateToProps, { updateArticleRequest, reset, getArticleRequest })(EditArticleContainer);
