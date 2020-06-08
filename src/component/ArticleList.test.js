import React from 'react';

import ArticleList from './ArticleList';

const props = {
    articles: [
        {
            slug: 'how-to-train-your-dragon',
            title: 'How to train your dragon',
            description: 'Ever wonder how?',
            body: 'It takes a Jacobian',
            tagList: ['dragons', 'training'],
            createdAt: '2016-02-18T03:22:56.637Z',
            updatedAt: '2016-02-18T03:48:35.824Z',
            favorited: false,
            favoritesCount: 0,
            author: {
                username: 'jake',
                bio: 'I work at statefarm',
                image: 'https://i.stack.imgur.com/xHWG8.jpg',
                following: false,
            },
        },
    ],
    handleFavCellClick: jest.fn(),
    handleRowClick: jest.fn,
    loading: false,
};

describe('<ArticleList tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<ArticleList {...props} />)).toMatchSnapshot();
    });
});
