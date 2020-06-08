import React from 'react';

import NotFound from './NotFound';

describe('<NotFound tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<NotFound />)).toMatchSnapshot();
    });
});
