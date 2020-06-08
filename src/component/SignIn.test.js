import React from 'react';

import SignIn from './SignIn';

const props = {
    errors: {},
    hasError: {},
    isSubmitting: false,
    touched: {},
};

describe('<SignIn tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<SignIn {...props} />)).toMatchSnapshot();
    });
});
