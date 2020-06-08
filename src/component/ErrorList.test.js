import React from 'react';

import ErrorList from './ErrorList';

const props = {
    errors: { ERROR: ['true'] },
};

describe('<ErrorList tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<ErrorList {...props} />)).toMatchSnapshot();
    });
});
