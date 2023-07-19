import React,  { useState, useEffect}  from 'react'
import ProductCard from "../shared/componets/ProdactCard"
import { Link } from 'react-router-dom'
import FurnitureSlider from "../shared/componets/slider/furniture"
import CubinsSlider from "../shared/componets/slider/cubins"
import {cardsSlice, getCards} from "../shared/store/slices/cards"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import "./scss/main.scss"
import LazyLoad from 'react-lazy-load';

export default function MainPage() {
    const [showSelect, setShowSelect] = useState({
        active: "выбрать формат",
        state: false,
        src: "/emptyCubins.webp"
    })
    const cards = useSelector((state)=>state.cardsSlice)
    useEffect(()=>{
        store.dispatch(getCards({}))
      }, [])
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
                                    <p>Аренда бытовок от 5000₽</p>
                                </div>
                                <div className="slide__button">
                                    <Link to="/card/2" className="more">подробнее</Link>
                                </div>
                            </div>
                            <LazyLoad className="slide__radius" threshold={ 0.20 }><img src="https://backend.msb-container.ru/uploads/1-cubinsForLive.webp" alt="бытовки для проживания"/></LazyLoad>
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
                            <LazyLoad className="slide__radius" threshold={ 0.20 }><img src="https://backend.msb-container.ru/uploads/4-cubinsForwareHouse.webp" alt="бытовки под склад"/></LazyLoad>
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
                            <LazyLoad className="slide__radius" threshold={ 0.20 }><img src="https://backend.msb-container.ru/uploads/3-cubinsForBath.webp" alt="бытовки с душем"/></LazyLoad>
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
                            <LazyLoad className="slide__radius" threshold={ 0.20 }><img src="https://backend.msb-container.ru/uploads/5-cubinsForWork.webp" alt="бытовки прорабские"/></LazyLoad>
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
                    <ProductCard key={0} item={cards.items[0]}/>
                </div>
            </div>
            <div className="line"></div>
            <div className="advantages-row">
                <div className="advantages">
                <img src="/money.svg" alt="аренда"/>
                    <div className="advantages__content">
                        <h2>Аренда без залога</h2>
                        <p>мы предлагаем аренду бытовок и контейнеров без залога</p>
                    </div>
                </div>
                <div className="advantages">
                <img src="/discount.svg" alt="скидка"/>
                    <div className="advantages__content">
                        <h2>Скидка от 3х месяцев</h2>
                        <p>Особые условия сотрудничества для постоянных клиентов</p>
                    </div>
                </div>
                <div className="advantages">
                <img src="/services.svg" alt="сервис"/>
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
                    <div className="fd-row">
                        <Link to="/" className="content__Youtube"><div className="block1"></div></Link>
                        <Link to="/"> <p className="content__text">Наш Youtube канал</p></Link>
                    </div>
                </div>
                <div className="choose">
                    <div className="choose__fd-col">
                        <p className="choose__more" onClick={()=>setShowSelect({...showSelect, state: true})} >{showSelect.active}</p>
                        {showSelect.state && <div className='select'>
                                <p onClick={()=>setShowSelect({active: "выбрать формат", state: false, src: "/emptyCubins.webp"})}>выбрать формат</p>
                                <p onClick={()=>setShowSelect({active: "бытовка раздевалка", state: false, src: "https://backend.msb-container.ru/uploads/2-cubinsForDress.webp"})}>бытовка раздевалка</p>
                                <p onClick={()=>setShowSelect({active: "бытовка прорабская", state: false, src: "https://backend.msb-container.ru/uploads/5-cubinsForWork.webp"})}>бытовка прорабская</p>
                                <p onClick={()=>setShowSelect({active: "бытовка для проживания", state: false, src: "https://backend.msb-container.ru/uploads/1-cubinsForLive.webp"})}>бытовка для проживания </p>
                                <p onClick={()=>setShowSelect({active: "бытовка с душем", state: false, src: "https://backend.msb-container.ru/uploads/3-cubinsForBath.webp"})}> бытовка с душем</p>
                        </div>}
                    </div>
                <div className="choose__img"><img src={showSelect.src} alt={showSelect.active}/></div>
                </div>
            </div>
            <FurnitureSlider/>
            <div className="line"></div>
             <CubinsSlider/>
            <div className="line"></div>
        </main>
    )
}
