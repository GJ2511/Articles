/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../../component/Loader';
import ErrorList from '../../component/ErrorList';
import Article from '../../component/Article';
import { reset, getArticleRequest } from './ducks';

class ArticleContainer extends Component {
    componentDidMount() {
        const {
            match: {
                params: { slug },
            },
            getArticleRequest,
        } = this.props;

        console.log('DID MOINR');
        getArticleRequest(slug);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { article, error, loading } = this.props;

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
                <div className="col-md-12">
                    <Article article={article} />
                </div>
                <hr />
                <div className="col-md-12">COMMENT SECTION HERE</div>
            </div>
        );
    }
}

ArticleContainer.propTypes = {
    article: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    getArticleRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
    article: articleReducer.article,
    error: articleReducer.error,
    loading: articleReducer.loading,
});

export default connect(mapStateToProps, { reset, getArticleRequest })(ArticleContainer);
