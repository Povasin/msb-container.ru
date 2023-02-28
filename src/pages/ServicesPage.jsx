import React, {useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./scss/services.scss"

export default function ServicesPage() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]) 
  return (
    <main>   
        <div className="services__wrapper">
            <span><Link to="/">главная </Link>/<Link to="/services"> услуги</Link></span>      
            <h1>Услуги</h1>
            <div className="services">
                <div className="services__item">
                    <div className="services__img">
                        <img src="./cubinsforLive.webp" alt=""/>
                    </div>
                    <div className="services__contant">
                        <div className="star">★★★★☆</div>
                        <p>производство и продажа бытовок</p>
                        <div className="services__contantPrice">
                            <Link to="/" className="more">подробнее</Link>
                            <p>От 8000₽</p>
                        </div>
                    </div>
                </div>
                <div className="services__item">
                    <div className="services__img">
                        <img src="./cubins.webp" alt="бытовка б/у"/>
                    </div>
                    <div className="services__contant">
                        <div className="star">★★★☆☆</div>
                        <p>выкуп бытовок б/у</p>
                        <div className="services__contantPrice">
                            <Link to="/" className="more">подробнее</Link>
                            <p>От 15000₽</p>
                        </div>
                    </div>
                </div>
                <div className="services__item">
                    <div className="services__img">
                        <img src="./transportiration.webp" alt="перевозка бытовок"/>
                    </div>
                    <div className="services__contant">
                        <div className="star">★★★★★</div>
                        <p>перевозка бытовок и контейнеров</p>
                        <div className="services__contantPrice">
                            <Link to="/" className="more">подробнее</Link>
                            <p>От 8000₽</p>
                        </div>
                    </div>
                </div>
                <div className="services__item">
                    <div className="services__img">
                        <img src="./cubinsForWork.webp" alt=""/>
                    </div>
                    <div className="services__contant">
                        <div className="star">★★★★☆</div>
                        <p>арендна бытовок</p>
                        <div className="services__contantPrice">
                            <Link to="/katalog" className="more">подробнее</Link>
                            <p>От 5000₽</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
