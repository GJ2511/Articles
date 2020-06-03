import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../component/Loader';
import CommentList from '../../component/CommentList';
import CommentForm from '../../component/CommentForm';
import { getCommentsRequested, deleteCommentRequested, addCommentRequested } from './ducks';

class CommentContainer extends Component {
    componentDidMount() {
        const { slug, getCommentsRequested } = this.props;

        getCommentsRequested(slug);
    }

    onDeleteComment = (comment) => {
        const { deleteCommentRequested, slug } = this.props;

        deleteCommentRequested({ comment, slug });
    };

    onCommentSubmit = (comment) => {
        const { slug, addCommentRequested } = this.props;

        addCommentRequested({ comment, slug });
    };

    render() {
        const { loading, comments, requesting, authenticated, currentUser } = this.props;

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
                                    {!authenticated ? (
                                        <p className="col-6 offset-4 mt-3">
                                            <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link> to
                                            add comments on this article.
                                        </p>
                                    ) : (
                                        <CommentForm
                                            requesting={requesting}
                                            handleCommentSubmit={this.onCommentSubmit}
                                        />
                                    )}

                                    <div className="clearfix"></div>
                                    <hr />
                                    <CommentList
                                        comments={comments}
                                        authenticated={authenticated}
                                        currentUser={currentUser}
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
    addCommentRequested: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    deleteCommentRequested: PropTypes.func.isRequired,
    getCommentsRequested: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    requesting: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
};

const mapStateToProps = ({ commentReducer, applicationReducer }) => ({
    authenticated: applicationReducer.authenticated,
    currentUser: applicationReducer.currentUser,
    comments: commentReducer.comments,
    loading: commentReducer.loading,
    requesting: commentReducer.requesting,
});

export default connect(mapStateToProps, {
    getCommentsRequested,
    deleteCommentRequested,
    addCommentRequested,
})(CommentContainer);
