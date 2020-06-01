import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loader from '../../component/Loader';
import FavTag from '../../component/FavTag';
import { favTagRequested, setSeletedTag } from './ducks';

class FavTagContainer extends Component {
    componentDidMount() {
        this.props.favTagRequested();
    }

    render() {
        const { loading, ...rest } = this.props;

        return (
            <div className="card card-signin bg-light">
                <div className="card-header">
                    <h5 className="card-title text-center">Popular Tags</h5>
                </div>
                <div className="card-body bg-white">{loading ? <Loader /> : <FavTag {...rest} />}</div>
            </div>
        );
    }
}

FavTagContainer.propTypes = {
    favTagRequested: PropTypes.func.isRequired,
    handleTagClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    selectedTag: PropTypes.string,
    setSeletedTag: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
};

const mapStateToProps = ({ favTagReducer }) => ({
    tags: favTagReducer.tags,
    loading: favTagReducer.loading,
    selectedTag: favTagReducer.selectedTag,
});

export default connect(mapStateToProps, { favTagRequested, setSeletedTag })(FavTagContainer);
