export const handleArticleFormValidation = (values) => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.description) {
        errors.description = 'Required';
    }

    if (!values.body) {
        errors.body = 'Required';
    }

    return errors;
};
