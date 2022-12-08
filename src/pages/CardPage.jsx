import React, {useEffect} from 'react'
import FurnitureCard from "../shared/componets/furnitureCard/index"
import {DATA , furniture} from "../DATA/Data"
import { useLocation, useNavigate } from 'react-router-dom'
export default function CardPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const location = useLocation()
    const navigate = useNavigate()
    const CardId = location.pathname.split("/")[2]
    const item = DATA.find((item)=>item.id == CardId) ?? navigate("/")
    return (
        <main>
            <div className="transportation_wrapper">
                <span><a href="../index.html">главная </a>/<a href="../katalog/katalog.html"> каталог</a>/<a href="#">{item.name}</a></span>      
                <div className="transportation">
                    <div className="transportation__block">
                        <div className="slider-wrapper">
                            <p className="prev">{'>'}</p>
                            <div className="slider">
                                <div className="slider-line">
                                    <img className="slider__img active" src={item.img} alt={item.img}/>
                                    <img className="slider__img" src={item.img} alt={item.img}/>
                                    <img className="slider__img" src={item.img} alt={item.img}/>
                                    <img className="slider__img" src={item.img} alt={item.img}/>
                                    <img className="slider__img" src={item.img} alt={item.img}/>
                                </div>
                            </div>
                            <p className="next active">{'>'}</p>
                        </div>
                        <div className="transportation__img">
                            <div className="star">★★★★☆</div>
                            <img className="main__img"  src={item.img} alt={item.img}/>
                            <a href="../gallary/gallary.html" className="chooseMore">выбрать формат</a>
                        </div>
                    </div>
                    <div className="transportation__contant">
                        <h1>{item.name}</h1>
                        <p>вместимость: <span>{item.content} человек</span></p>
                        <p>Габариты: <span>{item.size}</span></p>
                        <p>Внутренняя отделка: <span>{item.finishing}</span></p>
                        <p>Состояние:<span>{item.states}</span></p>
                        <p className="transportation__all">Все характеристки</p>
                        <div className="transportation__row">
                            <p className="price">{item.discount}</p> 
                            <p className="discount">{item.price}</p>
                        </div>
                        <div className="fd-row">
                            <div className="fd-row">
                                <div className="quantity_inner">		
                                    <button className="bt_minus">-</button>
                                    <label className="fd-col">количество<input type="text" value={item.inputkol} size="2" className="quantity" /></label>
                                    <button className="bt_plus">+</button>
                                </div>
                                <div className="quantity_inner">		
                                    <button className="bt_minusMonth">-</button>
                                    <label className="fd-col">месяцев<input type="text" value={item.inputMonth} size="2" className="quantity" /></label>
                                    <button className="bt_plusMonth">+</button>
                                </div>
                            </div>
                        </div>
                        <button className="more">добавить услугу</button>
                    </div>
                </div>
                <div className="transportation__info">
                    <h2>О товаре</h2>
                    <h3>описание</h3>
                    <p>{item.text}</p>
                    <h3>Преимущества хранения и перевозки от нашей компании:</h3>
                    <ul>
                        <li>быстрая установка;</li>
                        <li>окно и двери герметизированы, утепление по всему периметру;</li>
                        <li>усиленная конструкция;</li>
                        <li>высокая мобильность;</li>
                        <li>долговечность;</li>
                        <li>удобство.</li>
                    </ul>
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
        </main>
       
    )
}
