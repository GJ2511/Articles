import React from 'react';

import Routes from './Routes';
import NavContainer from './container/Nav/NavContainer';

function App() {
    return (
        <>
            <NavContainer />

            <div className="container container-fluid">
                <Routes />
            </div>
        </>
    );
}

export default App;
