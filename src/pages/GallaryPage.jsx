import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';
import "./css/galary.scss"
import {DATA} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import { Link, useLocation } from 'react-router-dom'
import {cardsSlice, getCards} from "../shared/store/slices/cards"

export default function GallaryPage() {
  const location = useLocation()
  const cards = useSelector((state)=>state.cardsSlice)
  useEffect(() => {
      window.scrollTo(0, 0)
  }, [location]) 
  // useEffect(()=>{
  //   store.dispatch(getCards({}))
  //   DATA[0].mass.push(cards.items.filter((item)=>item.role == "Бытовка для проживания") )  
  //   DATA[1].mass.push(cards.items.filter((item)=>item.role == "Бытовка прорабская") )  
  //   DATA[2].mass.push(cards.items.filter((item)=>item.role == "Бытовка раздевалка") )  
  //   DATA[3].mass.push(cards.items.filter((item)=>item.role == "Бытовка с душем") )  
  //   DATA[4].mass.push(cards.items.filter((item)=>item.role == "Бытовка под склад") )  
  // }, [])
  return (
    <main>   
        <div className="gallary">
            <span><Link to="/">главная </Link>/<Link to="/gallary"> галерея</Link></span>
            <h1>Бытовки для проживания</h1>
            <div className="gallary__item">
              {DATA[0].mass.map((item, index) => <ProductCard key={index} item={item}/>)}
            </div>
            <h1>Бытовки прорабские</h1>
            <div className="gallary__item">
              {DATA[1].mass.map((item, index) => <ProductCard key={index} item={item}/>)}
            </div>
            <h1>Бытовки раздевалки</h1>
            <div className="gallary__item">
              {DATA[2].mass.map((item, index) => <ProductCard key={index} item={item}/>)}
            </div>
            <h1>Бытовки с душем</h1>
            <div className="gallary__item">
              {DATA[3].mass.map((item, index) => <ProductCard key={index} item={item}/>)}
            </div>
            <h1>Бытовки под склад</h1>
            <div className="gallary__item">
              {DATA[4].mass.map((item, index) => <ProductCard key={index} item={item}/>)}
            </div>
        </div>
    </main>
  )
}
