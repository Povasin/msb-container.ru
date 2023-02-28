import React, {useEffect, useState} from 'react'
import FurnitureCard from "../shared/componets/FurnitureCard"
import {DATA , furniture} from "../DATA/Data"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BagSlice} from "../shared/store/slices/bag"
import {store} from "../shared/store/slices/store"
import {useSelector} from "react-redux";
import "./scss/cubinsForSomeThing.scss"

export default function FurniturePage() {

    const location = useLocation()
    const navigate = useNavigate()
    const CardId = location.pathname.split("/")[2]
    const item = furniture.find((item)=>item.id == CardId) ?? navigate("/") 
    const [activeImg, setActiveImg] = useState(item.img.find((point)=>point.active == true))
    const [MainValue, setValue] = useState({
        count: 1,
        month: 1
    })

    function changeValue(value, key){
        if (value >= 1) {
            setValue({...MainValue, [key]: value})
        }
    }

    function handleClick(){

       store.dispatch(BagSlice.actions.addCard({id: item.id, data: item, count: MainValue.count, month: MainValue.month}));
    }
    const BagStore = useSelector((state) => state.BagSlice); 
    const isActive = BagStore.items.filter((array)=>array.id == item.id)[0]
    function changeProdactCount (value){
        if (value >= 1) {
            const newItems = [...BagStore.items.filter((item) => item.id !== isActive.id), {...isActive, count: value}] 
            store.dispatch(BagSlice.actions.updateBag(newItems));
        }
    }
    function changeProdactMonth (value){  
        if (value >= 1) {
            const newItems = [...BagStore.items.filter((item) => item.id !== isActive.id), {...isActive, month: value}] 
            store.dispatch(BagSlice.actions.updateBag(newItems));
        }
    }  

    function changeActiveImg(point) {
        for (let i = 0; i < item.img.length; i++) {
            item.img[i].active = false
        }
        point.active = true
        setActiveImg(point)
    } 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    return (
        <main>
            <div className="transportation_wrapper">
                <span><Link to="/">главная </Link>/<Link to="/katalog"> каталог</Link>/<Link to="#">{item.name}</Link></span>      
                <div className="transportation">
                    <div className="transportation__block">
                        <div className="slider-wrapper">
                            <p className="prev">{'<'}</p>
                            <div className="slider">
                                <div className="slider-line">
                                    {item.img.map((point, index)=><img className={`slider__img__furniture ${point.active ? `active` : ""}`} onClick={()=>changeActiveImg(point)} src={point.src} key={index} alt={item.name}/>)}
                                </div>
                            </div>
                            <p className="next active">{'>'}</p>
                        </div>
                        <div className="transportation__img">
                            <div className="star">★★★★☆</div>
                            <img className="main__img"  src={activeImg.src} alt={item.name}/>
                        </div>
                    </div>
                    <div className="transportation__contant">
                        <h1>{item.name}</h1>
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
                                    <button className="bt_minus" onClick={()=>{!isActive ?  changeValue(MainValue.count-1, "count") : changeProdactCount(isActive.count-1)}}>-</button>
                                        <label className="fd-col">количество<span className="quantity">{!isActive ? MainValue.count : isActive.count}</span></label>
                                    <button className="bt_plus" onClick={()=>{!isActive ?  changeValue(MainValue.count+1, "count") : changeProdactCount(isActive.count+1)}}>+</button>
                                </div>
                                <div className="quantity_inner">		
                                    <button className="bt_minusMonth" onClick={()=>{!isActive ?  changeValue(MainValue.month-1, "month") : changeProdactMonth(isActive.month-1)}}>-</button>
                                    <label className="fd-col">месяцев<span className="quantity">{!isActive ? MainValue.month : isActive.month}</span></label>
                                    <button className="bt_plusMonth" onClick={()=>{!isActive ?  changeValue(MainValue.month+1, "month") : changeProdactMonth(isActive.month+1)}}>+</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={!isActive ? handleClick : null} className={`more ${isActive ? "moreActive" : null}`}>{!isActive ? "добавить товар" : "товар добавлен"}</button>
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
