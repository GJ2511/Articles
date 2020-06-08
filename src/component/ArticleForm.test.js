import React from 'react';

import ArticleForm from './ArticleForm';

const props = {
    errors: {},
    hasError: {},
    isSubmitting: false,
    touched: {},
};

describe('<ArticleForm tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<ArticleForm {...props} />)).toMatchSnapshot();
    });
});
