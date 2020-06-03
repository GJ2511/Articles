import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function CommentList({ comments, authenticated, handleDeleteComment, currentUser }) {
    const getlist = () => {
        return comments.map((comment, index) => {
            const showform = authenticated && comment.author.username === currentUser?.username;

            return (
                <li className="media border-light border-bottom p-1" key={index}>
                    <a href="#" className="float-left mr-1">
                        <img src={comment.author.image} style={{ height: '50px' }} alt="" className="rounded-circle" />
                    </a>
                    <div className="media-body">
                        <span className="text-muted float-right">
                            <small className="text-muted">
                                {moment(comment.updatedAt).format('MMMM, Do YYYY, hh:mm a')}
                            </small>
                        </span>
                        <strong className="text-success">@{comment.author.username}</strong>
                        <p>{comment.body}</p>
                        {showform && (
                            <span className="float-right hover-hand" onClick={() => handleDeleteComment(comment)}>
                                <svg
                                    className="bi bi-trash-fill"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                                    />
                                </svg>
                            </span>
                        )}
                    </div>
                </li>
            );
        });
    };

    return <ul className="media-list"> {getlist()}</ul>;
}

CommentList.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
