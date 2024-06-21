import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./navbar.css"

export function Navbar() {
  const { user } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <header className="navContainer">
        <Link to={"/"} className="logo">Leonking.com</Link>
        <div className="navItems">
          {user 
          ? user.username
           : <>
              <button className="navButton">Register</button>
              <button className="navButton"><Link to={"/login"}>Login</Link></button>
            </>
          }
        </div>
      </header>
    </nav>
  )
}
