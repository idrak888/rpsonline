import React from 'react';

const Header = props => {
    return (
        <div className="Header">
            <nav className="navbar fixed-top navbar-dark">
                <a className="navbar-brand" href="/"><h4>Rock Paper Scissors!</h4></a>
            </nav>
        </div>
    );
}

export default Header;