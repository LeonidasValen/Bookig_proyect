import { useFecth } from '../../hooks/useFetch'
import './propertylist.css'

export function PropertyList() {

  const { data, loading, error, reFetch } = useFecth("http://localhost:8800/api/hotel/countByCity?cities=Buenos aires,Bariloche,Mendoza,Cordoba,Salta,La Plata")
  return (
    <section className='pList'>
      <div className="destinationTitle">
        <h1>Explore Argentina</h1>
        <p>These popular destinations have a lot to offer</p>
      </div>
      <div className="pListContent">
        {loading
          ? ("Loading pleae wait")
          : (
            <>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/664052.jpg?k=e0c8a97ea4cd0ab7e3757392c8fb02708767377e288a6c3e0889d22497e8e8f1&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>Buenos Aires</h1>
                  <p>{data[0]} propierties</p>
                </div>
              </article>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/664434.jpg?k=a0cb0f948924bdcea039a5039afc78096d324afe4d3395ec68d09536fc0daa23&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>Bariloche</h1>
                  <p>{data[1]} propierties</p>
                </div>
              </article>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/664190.jpg?k=9dce1821c3fbcbca4359a447c9be0ff0d92d097341fb2df26902cfc0d0f4cec3&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>Mendoza</h1>
                  <p>{data[2]} propierties</p>
                </div>
              </article>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/664125.jpg?k=3be2e16a1d2305149375892729e5daa1ea89e17272e2e438bb5093f0964c8b5d&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>Cordoba</h1>
                  <p>{data[3]} propierties</p>
                </div>
              </article>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/664334.jpg?k=43cfb6ac62fe2a8a9efea33674c9ea7254f55fb1e00a439ac5f8afc263303d16&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>Salta</h1>
                  <p>{data[4]} propierties</p>
                </div>
              </article>
              <article className="pListItem">
                <div className="pListImg">
                  <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/664200.jpg?k=91939c766d293b86038e54714d7d0711888aec8513a494ce3ed4976247712625&o=" alt="" />
                </div>
                <div className="pListTitle">
                  <h1>La plata</h1>
                  <p>{data[5]} propierties</p>
                </div>
              </article>
            </>
          )
        }
      </div>
    </section>
  )
}
