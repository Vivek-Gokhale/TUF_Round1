import React from 'react';
import '../styles/Header.css';

const Header = ({ flag, toggleFlag1, toggleFlag2 }) => {
    return (
        <header className="header">
            <div className="logo">
                <img
                    src="../../public/logo.png"
                    alt="Logo"
                />
            </div>
            <div className="header-right">
                <button className="action-btn" onClick={toggleFlag1}>QnA</button>
                <button className="action-btn" onClick={toggleFlag2}>Admin Dashboard</button>
            </div>
        </header>
    );
};

export default Header;
