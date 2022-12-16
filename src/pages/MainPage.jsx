import React from 'react'
import "./css/main.css"
import {DATA , furniture} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import FurnitureCard from "../shared/componets/furnitureCard/index"
import { Link } from 'react-router-dom'

export default function MainPage() {
    return (
        <main>
            <div className="fd-row">
                <div className="slider">
                    <div className="slides">
                        <input type="radio" name="r" id="r1" defaultChecked/>
                        <input type="radio" name="r" id="r2"/>
                        <input type="radio" name="r" id="r3"/>
                        <input type="radio" name="r" id="r4"/>
                        <div className="slide s1">
                            <div className="slide__contant">
                                <div className="slide__text">
                                    <h2>Бытовки для проживания</h2>
                                    <p>Аренда бытовок от 5000руб</p>
                                </div>
                                <div className="slide__button">
                                    <Link to="/card/2" className="more">подробнее</Link>
                                </div>
                            </div>
                            <div className="slide__radius">
                                <img decoding="async" src="/cubinsForLive.webp" alt="бытовки для проживания"/>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="slide__contant">
                                <div className="slide__text">
                                    <h2>Бытовки под склад</h2>
                                    <p>доствка по всей россии</p>
                                </div>
                                <div className="slide__button">
                                    <Link to="/card/5" className="more">подробнее</Link>
                                </div>
                            </div>
                            <div className="slide__radius">
                                <img decoding="async" src="/cubinsForwareHouse.webp" alt="бытовки под склад"/>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="slide__contant">
                                <div className="slide__text">
                                    <h2>Бытовки c душем</h2>
                                    <p>лучшие бытовки</p>
                                </div>
                                <div className="slide__button">
                                    <Link to="/card/3" className="more">подробнее</Link>
                                </div>
                            </div>
                            <div className="slide__radius">
                                <img decoding="async" src="/cubinsForBath.webp" alt="бытовки с душем"/>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="slide__contant">
                                <div className="slide__text">
                                    <h2>Бытовки прорабские </h2>
                                    <p>Аренда бытовок от 5000руб</p>
                                </div>
                                <div className="slide__button">
                                    <Link to="/card/4" className="more">подробнее</Link>
                                </div>
                            </div>
                            <div className="slide__radius">
                                <img decoding="async" src="/cubinsForWork.webp" alt="бытовки прорабские"/>
                            </div>
                        </div>
                        <div className="navigation-auto">
                            <div className="auto-btn1"></div>
                            <div className="auto-btn2"></div>
                            <div className="auto-btn3"></div>
                            <div className="auto-btn4"></div>
                        </div>
                    </div>
                    <div className="navigation">
                        <label htmlFor="r1" className="navigation__bar"></label>
                        <label htmlFor="r2" className="navigation__bar"></label>
                        <label htmlFor="r3" className="navigation__bar"></label>
                        <label htmlFor="r4" className="navigation__bar"></label>
                    </div>
                </div>
                <div className="one__card">
                    <ProductCard key={0} item={DATA[0]}/>
                </div>
            </div>
            <div className="line"></div>
            <div className="advantages-row">
                <div className="advantages">
                    <img decoding="async" src="/money.svg" alt="аренда"/>
                    <div className="advantages__content">
                        <h2>Аренда без залога</h2>
                        <p>мы предлагаем аренду бытовок и контейнеров без залога</p>
                    </div>
                </div>
                <div className="advantages">
                    <img decoding="async" src="/discount.svg" alt="скидка"/>
                    <div className="advantages__content">
                        <h2>Скидка от 3х месяцев</h2>
                        <p>Особые условия сотрудничества для постоянных клиентов</p>
                    </div>
                </div>
                <div className="advantages">
                    <img decoding="async" src="/services.svg" alt="сервис"/>
                    <div className="advantages__content">                     
                        <h2>Качественный сервис</h2>
                        <p>Поможем с обслуживанием товара и предоствим ремонт техники</p>
                    </div>
                </div>
            </div> 
            <div className="line"></div>
            <div className="fd-row">
                <div className="content">
                    <h3>MSB</h3>
                    <h2>Cобери свой идеальный комплект бытовки</h2>
                    <p>мы предлагаем собрать комплект мебели и обарудывания для твоей бытовки</p>
                    <select className="choose__more">
                        <option value="/emptyCubins.webp">выбрать формат</option>
                        <option value="/cubinsForDress.webp">бытовка раздевалка</option>
                        <option value="/cubinsForWork.webp">бытовка прорабская</option>
                        <option value="/cubinsForLive.webp">бытовка для проживания </option>
                        <option value="/cubinsForBath.webp"> бытовка с душем</option>
                    </select>
                    <div className="fd-row">
                        <Link to="/" className="content__Youtube"><div className="block1"></div></Link>
                        <Link to="/"> <p className="content__text">Наш Youtube канал</p></Link>
                    </div>
                </div>
                <div className="choose">
                    <select className="choose__more">
                        <option className="option" value="/emptyCubins.webp">выбрать формат</option>
                        <option className="option" value="/cubinsForDress.webp">бытовка раздевалка</option>
                        <option className="option" value="/cubinsForWork.webp">бытовка прорабская</option>
                        <option className="option" value="/cubinsForLive.webp">бытовка для проживания </option>
                        <option className="option" value="/cubinsForBath.webp"> бытовка с душем</option>
                    </select>
                <div className="choose__img"><img decoding="async" src="/emptyCubins.webp" alt="бытовка пустая"/></div> 
                </div>
            </div>
            <div className="furniture">
                    <div className="content">
                        <h2>выберети мебель и оборудывание</h2>
                        <p>для создание комплекта вам нужно выбрать мебель</p>
                        <div className="fd-row">
                            <button className="prevFurniture">←</button>
                            <button className="nextFurniture next__active">→</button>
                        </div>
                    </div>
                    <div className="slider">
                        <div className="furniture-line">
                            {furniture.map((item, index) => <FurnitureCard key={index} item={item}/>)}
                        </div>
                    </div>
            </div>
            <div className="line"></div>
            <div className="katalog">
                <div className="katalog-row">
                    <h2>Лидеры продаж</h2>
                    <button className="prev" >←</button>
                    <button className="next">→</button>
                </div>
                <div className="slider">
                    <div className="katalog-line">
                    {DATA.map((item, index) => <ProductCard key={index} item={item}/>)}
                    </div>
                </div>
                <Link to="/katalog" className="more">посмотреть все бытовки</Link>
            </div>
            <div className="line"></div>
        </main>
    )
}
