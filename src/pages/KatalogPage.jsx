import React, { useState,useEffect } from 'react'
import "./scss/katalog.scss"
import { useSelector } from 'react-redux'
import ProductCard from "../shared/componets/ProdactCard"
import { Link, useLocation } from 'react-router-dom'
import {cardsSlice, getCards} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';

export default function KatalogPage() {
    const location = useLocation()
    const cards = useSelector((state)=>state.cardsSlice)
    console.log(cards);
    const [slider, setSlider] = useState({
        sliderOne: 1000,
        sliderTwo: 20000
    })
    const [content, setContent] = useState({
        min: 1,
        max: 100
    })
    const [starsChecked, setStarsChecked] = useState({
        "★★★★★": false,
        "★★★★☆": false,
        "★★★☆☆": false,
        "★★☆☆☆": false
    })
    const [nameChecked ,setNameChecked] = useState({
        "Бытовки раздевалки": false,
        "Бытовки для проживания": false,
        "Бытовки c душем": false,
        "Бытовки прорабские": false,
        "Бытовки под склад": false
    })
    const [sizeChecked ,setSizeChecked] = useState({
        "6х2,4х2,50м": false,
        "2,5х2,5х3,0м": false,
        "6х2,4х2,4м": false
    })
    const [showSideBar, setShowSideBar] = useState(false)
    const [cardsState, setCardsState] = useState([])
    const [showFirstFillter, setShowFirstFillter] = useState({
        state: false,
        active: "популярные"
    })
    function allCheckboxFalse(object) {
        let flag = true;
        Object.values(object).forEach(x=>{
            if (x) {flag = false}})
        return flag
    }

    function checkSliderOne(e) {
        if (e.target.value < slider.sliderTwo) {
            setSlider(prevInput => ({...prevInput, sliderOne: e.target.value}))
        }
    }
    function checkSliderTwo(e) {
        if (e.target.value > slider.sliderOne) {
            setSlider(prevInput => ({...prevInput, sliderTwo: e.target.value}))
        }
    }
    function filterData() {
        const filterMass = cards.items.filter(item => {
            let trueItem = true;
       
            trueItem = trueItem &&  (slider.sliderOne <= item.price && slider.sliderTwo >= item.price ? true : false)
            trueItem = trueItem &&  (content.min <= item.content && content.max >= item.content ? true : false)
            if (!allCheckboxFalse(sizeChecked)) {
                trueItem = trueItem &&  (sizeChecked[item.size] ? true : false)
            }
            if (!allCheckboxFalse(starsChecked)) {
                trueItem =  trueItem && (starsChecked[item.star] ? true : false)
            }
            
            if (!allCheckboxFalse(nameChecked)) {
                console.log(trueItem);
                trueItem = trueItem && (nameChecked[item.role] ? true : false)
            } else{
                trueItem = trueItem && (item.role == "общая" ? true : false)
            }
            return trueItem
        })
        setCardsState(filterMass)
        return showFirstFillter.active == "популярные" ?  filterMass.sort(function (a, b) {return a.content - b.content;}) : showFirstFillter.active == "дешевле" ? filterMass.sort(function (a, b) {return a.price - b.price;}) : showFirstFillter.active == "дороже" &&  filterMass.sort(function (a, b) {return b.price - a.price;})
    }


    function clear() {
        for (const key in starsChecked) {setStarsChecked(starsChecked[key] = false)}
        for (const key in sizeChecked) {setSizeChecked(sizeChecked[key] = false)}
        for (const key in nameChecked) {setNameChecked(nameChecked[key] = false)}
        setContent({min: 1, max: 10})
        setSlider({sliderOne: 1000, sliderTwo: 20000})
    }

    function ShowFillter() {
        return (
        <div className="katalog__filter">
            <div className="katalog-row">
                <h2>цена</h2>
                <p className="filter__close" onClick={()=>setShowSideBar(!showSideBar)} >x</p>
            </div>
            <div className="katalog-row">
                <label className="label__price"> от <p>{slider.sliderOne}</p> </label>
                <label className="label__price"> до <p>{slider.sliderTwo}</p></label>
            </div>
            <div className="container">
                <div className="slider-track"  style={{background: `linear-gradient(to right, #dadae5 ${(slider.sliderOne / 20000) * 100}% ,#5134c4 ${ (slider.sliderOne / 10000) * 100}% ,#b856d4 ${(slider.sliderTwo / 20000) * 100}%, #dadae5 ${(slider.sliderTwo / 20000) * 100}%)`}}></div>
                <label><input type="range" min="0" max="19999" value={slider.sliderOne} id="slider-1" onChange={(e)=>checkSliderOne(e)}/></label>
                <label><input type="range" min="10" max="20000" value={slider.sliderTwo} id="slider-2" onChange={(e)=>checkSliderTwo(e)}/></label>
            </div>
            <div className="katalog-name">
                <h2>Наименование</h2>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки раздевалки": !nameChecked["Бытовки раздевалки"]})} checked={nameChecked["Бытовки раздевалки"]}/>Бытовки раздевалки</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки для проживания": !nameChecked["Бытовки для проживания"]})} checked={nameChecked["Бытовки для проживания"]}/>Бытовки для проживания</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки c душем": !nameChecked["Бытовки c душем"]})} checked={nameChecked["Бытовки c душем"]}/> Бытовки c душем</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки под склад": !nameChecked["Бытовки под склад"]})} checked={nameChecked["Бытовки под склад"]}/>Бытовки под склад</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки прорабские": !nameChecked["Бытовки прорабские"]})} checked={nameChecked["Бытовки прорабские"]}/>Бытовки прорабские</label>
            </div>
            <div className="katalog-size">
                <h2>Габариты</h2>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,50м": !sizeChecked["6х2,4х2,50м"]})} checked={sizeChecked["6х2,4х2,50м"]}/>6х2,4х2,50м</label>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "2,5х2,5х3,0м": !sizeChecked["2,5х2,5х3,0м"]})} checked={sizeChecked["2,5х2,5х3,0м"]}/>2,5х2,5х3,0м</label>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,4м": !sizeChecked["6х2,4х2,4м"]})} checked={sizeChecked["6х2,4х2,4м"]}/>6х2,4х2,4м</label>
            </div>
                <h2>Вместимость</h2>
                <div className="katalog-row">
                    <label className="label__price"> от <input type="text" maxLength="2" value={content.min} onChange={(e)=>setContent({...content, min: e.target.value})} className="katalog__price" /></label>
                    <label className="label__price"> до <input type="text" maxLength="3" value={content.max} onChange={(e)=>setContent({...content, max: e.target.value})}  className="katalog__price"/></label>
                </div>
            <div className="katalog-star">
                <h2>Рейтинг покупателей</h2>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★★": !starsChecked["★★★★★"]})} checked={starsChecked["★★★★★"]}/>★★★★★</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★☆": !starsChecked["★★★★☆"]})} checked={starsChecked["★★★★☆"]}/>★★★★☆</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★☆☆": !starsChecked["★★★☆☆"]})} checked={starsChecked["★★★☆☆"]}/>★★★☆☆</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★☆☆☆": !starsChecked["★★☆☆☆"]})} checked={starsChecked["★★☆☆☆"]}/>★★☆☆☆</label>
            </div>
            <button id="clear" onClick={clear}>Очистить</button>
        </div>
        )
     }

    useEffect(()=>{
        store.dispatch(getCards({}))
    }, [])
    useEffect(()=>{
        cards.items.length != 0 && filterData()
    }, [sizeChecked,starsChecked, nameChecked, content, slider, showFirstFillter.state , cards.items])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <main>
            <div className="katalog">
                <span><Link to="/">главная </Link>/<Link to="/katalog"> каталог</Link></span>
                <h1>Бытовки</h1>
                <div className="katalog-row">
                        <p className='firstFilter'>Сначала:   
                            <div id="firstFilter">
                            <p className='active' onClick={()=>setShowFirstFillter({...showFirstFillter, state: true})}> {showFirstFillter.active}</p> 
                            {showFirstFillter.state && <div className='select'>
                                <p onClick={()=>setShowFirstFillter({active: "популярные", state: false})}>популярные</p>
                                <p onClick={()=>setShowFirstFillter({active: "дешевле", state: false})}>дешевле</p>
                                <p onClick={()=>setShowFirstFillter({active: "дороже", state: false})}>дороже</p>
                            </div>}    
                            </div>
                        </p>
                        <label className="katalog__kol">на странице: <span id="kolOnPage">{cardsState.length}</span></label>
                        <div className="filter__open" onClick={()=>setShowSideBar(!showSideBar)}><img src="./filter.webp" alt="фильтры"/><p>фильтры</p></div>
                </div>
                <div className="katalog-row">
                    {document.documentElement.clientWidth > 1024 && ShowFillter()}
                    {document.documentElement.clientWidth < 1024 && showSideBar && ShowFillter()}
                    <div className="katalog-line">
                        {cardsState.length == 0 ?  <div className="bag__clear"><h2>По вашему запросу ничего не найдено</h2><p>измените фильтры и попробуйте еще раз</p></div> : cardsState.map((item, index) => <ProductCard key={index} item={item}/>)}
                    </div>
                </div>
            </div>
        </main>
    )
}