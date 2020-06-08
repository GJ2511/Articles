import React from 'react';

import FavTag from './FavTag';

const props = {
    handleTagClick: jest.fn(),
    selectedTag: 'reactjs',
    tags: ['reactjs', 'angularjs'],
};

describe('<FavTag tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<FavTag {...props} />)).toMatchSnapshot();
    });
});
