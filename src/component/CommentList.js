import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function CommentList({ comments }) {
    const getlist = () => {
        return comments.map((comment, index) => {
            return (
                <li className="media" key={index}>
                    <a href="#" className="float-left">
                        <img src={comment.author.image} alt="" className="rounded-circle" />
                    </a>
                    <div className="media-body">
                        <span className="text-muted float-right">
                            <small className="text-muted">
                                {moment(comment.updatedAt).format('MMMM, Do YYYY, hh:mm a')}
                            </small>
                        </span>
                        <strong className="text-success">@{comment.author.username}</strong>
                        <p>{comment.body}</p>
                    </div>
                </li>
            );
        });
    };

    return <ul className="media-list"> {getlist()}</ul>;
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentList;
