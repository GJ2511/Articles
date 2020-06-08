import React from 'react';

import CommentList from './CommentList';

const props = {
    authenticated: true,
    comments: [
        {
            id: 1,
            createdAt: '2016-02-18T03:22:56.637Z',
            updatedAt: '2016-02-18T03:22:56.637Z',
            body: 'It takes a Jacobian',
            author: {
                username: 'jake',
                bio: 'I work at statefarm',
                image: 'https://i.stack.imgur.com/xHWG8.jpg',
                following: false,
            },
        },
    ],
    currentUser: {
        email: 'jake@jake.jake',
        token: 'jwt.token.here',
        username: 'jake',
        bio: 'I work at statefarm',
        image: null,
    },
    handleDeleteComment: jest.fn(),
};

describe('<CommentList tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<CommentList {...props} />)).toMatchSnapshot();
    });
});
