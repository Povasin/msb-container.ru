import React, {useEffect, useState, useRef} from 'react'
import {cardsSlice, getCards, getCardsImg} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {BagSlice} from "../shared/store/slices/bag"
import {useSelector} from "react-redux";
import FurnitureSlider from "../shared/componets/slider/furniture"
import "./scss/cubinsForSomeThing.scss"
import ProductCard from "../shared/componets/ProdactCard"

function useOnClickOutside(refModal, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          if (!refModal.current || refModal.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }
    )
}

export default function CardPage() {
    const cards = useSelector((state)=>state.cardsSlice)
    const location = useLocation()
    const navigate = useNavigate()
    const [stateScroll, setStateScroll] = useState({
        isScrolling: false,
        clientX: 0,
        scrollX: 0
    })
    const item = cards.items.find((item)=>item?.idCard == location.pathname.split("/")[2]) 
    let itemImg = [{src: item?.img, active: true}] 
    if (cards.img?.filter((item)=>item?.idCard == location.pathname.split("/")[3]) != undefined) {
        let cardsImg =  cards.img.filter((item)=>item?.idCard == location.pathname.split("/")[2] && item?.active == 'true')
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
    const [modal, setModal] = useState(false)
    const refModal = useRef()
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
    function onMouseMove(e) {
        if (slider && slider.current && !slider.current.contains(e.target)) {
            return
        }
        e.preventDefault()
        const {clientX, scrollX, isScrolling} = stateScroll
        if (isScrolling) {
            slider.current.scrollLeft = scrollX + e.clientX - clientX
            setStateScroll({...stateScroll, scrollX: scrollX + e.scrollX - clientX, clientX: e.clientX })
        }
    }
    function onMouseDown(e) {
        if (slider && slider.current && !slider.current.contains(e.target)) {
            return
        }
        e.preventDefault()
        setStateScroll({...stateScroll, isScrolling: true, clientX: e.clientX})
    }
    function onMouseUp(e) {
        if (slider && slider.current && !slider.current.contains(e.target)) {
            return
        }
        e.preventDefault()
        setStateScroll({...stateScroll, isScrolling: false})
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
  
    useEffect(()=>{
        store.dispatch(getCards({}))
        store.dispatch(getCardsImg({}))
        document.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)
        return ()=>{
            document.removeEventListener('mousedown', onMouseDown)
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('mousemove', onMouseMove)
        }
    }, [])
    useOnClickOutside(refModal, ()=>setModal(false))
    return (
        <main>
            {modal && 
               <div className="modalImg">
               <img ref={refModal} src={activeImg?.src == undefined ?  itemImg[0].src : activeImg?.src} alt={item?.name} />
                </div>     
            }
            <div className="transportation_wrapper">
            {document.documentElement.clientWidth > 630 &&  <span><Link to="/">главная </Link>/<Link to="/katalog"> каталог</Link>/<Link to="#"> {item?.name}</Link></span> }     
                <div className="transportation">
                    <div className="transportation__block">
                        <div className="slider-wrapper">
                        {itemImg.length > 3 &&  document.documentElement.clientWidth > 630 ? <p  className={`prev ${cubinsBTN.prev ? "active" : ""} `} onClick={sliderPrev}>{`<`}</p> : false}   
                           
                            {itemImg[0].src != 'false' && <div className="slider">
                                <div className="slider-line" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} ref={slider}>
                                    {itemImg.map((point, index)=><div className={`slider__block__img ${activeImg.src == point.src ? `active` : ""} ${itemImg.length < 2 ? `bigMargin` : ""}`}><img className={`slider__img`} onClick={()=>changeActiveImg(point)} src={point.src} key={index} alt={item?.name}/></div>)}
                                </div>
                            </div> } 
                        {itemImg.length > 3 && document.documentElement.clientWidth > 630 ? <p className={`next ${cubinsBTN.next ? "active" : ""} `} onClick={sliderNext} >{`>`}</p> : false}   
                        </div>
                        {document.documentElement.clientWidth < 630 && <div className="block__circle__wrapper">
                            {itemImg.length >= 1 && <div className="block__circle"></div> }
                            {itemImg.length >= 2 &&<div className="block__circle"></div> }
                            {itemImg.length >= 3 &&<div className="block__circle"></div> }
                            {itemImg.length >= 4 && <div className="block__circle"></div> }
                            {itemImg.length >= 5 &&<div className="block__circle"></div> }
                            {itemImg.length >= 6 &&<div className="block__circle"></div> }
                        </div>}
                        {document.documentElement.clientWidth > 630 &&  <div className="transportation__img">
                            <div className="star">{item?.star}</div>
                           {itemImg[0].src != 'false' ? 
                           <img className="main__img" onClick={()=>setModal(!modal)} src={activeImg?.src == undefined ?  itemImg[0].src : activeImg?.src} alt={item?.name}/>
                           :
                            <div className="img__empty">
                                <img  className="img__emptyPhoto" src='/emptyIcon.svg' alt={item?.name}/> 
                            </div>
                            } 
                            <Link to="/gallary" className="chooseMore">Выбрать из наличия</Link>
                        </div>}
                    </div>
                    <div className="transportation__contant">
                        <h1>{item?.name}</h1>
                        {document.documentElement.clientWidth > 1024 && <>
                            <p>Вместимость: <span>{item?.content} человек</span></p>
                            <p>Габариты: <span>{item?.size}</span></p>
                            <p>Внутренняя отделка: <span>{item?.finishing}</span></p>
                            <p>Состояние:<span>{item?.states}</span></p>
                        </>}
                      {document.documentElement.clientWidth < 630 &&   <div className="star__wrapper"><div className="star">{item?.star}</div><p>{item?.star == '★★★★★' && '5.0'}{item?.star == '★★★★☆' && '4.0'}{item?.star == '★★★☆☆' && '3.0'}{item?.star == '★★☆☆☆' && '2.0'}{item?.star == '★☆☆☆☆' && '1.0'} <span> / 81 оценок </span> </p></div> }
                        <div className="transportation__row">
                            <p className="price">{item?.have == 'true' ? `${item?.price}₽` : 'Нет в наличии'}</p> 
                            <p className="discount">{item?.have == 'true' && item?.discount}</p>
                        </div>
                        <div className="fd-rowInner">
                            <div className="quantity_inner">		
                                <button className="bt_minus" onClick={()=>{!isActive ?  changeValue(MainValue.count-1, "count") : changeProdactCount(isActive.count-1)}}>–</button>
                                    <label className="fd-col">количество<span className="quantity">{!isActive ? MainValue.count : isActive.count}</span></label>
                                <button className="bt_plus" onClick={()=>{!isActive ?  changeValue(MainValue.count+1, "count") : changeProdactCount(isActive.count+1)}}>+</button>
                            </div>
                            <div className="quantity_inner">		
                                <button className="bt_minusMonth" onClick={()=>{!isActive ?  changeValue(MainValue.month-1, "month") : changeProdactMonth(isActive.month-1)}}>–</button>
                                <label className="fd-col">месяцев<span className="quantity">{!isActive ? MainValue.month : isActive.month}</span></label>
                                <button className="bt_plusMonth" onClick={()=>{!isActive ?  changeValue(MainValue.month+1, "month") : changeProdactMonth(isActive.month+1)}}>+</button>
                            </div>
                        </div>
                        <button onClick={!isActive ? handleClick : null} className={`more ${isActive ? "moreActive" : null}`}>{!isActive ? "Добавить товар" : "Товар добавлен"}</button>
                    </div>
                </div>
                <div className="transportation__info">
                    {document.documentElement.clientWidth < 1024 && <>
                    <h2>Характеристики</h2>
                        <p className='transportation__caract'>Вместимость: <span>{item?.content} человек</span></p>
                        <p className='transportation__caract'>Габариты: <span>{item?.size}</span></p>
                        <p className='transportation__caract'>Внутренняя отделка: <span>{item?.finishing}</span></p>
                        <p className='transportation__caract'>Состояние:<span>{item?.states}</span></p>
                    </>}
                    <h2>О товаре</h2>
                    <h3>Описание</h3>
                    <p className='transportation__text'>{item?.text}</p>
                    {document.documentElement.clientWidth > 1024 && <>  
                    <h3>Преимущества хранения и перевозки от нашей компании:</h3>
                    <ul>
                        <li>быстрая установка;</li>
                        <li>окно и двери герметизированы, утепление по всему периметру;</li>
                        <li>усиленная конструкция;</li>
                        <li>высокая мобильность;</li>
                        <li>долговечность;</li>
                        <li>удобство.</li>
                    </ul>
                    </>}
                </div>
            </div>
            {document.documentElement.clientWidth > 630 ?  <FurnitureSlider/> :  <div className="mobile__katalog">
                <h2>Лидеры продаж</h2>
                <div className="mobile__katalogContainer">
                    {cards?.items.map((item, index)=>index < 6 && <ProductCard key={index} item={item}/>)}
                </div>
                <Link to="/katalog" className="more">Посмотреть все бытовки</Link>
            </div>}
           {document.documentElement.clientWidth < 630 &&  <div className="mobile__bag">
                <p>{item?.have == 'true' ? `${item?.price}₽` : 'Нет в наличии'}</p>
                <p>{item?.have == 'true' && item?.discount}</p>
                <button onClick={!isActive ? handleClick : null} className={`more ${isActive ? "moreActive" : null}`}>{!isActive ? "Добавить товар" : "Товар добавлен"}</button>
            </div>} 
        </main>
       
    )
}
