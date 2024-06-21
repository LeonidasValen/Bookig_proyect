import { useContext, useState } from 'react'
import { useFecth } from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import './modal.css'
import axios from 'axios'

export function Modal({ setOpenModal, hotelId }) {

    axios.defaults.withCredentials = true;

    const [selectedRooms, setSelectedRooms] = useState([])

    const { data, loading, error } = useFecth(`http://localhost:8800/api/rooms/${hotelId}`)

    const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());

        let list = [];

        while (date <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return list;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = roomNumber => {
        const isFound = roomNumber.unavailableDates.some(dates =>
            allDates.includes(new Date(dates).getTime())
        );

        return !isFound;
    }

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    });

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value));
    };

    const handleReserve = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`http://localhost:8800/api/availability/${roomId}`, { dates: allDates })
                return res.data
            }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="reserve">
            <div className="sliderBg" onClick={() => setOpenModal(false)}></div>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className='rClose' onClick={() => setOpenModal(false)} />
                <span>Select your habitacion:</span>
                {
                    data.map(item => (
                        <div className="rItem" key={item._id}>
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.desc}</div>
                                <div className="rMax">Max people: {item.maxPeople}</div>
                                <div className="rPrice">{formatter.format(item.price)}</div>
                            </div>
                            <div className='rSelect'>
                                {item.roomsNumbers.map(roomNumber => (
                                    <div className="room" key={roomNumber._id}>
                                        <label htmlFor="">{roomNumber.number}</label>
                                        <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
                <button className="rButton" onClick={handleReserve}>Reserve now</button>
            </div>
        </div>
    )
}
