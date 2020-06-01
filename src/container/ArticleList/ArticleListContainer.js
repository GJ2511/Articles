import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArtileList from '../../component/ArticleList';
import ErrorList from '../../component/ErrorList';
import Pagination from '../../component/Pagination';
import AddNewBtn from '../../component/AddNewBtn';
import FavTagContainer from '../FavTag/FavTagContainer';
import {
    getArticlesRequested,
    setCurrentPage,
    toggleFavoriteRequested,
    toggleMyFavArticle,
    toggleMyArticle,
} from './ducks';

import historyService from '../../services/historyService';

class ArticleListContainer extends Component {
    componentDidMount() {
        this.props.getArticlesRequested();
    }

    onFavTagClick = () => {
        this.props.getArticlesRequested({ resetPage: true });
    };

    onFavCellClick = ({ slug, favorited }) => {
        const { authenticated, toggleFavoriteRequested } = this.props;

        if (!authenticated) {
            historyService.forwardTo(`/signin`);
        } else {
            toggleFavoriteRequested({ slug, favorited });
        }
    };

    onRowClick = (slug) => {
        historyService.forwardTo(`/article/${slug}`);
    };

    onPageClick = (page) => {
        this.props.setCurrentPage(page);
        this.props.getArticlesRequested();
    };

    handleMyFavCheckboxChange = (evt) => {
        this.props.toggleMyFavArticle(evt.target.checked);
        this.props.getArticlesRequested();
    };

    handleMyArticleCheckboxChange = (evt) => {
        this.props.toggleMyArticle(evt.target.checked);
        this.props.getArticlesRequested();
    };

    render() {
        const { error, totalCount, currentPage, loading, authenticated, myArticle, myFavArticle, ...rest } = this.props;

        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
                    <AddNewBtn />
                    <FavTagContainer handleTagClick={this.onFavTagClick} />
                    {authenticated && (
                        <>
                            <div className="form-check mt-1 mb-1">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={myFavArticle}
                                    onChange={(e) => this.handleMyFavCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    My Favorite Article
                                </label>
                            </div>
                            <div className="form-check mt-1 mb-1">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={myArticle}
                                    onChange={(e) => this.handleMyArticleCheckboxChange(e)}
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    My Article
                                </label>
                            </div>
                        </>
                    )}
                </div>
                <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                    {error ? (
                        <ErrorList errors={{ ERROR: ['Something Went Wrong'] }} />
                    ) : (
                        <>
                            <ArtileList
                                {...rest}
                                handleRowClick={this.onRowClick}
                                loading={loading}
                                handleFavCellClick={this.onFavCellClick}
                            />
                            <Pagination
                                totalCount={totalCount}
                                currentPage={currentPage}
                                loading={loading}
                                handlePageClick={this.onPageClick}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }
}

ArticleListContainer.propTypes = {
    articles: PropTypes.array.isRequired,
    authenticated: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    getArticlesRequested: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    myArticle: PropTypes.bool.isRequired,
    myFavArticle: PropTypes.bool.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    toggleFavoriteRequested: PropTypes.func.isRequired,
    toggleMyArticle: PropTypes.func.isRequired,
    toggleMyFavArticle: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ articleListReducer, applicationReducer }) => ({
    articles: articleListReducer.articles,
    authenticated: applicationReducer.authenticated,
    currentPage: articleListReducer.currentPage,
    error: articleListReducer.error,
    loading: articleListReducer.loading,
    myArticle: articleListReducer.myArticle,
    myFavArticle: articleListReducer.myFavArticle,
    totalCount: articleListReducer.totalCount,
});

export default connect(mapStateToProps, {
    getArticlesRequested,
    setCurrentPage,
    toggleFavoriteRequested,
    toggleMyFavArticle,
    toggleMyArticle,
})(ArticleListContainer);
