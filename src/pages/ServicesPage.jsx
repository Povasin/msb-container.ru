import React from 'react'
import "./css/services.css"
export default function ServicesPage() {
  return (
    <main>   
        <div className="services__wrapper">
            <span><a href="../index.html">главная </a>/<a href="./services.html"> услуги</a></span>      
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
                            <a href="#" className="more">подробнее</a>
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
                            <a href="#" className="more">подробнее</a>
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
                            <a href="#" className="more">подробнее</a>
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
                            <a href="../katalog/katalog.html" className="more">подробнее</a>
                            <p>От 5000₽</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
