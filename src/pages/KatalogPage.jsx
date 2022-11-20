import React from 'react'
import "./css/katalog.css"
export default function KatalogPage() {
  return (
    <main>
        <div className="katalog">
            <span><a href="../index.html">главная </a>/<a href="./katalog.html"> каталог</a></span>
            <h1>Бытовки</h1>
            <div className="katalog-row">
                    <p>Сначала:
                        <select name="filter" id="firstFilter">
                            <option value="popular">популярные</option>
                            <option value="cheap">дешевле</option>
                            <option value="expencive">дороже</option>
                        </select>
                    </p>
                    <label className="katalog__kol">на странице: <span id="kolOnPage">0</span></label>
                    <div className="filter__open"><img src="./filter.webp" alt="фильтры"/><p>фильтры</p></div>
            </div>
            <div className="katalog-row">
                <div className="katalog__filter">
                    <div className="katalog-row">
                        <h2>цена</h2>
                        <p className="filter__close">x</p>
                    </div>
                    <div className="katalog-row">
                        <label className="label__price"> от <input type="text" maxlength="4" value="1000" className="katalog__price" oninput="inputValue()" onkeypress="noDigits(event)"/></label>
                        <label className="label__price"> до <input type="text" maxlength="4" value="10000" className="katalog__price" oninput="inputValue()"onkeypress="noDigits(event)" /></label>
                    </div>
                    <div className="container">
                        <div className="slider-track"></div>
                        <label><input type="range" min="0" max="10000" value="1000" id="slider-1"/></label>
                        <label><input type="range" min="0" max="10000" value="10000" id="slider-2"/></label>
                    </div>
                    <div className="katalog-name">
                        <h2>Наименование</h2>
                        <label> <input type="checkbox" className="katalog__Checkbox0" value="Бытовки раздевалки"/>Бытовки раздевалки</label>
                        <label> <input type="checkbox" className="katalog__Checkbox1" value="Бытовки для проживания"/>Бытовки для проживания</label>
                        <label> <input type="checkbox" className="katalog__Checkbox2" value="Бытовки c душем"/>Бытовки c душем</label>
                        <label> <input type="checkbox" className="katalog__Checkbox3" value="Бытовки под склад"/>Бытовки под склад</label>
                        <label> <input type="checkbox" className="katalog__Checkbox4" value="Бытовки прорабские"/>Бытовки прорабские</label>
                    </div>
                    <div className="katalog-size">
                        <h2>Габариты</h2>
                        <label><input type="checkbox" className="katalog__Checkbox" value="6х2,4х2,50м"/>6х2,4х2,50м</label>
                        <label><input type="checkbox" className="katalog__Checkbox" value="2,5х2,5х3,0м"/>2,5х2,5х3,0м</label>
                        <label><input type="checkbox" className="katalog__Checkbox" value="6х2,4х2,4м"/>6х2,4х2,4м</label>
                    </div>
                        <h2>Вместимость</h2>
                        <div className="katalog-row">
                            <label className="label__price"> от <input type="text" maxlength="2" value="1" className="katalog__price" oninput="noDigits(event)" placeholder="1"/></label>
                            <label className="label__price"> до <input type="text" maxlength="2" value="10" className="katalog__price" oninput="noDigits(event)" placeholder="10"/></label>
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
                <div className="katalog-line"></div>
            </div>
        </div>
    </main>
  )
}
