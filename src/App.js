import React from 'react';

import Routes from './Routes';
import Nav from './component/Nav';

function App() {
    return (
        <>
            <Nav />

            <div className="container container-fluid">
                <Routes />
            </div>
        </>
    );
}

export default App;
