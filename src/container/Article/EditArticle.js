import React, { Component } from 'react';
import { Formik } from 'formik';

import ArticleForm from '../../component/ArticleForm';
import { handleArticleFormValidation } from './helper.js';

const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: ['test', 'guarav'],
};

class EditArticle extends Component {
    handleSubmit = (values) => {
        console.log(values);
    };

    render() {
        return (
            <Formik
                initialValues={initialValues}
                // eslint-disable-next-line react/jsx-handler-names
                validate={handleArticleFormValidation}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleSubmit}
            >
                {(props) => <ArticleForm {...props} isSubmitting={false} hasError={{}} />}
            </Formik>
        );
    }
}

export default EditArticle;
