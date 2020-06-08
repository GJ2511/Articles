import React from 'react';

import Nav from './Nav';

const props = {
    isAuthenticated: true,
    signOutRequested: jest.fn(),
};

describe('<Nav tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<Nav {...props} />)).toMatchSnapshot();
    });
});
