import React from 'react';

import Loader from './Loader';

describe('<Loader tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<Loader />)).toMatchSnapshot();
    });
});
