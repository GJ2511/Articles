import React from 'react';

import SignUp from './SignUp';

const props = {
    errors: {},
    hasError: {},
    isSubmitting: false,
    touched: {},
};

describe('<SignUp tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<SignUp {...props} />)).toMatchSnapshot();
    });
});
