import React, { useState,useEffect } from 'react'
import "./css/katalog.scss"
import { useSelector } from 'react-redux'
import {DATA, furniture} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import { Link, useLocation } from 'react-router-dom'
import {cardsSlice, getCards} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';

export default function KatalogPage() {
    const location = useLocation()
    const cards = useSelector((state)=>state.cardsSlice)
    const [slider, setSlider] = useState({
        sliderOne: 1000,
        sliderTwo: 10000
    })
    const [content, setContent] = useState({
        min: 1,
        max: 10
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
    function filterData(mass) {
        const filterMass = mass.filter(item => {
            let trueItem = true;
            trueItem = trueItem &&  (slider.sliderOne <= item.price && slider.sliderTwo >= item.price ? true : false)
            trueItem = trueItem &&  (content.min <= item.content && content.max >= item.content ? true : false)
            if (!allCheckboxFalse(sizeChecked)) {
                trueItem = trueItem &&  (sizeChecked[item.size] ? true : false)
            }
            if (!allCheckboxFalse(starsChecked)) {
                trueItem =  trueItem && (starsChecked[item.star] ? true : false)
            }
            return trueItem
        })
        return showFirstFillter.active == "популярные" ?  filterMass.sort(function (a, b) {return a.content - b.content;}) : showFirstFillter.active == "дешевле" ? filterMass.sort(function (a, b) {return a.price - b.price;}) : showFirstFillter.active == "дороже" &&  filterMass.sort(function (a, b) {return b.price - a.price;})
         
    }


    function clear() {
        for (const key in starsChecked) {setStarsChecked(starsChecked[key] = false)}
        for (const key in sizeChecked) {setSizeChecked(sizeChecked[key] = false)}
        for (const key in nameChecked) {setNameChecked(nameChecked[key] = false)}
        setContent({min: 1, max: 10})
        setSlider({sliderOne: 1000, sliderTwo: 10000})
    }

    function controlFilter() {
        const obj = {"Бытовки раздевалки": DATA[0].mass,"Бытовки для проживания": DATA[1].mass,"Бытовки c душем": DATA[2].mass, 'Бытовки прорабские': DATA[3].mass, 'Бытовки под склад': DATA[4].mass}
        let innerArr = []
        for(let key in nameChecked) {
            if(nameChecked[key] === true) {
                innerArr = [...innerArr, ...filterData(obj[key])]
            }
        }
        innerArr.length > 0 ? setCardsState(innerArr) : setCardsState(filterData(DATA))
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
                <div className="slider-track"  style={{background: `linear-gradient(to right, #dadae5 ${(slider.sliderOne / 10000) * 100}% ,#5134c4 ${ (slider.sliderOne / 10000) * 100}% ,#b856d4 ${(slider.sliderTwo / 10000) * 100}%, #dadae5 ${(slider.sliderTwo / 10000) * 100}%)`}}></div>
                <label><input type="range" min="0" max="9999" defaultValue={slider.sliderOne} id="slider-1" onChange={(e)=>checkSliderOne(e)}/></label>
                <label><input type="range" min="0" max="10000" defaultValue={slider.sliderTwo} id="slider-2" onChange={(e)=>checkSliderTwo(e)}/></label>
            </div>
            <div className="katalog-name">
                <h2>Наименование</h2>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки раздевалки": !nameChecked["Бытовки раздевалки"]})} defaultChecked={nameChecked["Бытовки раздевалки"]}/>Бытовки раздевалки</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки для проживания": !nameChecked["Бытовки для проживания"]})} defaultChecked={nameChecked["Бытовки для проживания"]}/>Бытовки для проживания</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки c душем": !nameChecked["Бытовки c душем"]})} defaultChecked={nameChecked["Бытовки c душем"]}/> Бытовки c душем</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки под склад": !nameChecked["Бытовки под склад"]})} defaultChecked={nameChecked["Бытовки под склад"]}/>Бытовки под склад</label>
                <label> <input type="checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки прорабские": !nameChecked["Бытовки прорабские"]})} defaultChecked={nameChecked["Бытовки прорабские"]}/>Бытовки прорабские</label>
            </div>
            <div className="katalog-size">
                <h2>Габариты</h2>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,50м": !sizeChecked["6х2,4х2,50м"]})} defaultChecked={sizeChecked["6х2,4х2,50м"]}/>6х2,4х2,50м</label>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "2,5х2,5х3,0м": !sizeChecked["2,5х2,5х3,0м"]})} defaultChecked={sizeChecked["2,5х2,5х3,0м"]}/>2,5х2,5х3,0м</label>
                <label><input type="checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,4м": !sizeChecked["6х2,4х2,4м"]})} defaultChecked={sizeChecked["6х2,4х2,4м"]}/>6х2,4х2,4м</label>
            </div>
                <h2>Вместимость</h2>
                <div className="katalog-row">
                    <label className="label__price"> от <input type="text" maxLength="2" value={content.min} onChange={(e)=>setContent({...content, min: e.target.value})} className="katalog__price" /></label>
                    <label className="label__price"> до <input type="text" maxLength="2" value={content.max} onChange={(e)=>setContent({...content, max: e.target.value})}  className="katalog__price"/></label>
                </div>
            <div className="katalog-star">
                <h2>Рейтинг покупателей</h2>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★★": !starsChecked["★★★★★"]})} defaultChecked={starsChecked["★★★★★"]}/>★★★★★</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★☆": !starsChecked["★★★★☆"]})} defaultChecked={starsChecked["★★★★☆"]}/>★★★★☆</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★☆☆": !starsChecked["★★★☆☆"]})} defaultChecked={starsChecked["★★★☆☆"]}/>★★★☆☆</label>
                <label> <input type="checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★☆☆☆": !starsChecked["★★☆☆☆"]})} defaultChecked={starsChecked["★★☆☆☆"]}/>★★☆☆☆</label>
            </div>
            <button id="clear" onClick={clear}>Очистить</button>
        </div>
        )
     }

    // useEffect(()=>{
    //   store.dispatch(getCards({}))
    //   DATA[0].mass.push(cards.items.filter((item)=>item.role == "Бытовка для проживания") )  
    //   DATA[1].mass.push(cards.items.filter((item)=>item.role == "Бытовка прорабская") )  
    //   DATA[2].mass.push(cards.items.filter((item)=>item.role == "Бытовка раздевалка") )  
    //   DATA[3].mass.push(cards.items.filter((item)=>item.role == "Бытовка с душем") )  
    //   DATA[4].mass.push(cards.items.filter((item)=>item.role == "Бытовка под склад") )  
    // }, [])
    useEffect(controlFilter, [sizeChecked,starsChecked, nameChecked, content, slider, showFirstFillter.state])
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