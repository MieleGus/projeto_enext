import React from 'react'
import '../styles.scss'

export default function Header(props) {
    return(
        <header className="header">
            <nav className="nav"> 
                <ul>
                    <a>Logo</a>
                    <li>Galeria de pets</li>
                    <li>Registre seu pet</li>
                </ul>
            </nav>

        </header>
    )
}

