import React, { Component } from 'react';

import ArtileList from '../../component/ArticleList';
import FavTagContainer from '../FavTag/FavTagContainer';

class ArticleListContainer extends Component {
    componentDidMount() {
        console.log('HERE FIRE GET ARTICLE REQUEST');
    }

    onFavTagClick = () => {
        console.log('HERE FIRE ANOTHER GET ARTICLE REQUEST');
    };

    render() {
        return (
            <div className="row mt-5">
                <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3">
                    <FavTagContainer handleTagClick={this.onFavTagClick} />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-9 col-xl-9">
                    <ArtileList />
                </div>
            </div>
        );
    }
}

export default ArticleListContainer;
