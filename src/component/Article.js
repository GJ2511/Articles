import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import cx from 'classnames';

import './Article.css';

const getFavIcon = (favorites, count, handleClick, requesting) => {
    const classes = cx('btn rounded-pill text-white mr-1', {
        'badge-info': !favorites,
        'badge-success': favorites,
    });

    if (favorites) {
        return (
            <button className={classes} onClick={() => handleClick(favorites)} disabled={requesting}>
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
                Favorite Article ({count})
            </button>
        );
    }

    return (
        <button className={classes} onClick={() => handleClick(favorites)} disabled={requesting}>
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
            </svg>{' '}
            Favorite Article ({count})
        </button>
    );
};

function Article({ article, handleDeleteClick, handleEditClick, handleMarkAsFavClick, owner, requesting }) {
    const renderTags = (tags = []) => {
        return tags.map((tag, index) => {
            return (
                <span className="badge badge-pill badge-info mr-1" key={index}>
                    {tag}
                </span>
            );
        });
    };

    return (
        <>
            <div className="bg-dark text-white p-2">
                <h2 className="mb-3 px-2">{article.title}</h2>
                <div className="row">
                    <div className="col-md-7 profile">
                        <ul className="list-unstyled">
                            <li className="media">
                                <img
                                    src={article.author?.image}
                                    className="img-thumbnail img-fluid rounded-pill profile-img mr-3"
                                    alt={article.author?.username}
                                />
                                <div className="media-body">
                                    <h5 className="mt-0 mb-1">{article.author?.username}</h5>
                                    <small>{moment(article.createdAt).format('MMMM, Do YYYY')}</small>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-5">
                        {getFavIcon(article.favorited, article.favoritesCount, handleMarkAsFavClick, requesting)}
                        {owner && (
                            <>
                                <button
                                    className="btn btn-secondary rounded-pill text-white mr-1"
                                    onClick={handleEditClick}
                                >
                                    <svg
                                        className="bi bi-pencil"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"
                                        />
                                    </svg>{' '}
                                    Edit Article
                                </button>
                                <button
                                    className="btn btn-danger rounded-pill text-white"
                                    onClick={handleDeleteClick}
                                    disabled={requesting}
                                >
                                    <svg
                                        className="bi bi-trash"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                        />
                                    </svg>{' '}
                                    Delete Article
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white text-dark mt-2 p-2">
                <p>{article.body}</p>
                <div>{renderTags(article.tagList)}</div>
            </div>
        </>
    );
}

Article.propTypes = {
    article: PropTypes.object.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
    handleEditClick: PropTypes.func.isRequired,
    handleMarkAsFavClick: PropTypes.func.isRequired,
    owner: PropTypes.bool.isRequired,
    requesting: PropTypes.bool.isRequired,
};

export default Article;
