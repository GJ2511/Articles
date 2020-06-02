import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Article.css';

function Article({ article }) {
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
                    <div className="col-md-3 profile">
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
                    <div className="col-md-9">BUTTONS HERE</div>
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
};

export default Article;
