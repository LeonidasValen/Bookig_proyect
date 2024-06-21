import { useNavigate } from 'react-router-dom'
import './featured.css'

export function Featured() {

    const navigate = useNavigate()

    const handleNavigate = (city) =>{
        navigate("/hotels")
    }

    return (
        <div className="features">
            <div className="destinationTitle">
                <h1>Trending destinations</h1>
                <p>Most popular choices for travelers from Argentina</p>
            </div>
            <section className='destination'>
                <article className="featuredGrid">
                    <article className="featuredItem" onClick={handleNavigate}>
                        <div className='featuredImg'>
                            <img src="https://cf.bstatic.com/xdata/images/city/600x600/664052.jpg?k=e0c8a97ea4cd0ab7e3757392c8fb02708767377e288a6c3e0889d22497e8e8f1&o=" alt="" />
                        </div>
                        <div className="featuredTitle">
                            <h1>Buenos aires</h1>
                        </div>
                    </article>
                    <article className="featuredItem">
                        <div className='featuredImg'>
                            <img src="https://cf.bstatic.com/xdata/images/city/600x600/664434.jpg?k=a0cb0f948924bdcea039a5039afc78096d324afe4d3395ec68d09536fc0daa23&o=" alt="" />
                        </div>
                        <div className="featuredTitle">
                            <h1>Bariloche</h1>
                        </div>
                    </article>
                </article>

                <article className="featuredItem">
                    <div className='featuredImg'>
                        <img src="https://cf.bstatic.com/xdata/images/city/600x600/664190.jpg?k=9dce1821c3fbcbca4359a447c9be0ff0d92d097341fb2df26902cfc0d0f4cec3&o=" alt="" />
                    </div>
                    <div className="featuredTitle">
                        <h1>Mendoza</h1>
                    </div>
                </article>
                <article className="featuredItem">
                    <div className='featuredImg'>
                        <img src="https://cf.bstatic.com/xdata/images/city/600x600/664125.jpg?k=3be2e16a1d2305149375892729e5daa1ea89e17272e2e438bb5093f0964c8b5d&o=" alt="" />
                    </div>
                    <div className="featuredTitle">
                        <h1>Cordoba</h1>
                    </div>
                </article>
                <article className="featuredItem">
                    <div className='featuredImg'>
                        <img src="https://cf.bstatic.com/xdata/images/city/600x600/664200.jpg?k=91939c766d293b86038e54714d7d0711888aec8513a494ce3ed4976247712625&o=" alt="" />
                    </div>
                    <div className="featuredTitle">
                        <h1>Mar del plata</h1>
                    </div>
                </article>

            </section>
        </div>
    )
}
