import { Link } from "react-router-dom"
import "./navbar.css"

export function Navbar() {
  return (
    <nav className="navbar">
        <header className="navContainer">
            <Link to={"/"} className="logo">Leonking.com</Link>
            <div className="navItems">
              <button className="navButton">Register</button>
              <button className="navButton">Login</button>
            </div>
        </header>
    </nav>
  )
}
