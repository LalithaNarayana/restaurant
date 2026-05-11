import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <div className="main-page">
            <h1>Welcome to Restaurant Order Management App</h1>
            <div className="user-options">
                <h2><Link to="/waiter">Waiter</Link></h2>
                <h2><Link to="/line-cook">Line Cook</Link></h2>
            </div>
        </div>
    );
}

export default MainPage;