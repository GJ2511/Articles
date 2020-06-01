import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArtileList from '../../component/ArticleList';
import ErrorList from '../../component/ErrorList';
import Pagination from '../../component/Pagination';
import AddNewBtn from '../../component/AddNewBtn';
import FavTagContainer from '../FavTag/FavTagContainer';
import { getArticlesRequested, setCurrentPage } from './ducks';

import historyService from '../../services/historyService';

class ArticleListContainer extends Component {
    componentDidMount() {
        this.props.getArticlesRequested();
    }

    onFavTagClick = () => {
        this.props.getArticlesRequested({ resetPage: true });
    };

    onRowClick = (slug) => {
        historyService.forwardTo(`/article/${slug}`);
    };

    onPageClick = (page) => {
        this.props.setCurrentPage(page);
        this.props.getArticlesRequested();
    };

    render() {
        const { error, totalCount, currentPage, loading, ...rest } = this.props;

        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
                    <AddNewBtn />
                    <FavTagContainer handleTagClick={this.onFavTagClick} />
                </div>
                <div className="col-sm-12 col-md-9 col-lg-10 col-xl-10">
                    {error ? (
                        <ErrorList errors={{ ERROR: ['Something Went Wrong'] }} />
                    ) : (
                        <>
                            <ArtileList {...rest} handleRowClick={this.onRowClick} loading={loading} />
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
    currentPage: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    getArticlesRequested: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ articleListReducer }) => ({
    articles: articleListReducer.articles,
    currentPage: articleListReducer.currentPage,
    error: articleListReducer.error,
    loading: articleListReducer.loading,
    totalCount: articleListReducer.totalCount,
});

export default connect(mapStateToProps, { getArticlesRequested, setCurrentPage })(ArticleListContainer);
