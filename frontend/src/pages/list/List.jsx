import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faPerson, faSearch } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import ListItem from './ListItem';
import { useFecth } from '../../hooks/useFetch';
import './list.css'
import { SearchContext } from '../../context/SearchContext';

export function List() {

  const {dispatch} = useContext(SearchContext)

  const location = useLocation()

  //buscador
  const [destination, setDestination] = useState(location.state?.destination || '')

  //menu calendario
  const [openDate, setOpenDate] = useState(false);
  const optionsRef = useRef();
  const [dates, setDate] = useState(location.state.dates)

  //menu contador
  const [openOptions, setOpenOptions] = useState(false);
  const dateRef = useRef();
  const [options, setOptions] = useState(location.state.options)

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

  // Función para manejar la búsqueda al hacer clic en el botón Search
  const [city, setCity] = useState(destination);
  const navigate = useNavigate()
  const handleChange = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const handleSearch = async () => {
    try {
      setDestination(city);
      dispatch({type: "NEW_SEARCH", payload:{destination,dates,options}})
      navigate("/hotels", {
        state: {
          destination: city,
          dates,
          options
        }
      });
    } catch (error) {
      throw error;
    }
  };

  const { data, loading, error, reFetch } = useFecth(`http://localhost:8800/api/hotel?city=${destination}`);

  return (
    <main className="list">
      <div className='listContainer'>
        <aside className="listSearch">
          <h1>Search</h1>
          <div className="lsItems">
            <label htmlFor="">Destination/property name:</label>
            <div className='lsi Search'>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" value={city} onChange={handleChange} />
            </div>
          </div>
          <div className="lsItems" ref={dateRef}>
            <label htmlFor="">Check date</label>
            <div className='lsi Calendari'>
              <FontAwesomeIcon icon={faCalendarDay} onClick={() => setOpenDate(!openDate)} />
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  months={2}
                  onChange={item => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  direction="horizontal"
                />
              )}
            </div>
          </div>
          <div className="lsItems" ref={optionsRef}>
            <div className="lsi Room">
              <FontAwesomeIcon icon={faPerson} onClick={() => setOpenOptions(!openOptions)} />
              <span onClick={() => setOpenOptions(!openOptions)}>
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
          </div>
          <div className="lsItems">
            <button className='btnSearch' onClick={handleSearch}>
              Search
            </button>
          </div>
        </aside>

        <section className="listHotels">
          {loading
            ? ("Loading...")
            :
            (
              <>
                {data.map((item) => (
                  <ListItem key={item._id} item={item} />
                ))}
              </>
            )
          }

        </section>
      </div>
    </main>
  )

}
