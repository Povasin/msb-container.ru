import React, {useEffect, useState} from 'react'
import {cardsSlice, getCards, getCardsImg} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BagSlice} from "../shared/store/slices/bag"
import {useSelector} from "react-redux";
import FurnitureSlider from "../shared/componets/slider/furniture"
import "./scss/cubinsForSomeThing.scss"
import { useRef } from 'react'

export default function CardPage() {
    const cards = useSelector((state)=>state.cardsSlice)
    const location = useLocation()
    const navigate = useNavigate()
    const item = cards.items.find((item)=>item?.idCard == location.pathname.split("/")[2]) 
    let itemImg = [{src: item?.img, active: true}] 
    if (cards.img.filter((item)=>item?.idCard == location.pathname.split("/")[2]) != undefined) {
        let cardsImg =  cards.img.filter((item)=>item.idCard == location.pathname.split("/")[2] && item.active == 'true')
        cardsImg.map((imgCard, index)=>{
          itemImg = [...itemImg, {src: imgCard?.img, active: false}] 
        })
    } else {
        itemImg = [ {src: item?.img, active: true}]
    }
    const [activeImg, setActiveImg] = useState(itemImg[0])
    const [MainValue, setValue] = useState({
        count: 1,
        month: 1
    })
    const [cubinsSlider, setCubinsSlider] = useState(0)
    const [cubinsBTN , setCubinsBTN] = useState({
        next: true,
        prev: false
    })
    const slider = useRef()
    const BagStore = useSelector((state) => state.BagSlice); 
    const isActive = BagStore.items.filter((array)=>array.idCard == item?.idCard)[0]

    function sliderNext() {
        if (cubinsSlider < 100 && cubinsSlider >= 0) {
            setCubinsSlider(cubinsSlider+100)
            slider.current.style.top = -100 + '%' 
            setCubinsBTN({next:  false ,prev: true})
        } 
    }

    function sliderPrev() {
        if (cubinsSlider < 101 && cubinsSlider > 0 ) {
            setCubinsSlider(cubinsSlider-100)
            slider.current.style.top = 0 + '%' 
            setCubinsBTN({next:  true ,prev: false})
        }
    }

    function changeValue(value, key){
        if (value >= 1) {
            setValue({...MainValue, [key]: value})
        }
    }

    function handleClick(){
       store.dispatch(BagSlice.actions.addCard({...item, idCard: item?.idCard, count: MainValue.count, month: MainValue.month}));
    }

    function changeProdactCount (value){
        if (value >= 1) {
            const newItems = [...BagStore.items.filter((item) => item?.idCard !== isActive.idCard), {...isActive, count: value}] 
            store.dispatch(BagSlice.actions.updateBag(newItems));
        }
    }

    function changeProdactMonth (value){  
        if (value >= 1) {
            const newItems = [...BagStore.items.filter((item) => item?.idCard !== isActive.idCard), {...isActive, month: value}] 
            store.dispatch(BagSlice.actions.updateBag(newItems));
        }
    }  

    function changeActiveImg(point) {
        for (let i = 0; i < itemImg.length; i++) {
            itemImg[i].active = false
        }
        point.active = true
        setActiveImg(point)
    } 
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
  
    useEffect(()=>{
        store.dispatch(getCards({}))
        store.dispatch(getCardsImg({}))
    }, [])
    return (
        <main>
            <div className="transportation_wrapper">
                <span><Link to="/">главная </Link>/<Link to="/katalog"> каталог</Link>/<Link to="#"> {item?.name}</Link></span>      
                <div className="transportation">
                    <div className="transportation__block">
                        <div className="slider-wrapper">
                        {itemImg.length > 3 &&  <p  className={`prev ${cubinsBTN.prev ? "active" : ""} `} onClick={sliderPrev}>{`<`}</p>}   
                           
                            {itemImg[0].src != 'false' && <div className="slider">
                                <div className="slider-line" ref={slider}>
                                    {itemImg.map((point, index)=><img className={`slider__img ${activeImg.src == point.src ? `active` : ""} ${itemImg.length < 2 ? `bigMargin` : ""}`} onClick={()=>changeActiveImg(point)} src={point.src} key={index} alt={item?.name}/>)}
                                </div>
                            </div> } 
                        {itemImg.length > 3 &&  <p className={`next ${cubinsBTN.next ? "active" : ""} `} onClick={sliderNext} >{`>`}</p>}   
                        </div>
                        <div className="transportation__img">
                            <div className="star">{item?.star}</div>
                           {itemImg[0].src != 'false' ? 
                           <img className="main__img"  src={activeImg?.src == undefined ?  itemImg[0].src : activeImg?.src} alt={item?.name}/>
                           :
                            <div className="img__empty">
                                <img  className="img__emptyPhoto" src='/emptyIcon.svg' alt={item.name}/> 
                            </div>
                            } 
                            <Link to="/gallary" className="chooseMore">выбрать формат</Link>
                        </div>
                    </div>
                    <div className="transportation__contant">
                        <h1>{item?.name}</h1>
                        <p>вместимость: <span>{item?.content} человек</span></p>
                        <p>Габариты: <span>{item?.size}</span></p>
                        <p>Внутренняя отделка: <span>{item?.finishing}</span></p>
                        <p>Состояние:<span>{item?.states}</span></p>
                        <p className="transportation__all">Все характеристки</p>
                        <div className="transportation__row">
                            <p className="price">{item?.have == 'true' ? `${item?.price}₽` : 'Нет в наличии'}</p> 
                            <p className="discount">{item?.have == 'true' && item?.discount}</p>
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
                    <p>{item?.text}</p>
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
            <FurnitureSlider/>
        </main>
       
    )
}
