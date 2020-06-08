import React from 'react';

import CommentForm from './CommentForm';

const props = {
    handleCommentSubmit: jest.fn(),
    requesting: false,
};

describe('<CommentForm tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<CommentForm {...props} />)).toMatchSnapshot();
    });
});
