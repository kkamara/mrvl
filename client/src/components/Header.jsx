import React from "react"

import image from '../assets/marvel-moving.gif'
import './Header.scss'

const Header = () => (
    <header className="header" style={styles.header}>
        <div className="container text-left">
            <img 
                className="header-img"
                src={image} 
                alt="marvel-moving.gif" 
                onClick={() => { window.location.href = '/' }}
            />
        </div>
    </header>
)

const styles = {
    header: {
        marginTop: 30
    }
}

export default Header