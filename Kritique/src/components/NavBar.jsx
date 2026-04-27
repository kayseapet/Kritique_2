// src/components/NavBar.jsx
import { useState } from 'react' 
import { Link } from 'react-router-dom' // Ensure Link is imported
import './NavBar.css'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="menu-btn" onClick={toggleMenu}>
                ☰
            </button>

            <nav className={`side-nav ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleMenu}>×</button>
                <ul>
                    {/* Add onClick={toggleMenu} so the sidebar closes after clicking */}
                    <li><Link to="/" onClick={toggleMenu}>Home Feed</Link></li>
                    <li><Link to="/gallery" onClick={toggleMenu}>Full Gallery</Link></li>
                    <li><Link to="/create" onClick={toggleMenu}>Create Post</Link></li>
                </ul>
            </nav>

            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    )
}

export default NavBar;