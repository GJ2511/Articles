import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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

    const tableBody = articles.map((article, index) => {
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
                    <button type="button" className="btn btn-primary rounded-pill">
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
                        </svg>{' '}
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
