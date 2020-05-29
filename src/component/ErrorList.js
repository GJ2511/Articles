import React from 'react';
import PropTypes from 'prop-types';

const parseErrorContent = (errors) => {
    return Object.keys(errors).map((item, i) => {
        return (
            <li key={i}>
                <span>
                    {item} {errors[item][0]}
                </span>
            </li>
        );
    });
};

function ErrorList({ errors }) {
    return (
        <div className="alert alert-danger" role="alert">
            <ul>{parseErrorContent(errors)}</ul>
        </div>
    );
}

ErrorList.propTypes = {
    errors: PropTypes.object,
};

export default ErrorList;
