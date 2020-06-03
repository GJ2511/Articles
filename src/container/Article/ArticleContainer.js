/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../component/Loader';
import ErrorList from '../../component/ErrorList';
import Article from '../../component/Article';
import CommentContainer from '../Comment/CommentContainer';

import { reset, getArticleRequest, toggleFavoriteRequested, deleteRequested } from './ducks';
import historyService from '../../services/historyService';

class ArticleContainer extends Component {
    owner = false;

    onMarkAsFavClick = (favorited) => {
        const {
            match: {
                params: { slug },
            },
            authenticated,
            toggleFavoriteRequested,
        } = this.props;

        if (!authenticated) {
            historyService.forwardTo(`/signin`);
            return;
        }

        toggleFavoriteRequested({ slug, favorited });
    };

    onEditClick = () => {
        const {
            match: {
                params: { slug },
            },
        } = this.props;

        historyService.forwardTo(`/edit/article/${slug}`);
    };

    onDeleteClick = () => {
        const {
            match: {
                params: { slug },
            },
            deleteRequested,
        } = this.props;

        deleteRequested(slug);
    };

    redirectToSign = () => {
        historyService.forwardTo('/signin');
    };

    componentDidMount() {
        const {
            match: {
                params: { slug },
            },
            getArticleRequest,
        } = this.props;

        getArticleRequest(slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const {
            match: {
                params: { slug },
            },
            article,
            error,
            loading,
            authenticated,
            currentUser,
            requesting,
        } = this.props;

        if (authenticated && article.author?.username === currentUser?.username) {
            this.owner = true;
        }

        if (loading) {
            return (
                <div className="mt-5">
                    <Loader />
                </div>
            );
        }

        if (Object.keys(error).length) {
            return (
                <div className="mt-5">
                    <ErrorList errors={error} />
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-12 border-bottom border-light">
                    <Article
                        article={article}
                        owner={this.owner}
                        requesting={requesting}
                        handleMarkAsFavClick={this.onMarkAsFavClick}
                        handleEditClick={this.onEditClick}
                        handleDeleteClick={this.onDeleteClick}
                    />
                </div>
                <hr />
                <div className="col-md-12 mt-3">
                    <CommentContainer slug={slug} owner={this.owner} />
                </div>
            </div>
        );
    }
}

ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    deleteRequested: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    getArticleRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    requesting: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    toggleFavoriteRequested: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articleReducer, applicationReducer }) => ({
    authenticated: applicationReducer.authenticated,
    currentUser: applicationReducer.currentUser,
    article: articleReducer.article,
    error: articleReducer.error,
    loading: articleReducer.loading,
    requesting: articleReducer.requesting,
});

export default compose(
    withRouter,
    connect(mapStateToProps, { reset, getArticleRequest, toggleFavoriteRequested, deleteRequested })
)(ArticleContainer);
