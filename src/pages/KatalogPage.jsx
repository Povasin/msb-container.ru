import React, { useState,useEffect } from 'react'
import "./css/katalog.scss"
import {DATA} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import { Link, useLocation } from 'react-router-dom'
export default function KatalogPage() {

    //как вызвать функцию строка 140

    const location = useLocation()
    const [slider, setSlider] = useState({
        sliderOne: 1000,
        sliderTwo: 10000,
        minGap: 0,
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
        "Бытовки под склад": false,
    })
    const [sizeChecked ,setSizeChecked] = useState({
        "6х2,4х2,50м": false,
        "2,5х2,5х3,0м": false,
        "6х2,4х2,4м": false
    })

    const [filterCount, setFilterCount] = useState(0)
    function allCheckboxFalse(object) {
        let flag = true;
        Object.values(object).forEach(x=>{
            if (x) {flag = false}})
        return flag
    }
    
    function render(mass) {
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
        // setFilterCount(filterMass.length)
        return filterMass.map((item, index) => <ProductCard key={index} item={item}/>)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])


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
    return (
        <main>
            <div className="katalog">
                <span><Link to="/">главная </Link>/<Link to="/katalog"> каталог</Link></span>
                <h1>Бытовки</h1>
                <div className="katalog-row">
                        <p>Сначала:
                            <select name="filter" id="firstFilter">
                                <option value="popular">популярные</option>
                                <option value="cheap">дешевле</option>
                                <option value="expencive">дороже</option>
                            </select>
                        </p>
                        <label className="katalog__kol">на странице: <span id="kolOnPage">{filterCount}</span></label>
                        <div className="filter__open"><img src="./filter.webp" alt="фильтры"/><p>фильтры</p></div>
                </div>
                <div className="katalog-row">
                    <div className="katalog__filter">
                        <div className="katalog-row">
                            <h2>цена</h2>
                            <p className="filter__close">x</p>
                        </div>
                        <div className="katalog-row">
                            <label className="label__price"> от <p>{slider.sliderOne}</p> </label>
                            <label className="label__price"> до <p>{slider.sliderTwo}</p></label>
                        </div>
                        <div className="container">
                            <div className="slider-track"  style={{background: `linear-gradient(to right, #dadae5 ${(slider.sliderOne / 10000) * 100}% ,#5134c4 ${ (slider.sliderOne / 10000) * 100}% ,#b856d4 ${(slider.sliderTwo / 10000) * 100}%, #dadae5 ${(slider.sliderTwo / 10000) * 100}%)`}}></div>
                            <label><input type="range" min="0" max="9999"  value={slider.sliderOne}id="slider-1" onChange={(e)=>checkSliderOne(e)}/></label>
                            <label><input type="range" min="0" max="10000" value={slider.sliderTwo} id="slider-2" onChange={(e)=>checkSliderTwo(e)}/></label>
                        </div>
                        <div className="katalog-name">
                            <h2>Наименование</h2>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки раздевалки": !nameChecked["Бытовки раздевалки"]})}/>Бытовки раздевалки</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки для проживания": !nameChecked["Бытовки для проживания"]})}/>Бытовки для проживания</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки c душем": !nameChecked["Бытовки c душем"]})}/> Бытовки c душем</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки под склад": !nameChecked["Бытовки под склад"]})}/>Бытовки под склад</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setNameChecked({...nameChecked,  "Бытовки прорабские": !nameChecked["Бытовки прорабские"]})}/>Бытовки прорабские</label>
                            <label> <input type="checkbox" className="katalog__Checkbox"/>Мебель</label>
                        </div>
                        <div className="katalog-size">
                            <h2>Габариты</h2>
                            <label><input type="checkbox" className="katalog__Checkbox"  onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,50м": !sizeChecked["6х2,4х2,50м"]})} />6х2,4х2,50м</label>
                            <label><input type="checkbox" className="katalog__Checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "2,5х2,5х3,0м": !sizeChecked["2,5х2,5х3,0м"]})} />2,5х2,5х3,0м</label>
                            <label><input type="checkbox" className="katalog__Checkbox" onClick={()=>setSizeChecked({...sizeChecked,  "6х2,4х2,4м": !sizeChecked["6х2,4х2,4м"]})} />6х2,4х2,4м</label>
                        </div>
                            <h2>Вместимость</h2>
                            <div className="katalog-row">
                                <label className="label__price"> от <input type="text" maxLength="2" value={content.min} onChange={(e)=>setContent({...content, min: e.target.value})} className="katalog__price" /></label>
                                <label className="label__price"> до <input type="text" maxLength="2" value={content.max} onChange={(e)=>setContent({...content, max: e.target.value})}  className="katalog__price"/></label>
                            </div>
                        <div className="katalog-star">
                            <h2>Рейтинг покупателей</h2>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★★": !starsChecked["★★★★★"]})}/>★★★★★</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★★☆": !starsChecked["★★★★☆"]})}  />★★★★☆</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★★☆☆": !starsChecked["★★★☆☆"]})} />★★★☆☆</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setStarsChecked({...starsChecked,  "★★☆☆☆": !starsChecked["★★☆☆☆"]})} />★★☆☆☆</label>
                        </div>
                        <button id="clear">Очистить</button>
                    </div>
                    <div className="katalog-line">
                        {!nameChecked["Бытовки раздевалки"] && !nameChecked["Бытовки для проживания"] && !nameChecked["Бытовки c душем"] && !nameChecked["Бытовки прорабские"] && !nameChecked["Бытовки под склад"] && render(DATA) }
                        {nameChecked["Бытовки раздевалки"] &&  render(DATA[0].mass)}
                        {nameChecked["Бытовки для проживания"] && render(DATA[1].mass)}
                        {nameChecked["Бытовки c душем"] && render(DATA[2].mass)}
                        {nameChecked["Бытовки прорабские"] && render(DATA[3].mass)}
                        {nameChecked["Бытовки под склад"] && render(DATA[4].mass)}
                        {filterCount == 0 &&  <div className="bag__clear"><h2>По вашему запросу ничего не найдено</h2><p>измените фильтры и попробуйте еще раз</p></div>}
                    </div>
                </div>
            </div>
        </main>
    )
}
