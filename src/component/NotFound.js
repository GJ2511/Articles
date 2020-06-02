import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="container">
            <div className="row text-center mt-5">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
                        <div className="error-actions mt-2">
                            <Link to="/" className="btn btn-primary btn-lg rounded-pill">
                                <span className="glyphicon glyphicon-home"></span>
                                Take Me Home{' '}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
