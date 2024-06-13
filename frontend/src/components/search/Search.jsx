import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDay, faPerson } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import './search.css';

export function Search() {
    //buscador
    const [destination, setDestination] = useState("")

    //menu calendario
    const [openDate, setOpenDate] = useState(false);
    const optionsRef = useRef();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //menu contador
    const [openOptions, setOpenOptions] = useState(false);
    const dateRef = useRef();
    const [options, setOptions] = useState({
        adult: 2,
        children: 0,
        room: 1
    });

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    //cerrar menu al hacer click sobre otro lugar
    const handleClickOutside = (event) => {
        // verifica si dateRef.current existe y si el clic ocurrió fuera de dateRef.current
        if (dateRef.current && !dateRef.current.contains(event.target)) {
            setOpenDate(false);
        }
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setOpenOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const navigate = useNavigate()
    const handleSearch = ()=>{
        navigate("/hotels", {state:{destination,date,options}})
    }

    return (
        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={e=>setDestination(e.target.value)}/>
            </div>

            <div className="headerSearchItem" ref={dateRef}>
                <FontAwesomeIcon icon={faCalendarDay} className="headerIcon" onClick={() => setOpenDate(!openDate)} />
                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
                    {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
                </span>
                {openDate && (
                    <DateRange
                        months={2}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        className="date"
                        direction="horizontal"
                    />
                )}
            </div>

            <div className="headerSearchItem" ref={optionsRef}>
                <FontAwesomeIcon icon={faPerson} onClick={() => setOpenOptions(!openOptions)} className="headerIcon" />
                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>
                    {`${options.adult} adults · ${options.children} children · ${options.room} room`}
                </span>
                {openOptions && (
                    <div className="options">
                        <div className="optionsItem">
                            <span className="optionText">Adult</span>
                            <div className="optionsCounter">
                                <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                <span className='optionCounterNumber'>{options.adult}</span>
                                <button className="optionCounterButton" disabled={options.adult >= 30} onClick={() => handleOption("adult", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionsItem">
                            <span className="optionText">Children</span>
                            <div className="optionsCounter">
                                <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                <span className='optionCounterNumber'>{options.children}</span>
                                <button className="optionCounterButton" disabled={options.children >= 10} onClick={() => handleOption("children", "i")}>+</button>
                            </div>
                        </div>
                        <div className="optionsItem">
                            <span className="optionText">Room</span>
                            <div className="optionsCounter">
                                <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                <span className='optionCounterNumber'>{options.room}</span>
                                <button className="optionCounterButton" disabled={options.room >= 30} onClick={() => handleOption("room", "i")}>+</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="headerSearchItem">
                <button className="headerBtn search" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}
