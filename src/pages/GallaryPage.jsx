import React from 'react'
import "./css/galary.css"
import {DATA} from "../DATA/Data"
import ProductCard from "../shared/componets/prodactCard/index"
import { Link } from 'react-router-dom'
export default function GallaryPage() {
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
