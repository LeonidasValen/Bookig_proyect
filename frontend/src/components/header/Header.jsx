import { Search } from "../search/Search"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faCableCar, faCar, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import "./header.css"

export function Header({types}) {
    const { user } = useContext(AuthContext)

    return (
        <div className="header">
            <div className={types === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItems active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentales</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faCableCar} />
                        <span>Atractions</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>

                { types !== "list" && 
                <>
                    <h1 className="headerTitle">Find your next stay</h1>
                    <p className="headerDesc">
                        Search deals on hotels, homes, and much more...
                    </p>
                    {!user &&
                        <button className="headerBtn">Sign in / Register</button>
                    }
                    
                    <Search/>
                </>
                }


            </div>
        </div>
    )
}
