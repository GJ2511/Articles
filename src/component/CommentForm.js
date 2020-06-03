import React from 'react';

function CommentForm() {
    return (
        <>
            <textarea className="form-control rounded-pill" placeholder="write a comment..." rows="3"></textarea>
            <br />
            <button type="button" className="btn btn-info float-right rounded-pill">
                Post
            </button>
        </>
    );
}

export default CommentForm;
