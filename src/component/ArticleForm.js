import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, useField } from 'formik';

import ErrorList from './ErrorList';

function TagFormInput(props) {
    const [field] = useField(props);

    if (field.value.tagList === undefined) {
        return null;
    }

    const handleKeyPress = (e) => {
        const value = e.target.value.trim();

        if ((e.charCode === 13 || e.keyCode === 13) && value.length) {
            if (field.value.tagList.indexOf(value) === -1) {
                props.setFieldValue('tagList', [...field.value.tagList, value]);
                e.target.value = '';
            }
            e.preventDefault();
        }
    };

    const handleTagRemoved = (val) => {
        props.setFieldValue(
            'tagList',
            field.value.tagList.filter((tag) => tag !== val)
        );
    };

    return (
        <>
            <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Enter tags"
                onKeyPress={handleKeyPress}
                name="tag"
            />
            <div className="row mt-1">
                <div className="col-md-12">
                    {field.value.tagList.map((val, index) => {
                        return (
                            <span className="badge badge-info ml-1" key={index} onClick={() => handleTagRemoved(val)}>
                                <svg
                                    className="bi bi-x hover-hand"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                                    />
                                </svg>
                                {val}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

TagFormInput.propTypes = {
    setFieldValue: PropTypes.func,
};

function ArticleForm({ errors, touched, hasError, isSubmitting, ...rest }) {
    return (
        <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 mx-auto mt-5">
                {Object.keys(hasError).length > 0 && <ErrorList errors={hasError} />}
                <Form noValidate>
                    <div className="form-group">
                        <Field
                            type="text"
                            className="form-control rounded-pill"
                            id="title"
                            name="title"
                            placeholder="Article Title"
                            autoFocus
                        />
                        {errors.title && touched.title && (
                            <small className="form-text text-danger">{errors.title}</small>
                        )}
                    </div>
                    <div className="form-group">
                        <Field
                            type="text"
                            className="form-control rounded-pill"
                            id="description"
                            name="description"
                            placeholder="What's this article about"
                            autoFocus
                        />
                        {errors.description && touched.description && (
                            <small className="form-text text-danger">{errors.description}</small>
                        )}
                    </div>
                    <div className="form-group">
                        <Field
                            as="textarea"
                            className="form-control rounded-pill"
                            id="body"
                            name="body"
                            placeholder="What's this article about"
                            autoFocus
                        />
                        {errors.body && touched.body && <small className="form-text text-danger">{errors.body}</small>}
                    </div>
                    <div className="form-group">
                        <TagFormInput {...rest} />
                    </div>
                    <div className="form-group offset-md-9">
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg btn-block rounded-pill "
                            disabled={isSubmitting}
                        >
                            Publish Article
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

ArticleForm.propTypes = {
    errors: PropTypes.object,
    hasError: PropTypes.object,
    isSubmitting: PropTypes.bool,
    touched: PropTypes.object,
};

export default ArticleForm;
