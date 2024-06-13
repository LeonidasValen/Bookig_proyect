import { Link } from "react-router-dom";


export default function ListItem({item}) {

    const formatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
    });

    return (
        <article className='propertyArticle'>
            <div className="paContainer">
                <Link to={`/hotel/${item._id}`} className="propertyImg">
                    <img src="https://cf.bstatic.com/xdata/images/hotel/square240/566496733.webp?k=06a0bc2689e7d95a0f42e0e1eee3740955ae859410fcd81669901fcbe31a4d69&o=" alt="" />
                </Link>
                <div className="propertyInfo">
                    <div className="piData">
                        <Link to={`/hotel/${item._id}`} className="pidTitle">
                            <h1>{item.title}</h1>
                        </Link>
                        <div className="pidDirect"><a href='#'>{item.city}, {item.address}</a></div>
                        <div className="pidRooms"><span>1 bedroom · 1 Living room</span></div>
                        <div className="pidDesc">
                            {item.desc}
                        </div>
                    </div>
                    <div className="piReview">
                        <div className='peCalification'>
                            <span>Exepcional</span>
                            <div className='pePuntage'>9.8</div>
                        </div>
                        <div className='pePrice'>
                            <span>Precio por noche</span>
                            <p>{formatter.format(item.cheapestPrice)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
