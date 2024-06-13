import './featuredpropierties.css'

export function FeaturedPropierties() {
    return (
        <section className="FP">
            <div className="destinationTitle">
                <h1>Aparthotel Stare Miasto</h1>
                <p>From castles and villas to boats and igloos, we have it all</p>
            </div>
            <div className="FPContainer">
                <article className="FPItems">
                    <div className="FPImg">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=" alt="" />
                    </div>
                    <div className="FPInfo">
                        <div className="FPInfoHeader">
                            <div className="FPTitle">
                                <h1>Aparthotel Stare Miasto</h1>
                                <p>Old Town, Poland, Kraków</p>
                            </div>
                            <div className="FPReview">
                                <span className='FPCalification'>8.4</span>
                                <p className='FPReviews'>Exellent</p>
                            </div>
                        </div>
                        <div className='FPPpice'>
                            <p>Starting from</p>
                            <span>$154.687</span>
                        </div>
                    </div>
                </article>
                <article className="FPItems">
                    <div className="FPImg">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=" alt="" />
                    </div>
                    <div className="FPInfo">
                        <div className="FPInfoHeader">
                            <div className="FPTitle">
                                <h1>7Seasons Apartments Budapest</h1>
                                <p>06. Terézváros, Hungary, Budapest</p>
                            </div>
                            <div className="FPReview">
                                <span className='FPCalification'>8.4</span>
                                <p className='FPReviews'>Exellent</p>
                            </div>
                        </div>
                        <div className='FPPpice'>
                            <p>Starting from</p>
                            <span>$163.687</span>
                        </div>
                    </div>
                </article>
                <article className="FPItems">
                    <div className="FPImg">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/85257658.webp?k=e3f110e4ed0978310a028465a3bdd609149ecbded601555c881106255556b52e&o=" alt="" />
                    </div>
                    <div className="FPInfo">
                        <div className="FPInfoHeader">
                            <div className="FPTitle">
                                <h1>numa I Vita Apartments</h1>
                                <p>Tower Hamlets, United Kingdom, London</p>
                            </div>
                            <div className="FPReview">
                                <span className='FPCalification'>8.4</span>
                                <p className='FPReviews'>Exellent</p>
                            </div>
                        </div>
                        <div className='FPPpice'>
                            <p>Starting from</p>
                            <span>$234.453</span>
                        </div>
                    </div>
                </article>
                <article className="FPItems">
                    <div className="FPImg">
                        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/352170812.webp?k=4ff5e29f3ad72c2c9f7170f60a043f01a158f26b38c55e9676439c18f3804179&o=" alt="" />
                    </div>
                    <div className="FPInfo">
                        <div className="FPInfoHeader">
                            <div className="FPTitle">
                                <h1>Aparthotel Stare Miasto</h1>
                                <p>Santa Maria Novella, Italy, Florence</p>
                            </div>
                            <div className="FPReview">
                                <span className='FPCalification'>9.2</span>
                                <p className='FPReviews'>Wonderful</p>
                            </div>
                        </div>
                        <div className='FPPpice'>
                            <p>Starting from</p>
                            <span>$327.566</span>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
