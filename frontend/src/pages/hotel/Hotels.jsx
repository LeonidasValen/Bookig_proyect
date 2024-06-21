import { useContext, useState } from "react"

import { Link, useNavigate, useParams } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons"

import { useFecth } from "../../hooks/useFetch"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import './hotels.css'
import { Modal } from "../../components/modal/Modal"

export function Hotels() {

  const { user } = useContext(AuthContext)

  const { dates, options } = useContext(SearchContext)

  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)

  //calculo de cuantas noches son
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dates.length > 0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;

  const { id } = useParams();//trae el id del url

  const { data, loading, error } = useFecth(`http://localhost:8800/api/hotel/${id}`);//en base el id de la url busca el hotel

  const totalPrice = data.cheapestPrice * days * (options.room || 1);//calcula el precio del hotel por las noches y las habitaciones
  const displayPrice = totalPrice === 0 ? data.cheapestPrice : totalPrice;//si el precio total es 0 osea porque no hay noches selecionadas trae el precio original

  //adapta el precio argentino
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  });

  //slider imagenes
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  //modal reservacion
  const handleModal = () => {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max500/508664666.jpg?k=02988ef96c78cdd9535aed4e4eccdb371e3ce2427766688ba539e48223c074a9&o=&hp=1"
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max500/508664673.jpg?k=2dc42aecc6deb5f88ab82e8dc9980665db6c97415d23e1991d3b357d3327baf2&o=&hp=1"
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max300/475381973.jpg?k=2b995e37a1cc6d03ed981a810aa8fc5137ff71eb56b920e1938a15e834f622d3&o=&hp=1"
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max300/508664656.jpg?k=4a3dc780d8f9a2c9e8f30529485b85cfd8bcbb6fb93eec6e64cc3a933163dcfc&o=&hp=1"
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max300/508664678.jpg?k=7e2da0dd615bdd656bd3f069e6a158389e60d28939155a348b7cbbada16ba1aa&o=&hp=1"
    },
  ]

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (error) {
    return (
      <main className="hotel">
        <div className='content'>
          <h1>Error: {error}</h1>
        </div>
      </main>)
  }
  return (
    <>
      <main className='hotel'>
        {
          open &&
          <div className="imgSlider">
            <div className="sliderBg" onClick={() => setOpen(false)}></div>
            <FontAwesomeIcon icon={faCircleArrowLeft} onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <FontAwesomeIcon icon={faCircleXmark} className="sliderCruz" onClick={() => setOpen(false)} />
              <img src={photos[slideNumber].src} alt="" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} onClick={() => handleMove("r")} />
          </div>
        }
        <section className='hotelContent'>


          <h1 className="hotelTitle">{data.title}</h1>
          <div className="hotelAddres">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>{data.address}, {data.city}, Argentina</p>
          </div>
          <div className="hotelImages">
            {
              photos.slice(0, 1).map((photo, index) => (
                <div className="hotelImgMiniature" key={index}>
                  <img onClick={() => handleOpen(index)} src={photo.src} alt="" />
                </div>
              ))
            }
            <div className="hotelImgW">
              {
                photos.slice(1).map((photo, index) => (
                  <div className="hotelImgWrapper" key={index}>
                    <img onClick={() => handleOpen(index + 1)} src={photo.src} alt="" />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="hoteldesc">
            <p className="propertyDesc">
              {data.desc}
            </p>
            <div className="hotelReserverd">
              <div className="hrContent">
                <h2>The best property</h2>
                <p>The best location. Recent travelers give it a high rating</p>
                <div className="rPresice"><span>{formatter.format(displayPrice)}</span>{days > 0 ? <p>por {days} noches</p> : <p>por noche</p>}</div>
                <button onClick={handleModal}>book now</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {
        openModal &&
        <Modal setOpenModal={setOpenModal} hotelId={data._id} />
      }
    </>
  )
}
