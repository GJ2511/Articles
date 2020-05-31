import React from 'react';
import { Link } from 'react-router-dom';

function AddNewBtn() {
    return (
        <Link to="/new/article" className="btn btn-primary rounded-pill mb-2">
            + Add New Article
        </Link>
    );
}

export default AddNewBtn;
