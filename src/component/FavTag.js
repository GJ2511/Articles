import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function FavTag({ handleTagClick, selectedTag, tags, setSeletedTag }) {
    const handleClick = (selected, tag) => {
        setSeletedTag(selected, tag);
        handleTagClick();
    };

    return tags.map((tag, index) => {
        const selected = tag === selectedTag ? true : false;
        const classes = cx('badge ml-1', {
            'badge-secondary': !selected,
            'badge-primary': selected,
        });

        return (
            <span className={classes} key={index} onClick={() => handleClick(selected, tag)}>
                {tag}
            </span>
        );
    });
}

FavTag.propTypes = {
    handleTagClick: PropTypes.func.isRequired,
    selectedTag: PropTypes.string,
    tags: PropTypes.array.isRequired,
};

export default FavTag;
