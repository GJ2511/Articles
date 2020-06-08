import React from 'react';

import Pagination from './Pagination';

const props = {
    currentPage: 1,
    handlePageClick: jest.fn(),
    loading: false,
    totalCount: 10,
};

describe('<Pagination tests />', () => {
    test('match snapshot', () => {
        expect(shallow(<Pagination {...props} />)).toMatchSnapshot();
    });
});
