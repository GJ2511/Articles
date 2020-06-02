import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import Loader from './Loader';

function ArticleList({ articles, loading, handleRowClick, handleFavCellClick }) {
    if (loading) {
        return <Loader />;
    }

    const getTags = (tags) => {
        return tags.map((tag, index) => {
            return (
                <span className="badge ml-1 badge-info" key={index}>
                    {tag}
                </span>
            );
        });
    };

    const getFavIcon = (favorites) => {
        if (favorites) {
            return (
                <svg
                    className="bi bi-heart-fill"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                </svg>
            );
        }

        return (
            <svg
                className="bi bi-heart"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
            </svg>
        );
    };

    const tableBody = articles.map((article, index) => {
        const classes = cx('btn rounded-pill text-white', {
            'badge-secondary': !article.favorited,
            'badge-primary': article.favorited,
        });

        return (
            <tr key={index} className="d-flex hover-hand">
                <td className="col-2" onClick={() => handleRowClick(article.slug)}>
                    {article.title}
                </td>
                <td className="col-3" onClick={() => handleRowClick(article.slug)}>
                    {article.description}
                </td>
                <td className="col-2" onClick={() => handleRowClick(article.slug)}>
                    {article.author.username}
                </td>
                <td className="col-2" onClick={() => handleRowClick(article.slug)}>
                    {getTags(article.tagList)}
                </td>
                <td className="col-1" onClick={() => handleFavCellClick(article)}>
                    <button type="button" className={classes}>
                        {getFavIcon(article.favorited)}{' '}
                        <span className="badge badge-light">{article.favoritesCount}</span>
                    </button>
                </td>
                <td className="col-2" onClick={() => handleRowClick(article.slug)}>
                    {moment(article.createdAt).format('dddd, MMMM Do YYYY')}
                </td>
            </tr>
        );
    });

    return (
        <table className="table table-hover table-bordered article_list">
            <thead className="thead-dark">
                <tr className="d-flex">
                    <th className="col-2">Title</th>
                    <th className="col-3">Description</th>
                    <th className="col-2">Author</th>
                    <th className="col-2">Tags</th>
                    <th className="col-1">Favorites Count</th>
                    <th className="col-2">Created At</th>
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    handleFavCellClick: PropTypes.func.isRequired,
    handleRowClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ArticleList;
