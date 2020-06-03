import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../../component/Loader';
import CommentList from '../../component/CommentList';
import { getCommentsRequested, deleteCommentRequested } from './ducks';

class CommentContainer extends Component {
    componentDidMount() {
        const { slug, getCommentsRequested } = this.props;

        getCommentsRequested(slug);
    }

    onDeleteComment = (comment) => {
        const { deleteCommentRequested, slug } = this.props;

        deleteCommentRequested({ comment, slug });
    };

    render() {
        const { loading, comments, owner } = this.props;

        if (loading) {
            return (
                <div className="mt-5">
                    <Loader />
                </div>
            );
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-sm-12">
                        <div className="comment-wrapper">
                            <div className="card card-info">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Comments</h5>
                                    <textarea
                                        className="form-control rounded-pill"
                                        placeholder="write a comment..."
                                        rows="3"
                                    ></textarea>
                                    <br />
                                    <button type="button" className="btn btn-info float-right rounded-pill">
                                        Post
                                    </button>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <CommentList
                                        comments={comments}
                                        owner={owner}
                                        handleDeleteComment={this.onDeleteComment}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CommentContainer.propTypes = {
    comments: PropTypes.array.isRequired,
    deleteCommentRequested: PropTypes.func.isRequired,
    getCommentsRequested: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    owner: PropTypes.bool.isRequired,
    requesting: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
};

const mapStateToProps = ({ commentReducer }) => ({
    comments: commentReducer.comments,
    loading: commentReducer.loading,
    requesting: commentReducer.requesting,
});

export default connect(mapStateToProps, {
    getCommentsRequested,
    deleteCommentRequested,
})(CommentContainer);
