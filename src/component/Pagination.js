import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function Pagination({ totalCount, currentPage, loading, handlePageClick }) {
    const pages = Array.from(Array(totalCount)).map((e, index) => {
        const page = index + 1;
        const active = currentPage === page;
        const classes = cx('page-item', {
            active: active,
            'hover-hand': !active,
        });

        if (loading) {
            return '';
        }
        return (
            <li className={classes} key={index} onClick={() => !active && handlePageClick(page)}>
                <p className="page-link">{page}</p>
            </li>
        );
    });

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">{pages}</ul>
        </nav>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
};

export default Pagination;
