import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Nav from '../../component/Nav';

class NavContainer extends Component {
    render() {
        console.log(this.props);
        return <Nav isAuthenticated={this.props.authenticated} />;
    }
}

NavContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ applicationReducer }) => ({
    authenticated: applicationReducer.authenticated,
});

export default connect(mapStateToProps, null)(NavContainer);
