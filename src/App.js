import React, {useState, useEffect} from 'react';

import Routes from "./Routes";
import Nav from "./Nav"

import AuthService from "./services/authService";



function App() {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setloggedInUser] = useState(null);
  
  useEffect(() => {
    setloggedInUser(AuthService.getLoggedInUser());
    setLoading(false);
  },[]);
  
  if(loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  return (
      <>
        <Nav loggedInUser={loggedInUser}/>

        <div className="container container-fluid">
            <Routes loggedInUser={loggedInUser}/>
        </div>
      </>
  );
}

export default App;
