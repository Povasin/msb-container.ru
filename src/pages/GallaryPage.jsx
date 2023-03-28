import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import "./scss/galary.scss"
import ProductCard from "../shared/componets/ProdactCard"
import { Link, useLocation } from 'react-router-dom'
import {cardsSlice, getCards} from "../shared/store/slices/cards"

export default function GallaryPage() {
  const location = useLocation()
  const cards = useSelector((state)=>state.cardsSlice)
  useEffect(() => {
      window.scrollTo(0, 0)
  }, [location]) 
  function filter(role) {
    return cards.items.filter((item, index) => item.role == role && <ProductCard key={index} item={item}/> )
  }
  console.log(filter('общая').length);
  useEffect(()=>{
    store.dispatch(getCards({}))
  }, [])
  return (
    <main>   
        <div className="gallary">
            <span><Link to="/">главная </Link>/<Link to="/gallary"> Виды товаров</Link></span>
            {filter('Бытовки для проживания').length > 0 && <>
              <h1>Бытовки для проживания</h1>
              <div className="gallary__item">
                {cards.items.map((item, index) => item.role == 'Бытовки для проживания' && <ProductCard key={index} item={item}/> )}
              </div>
            </>}
            {filter('Бытовки прорабские').length > 0 && <>
              <h1>Бытовки прорабские</h1>
              <div className="gallary__item">
                {cards.items.map((item, index) => item.role == 'Бытовки прорабские' && <ProductCard key={index} item={item}/> )}
              </div>
            </>}
           {filter('Бытовки раздевалки').length > 0 && <>
            <h1>Бытовки раздевалки</h1>
            <div className="gallary__item">
              {cards.items.map((item, index) => item.role == 'Бытовки раздевалки' && <ProductCard key={index} item={item}/> )}
            </div>
           </>}
           {filter('Бытовки с душем').length > 0 && <>
           <h1>Бытовки с душем</h1>
            <div className="gallary__item">
            {cards.items.map((item, index) => item.role == 'Бытовки с душем' && <ProductCard key={index} item={item}/> )}
            </div>
           </>}
          
            {filter('Бытовки под склад').length > 0 && <>
              <h1>Бытовки под склад</h1>
              <div className="gallary__item">
              {cards.items.map((item, index) => item.role == 'Бытовки под склад' && <ProductCard key={index} item={item}/> )}
              </div>
            </>}
            {filter('Бытовки под склад').length == 0 &&  filter('Бытовки для проживания').length == 0 && filter('Бытовки прорабские').length == 0 && filter('Бытовки раздевалки').length == 0 && filter('Бытовки с душем').length == 0 && <div className="bag__clear">
              <h2>других товаров пока нет</h2>
              <p>вернитесь в <Link to="/">каталог</Link> и посмотрите основные товары</p>
              </div>}
          
        </div>
    </main>
  )
}
