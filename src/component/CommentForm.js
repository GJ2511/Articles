import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentForm({ handleCommentSubmit, requesting }) {
    const [text, setText] = useState('');

    return (
        <>
            <textarea
                className="form-control rounded-pill"
                value={text}
                placeholder="write a comment..."
                rows="3"
                disabled={requesting}
                onChange={(evt) => setText(evt.target.value)}
            ></textarea>
            <br />
            <button
                type="button"
                className="btn btn-info float-right rounded-pill"
                onClick={() => {
                    handleCommentSubmit(text);
                    setText('');
                }}
                disabled={requesting || text.length === 0}
            >
                Post
            </button>
        </>
    );
}

CommentForm.propTypes = {
    handleCommentSubmit: PropTypes.func.isRequired,
    requesting: PropTypes.bool.isRequired,
};

export default CommentForm;
