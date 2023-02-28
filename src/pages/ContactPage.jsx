import React, {useEffect} from 'react'
import "./scss/contact.scss"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Link, useLocation } from 'react-router-dom';

export default function ContactPage() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]) 
  return (
    <main>   
        <div className="map">
            <span><Link to="/">главная </Link>/<Link to="/contact"> контакты</Link></span>      
            <h1>Контакты</h1>
            <div className="map__contact">
                <div className="map-col">
                    <h2>Телефон</h2>
                    <p>+7 (910)973-36-65</p>
                </div>
                <div className="map-col">
                    <h2>Адрес</h2>
                    <p>г. ярославль, ул 2-я Тарная 2</p>
                </div>
                <div className="map-col">
                    <h2>Электронная почта</h2>
                    <p>dir@ids76.ru</p>
                </div>
            </div>
            <div id="map__yandex">
            <YMaps>
                <Map width="100%" height="100%" defaultState={{ center: [57.60083313280139,39.890269973791455], zoom: 18   }} > 
                    <Placemark geometry={[57.60083313280139,39.890269973791455]}  properties={{iconCaption: "msb-container",  balloonContent: '<strong>blue</strong> color'}} options={ {preset: 'islands#violetCircleDotIconWithCaption'}  }  />
                </Map>
            </YMaps>
            </div>
        </div>
    </main>
  )
}
