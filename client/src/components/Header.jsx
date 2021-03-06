import React from 'react'
import { useFlags, } from 'flagsmith/react'
import { ENV, } from '../constants'

import image from '../assets/marvel-moving.gif'
import './Header.scss'

const Header = () => {
    const flags = useFlags(['search_page'],)

    return <header className='header' style={styles.header}>
        <div className='container text-left'>
            <img 
                className='header-img'
                src={image} 
                alt='marvel-moving.gif' 
                onClick={() => { window.location.href = '/' }}
            />
        </div>
        <nav className='container nav-container'>
            <a className='btn btn-warning btn-lg' href='/'>Home</a>
            {flags.search_page.enabled && flags.search_page.value === ENV ?
                <a className='btn btn-warning btn-lg' href='/search'>Search</a> :
                null}
            <a className='btn btn-warning btn-lg' href='/favs'>Favourites</a>
            <a className='btn btn-warning btn-lg' href='/404'>404 page</a>
        </nav>
    </header>
}

const styles = {
    header: {
        marginTop: 30,
        marginBottom: 70,
    }
}

export default Header
