import React, { useState,useEffect } from 'react'
import "./css/katalog.scss"
import {DATA} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import { Link, useLocation } from 'react-router-dom'
export default function KatalogPage() {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])
    const [slider, setSlider] = useState({
        sliderOne: 1000,
        sliderTwo: 10000,
        minGap: 0,
    })

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
                        <label className="katalog__kol">на странице: <span id="kolOnPage"></span></label>
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
                            <label><input type="range" min="0" max="9999"  value={slider.sliderOne}id="slider-1" onChange={(e)=>setSlider(prevInput => ({...prevInput, sliderOne: e.target.value}))} onInput={ slider.sliderTwo - slider.sliderOne <= slider.minGap ? ()=>setSlider(prevInput => ({...prevInput, sliderOne: slider.sliderTwo - slider.minGap })) : null }/></label>
                            <label><input type="range" min="0" max="10000" value={slider.sliderTwo} id="slider-2" onChange={(e)=>setSlider(prevInput => ({...prevInput, sliderTwo: e.target.value}))} onInput={ slider.sliderTwo - slider.sliderOne <= slider.minGap ? ()=>setSlider(prevInput => ({...prevInput, sliderTwo: slider.sliderOne + slider.minGap })) : null }/></label>
                        </div>
                        <div className="katalog-name">
                            <h2>Наименование</h2>
                            <label> <input type="checkbox" className="katalog__Checkbox0" value="Бытовки раздевалки"/>Бытовки раздевалки</label>
                            <label> <input type="checkbox" className="katalog__Checkbox1" value="Бытовки для проживания"/>Бытовки для проживания</label>
                            <label> <input type="checkbox" className="katalog__Checkbox2" value="Бытовки c душем"/>Бытовки c душем</label>
                            <label> <input type="checkbox" className="katalog__Checkbox3" value="Бытовки под склад"/>Бытовки под склад</label>
                            <label> <input type="checkbox" className="katalog__Checkbox4" value="Бытовки прорабские"/>Бытовки прорабские</label>
                            <label> <input type="checkbox" className="katalog__Checkbox4" value="Бытовки прорабские"/>Мебель</label>
                        </div>
                        <div className="katalog-size">
                            <h2>Габариты</h2>
                            <label><input type="checkbox" className="katalog__Checkbox" value="6х2,4х2,50м"/>6х2,4х2,50м</label>
                            <label><input type="checkbox" className="katalog__Checkbox" value="2,5х2,5х3,0м"/>2,5х2,5х3,0м</label>
                            <label><input type="checkbox" className="katalog__Checkbox" value="6х2,4х2,4м"/>6х2,4х2,4м</label>
                        </div>
                            <h2>Вместимость</h2>
                            <div className="katalog-row">
                                <label className="label__price"> от <input type="text" maxLength="2" value="1" className="katalog__price"  /*onInput="noDigits(event)"*/ placeholder="1"/></label>
                                <label className="label__price"> до <input type="text" maxLength="2" value="10" className="katalog__price" /*onInput="noDigits(event)"*/ placeholder="10"/></label>
                            </div>
                        <div className="katalog-star">
                            <h2>Рейтинг покупателей</h2>
                            <label> <input type="checkbox" className="katalog__Checkbox" value="★★★★★"/>★★★★★</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" value="★★★★☆"/>★★★★☆</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" value="★★★☆☆"/>★★★☆☆</label>
                            <label> <input type="checkbox" className="katalog__Checkbox" value="★★☆☆☆"/>★★☆☆☆</label>
                        </div>
                        <button id="clear">Очистить</button>
                    </div>
                    <div className="katalog-line">
                        {DATA.map((item, index) => <ProductCard key={index} item={item}/>)}
                    </div>
                </div>
            </div>
        </main>
    )
}
