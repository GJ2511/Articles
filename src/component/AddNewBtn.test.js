import React from 'react';

import AddNewBtn from './AddNewBtn';

describe('<AddNewBtn tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<AddNewBtn />)).toMatchSnapshot();
    });
});
