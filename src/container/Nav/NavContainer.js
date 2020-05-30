import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Nav from '../../component/Nav';
import { signOutRequested } from '../../ducks';

class NavContainer extends Component {
    render() {
        const { authenticated, signOutRequested } = this.props;

        return <Nav isAuthenticated={authenticated} signOutRequested={signOutRequested} />;
    }
}

NavContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    signOutRequested: PropTypes.func.isRequired,
};

const mapStateToProps = ({ applicationReducer }) => ({
    authenticated: applicationReducer.authenticated,
});

export default connect(mapStateToProps, { signOutRequested })(NavContainer);
