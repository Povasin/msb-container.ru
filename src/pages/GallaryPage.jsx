import React from 'react'
import "./css/galary.css"
export default function GallaryPage() {
  return (
    <main>   
        <div className="gallary">
            <span><a href="../index.html">главная </a>/<a href="./gallary.html"> галерея</a></span>
            <h1>Бытовки для проживания</h1>
            <div className="gallary__item">
            </div>
            <h1>Бытовки прорабские</h1>
            <div className="gallary__item">
            </div>
            <h1>Бытовки раздевалки</h1>
            <div className="gallary__item">
            </div>
            <h1>Бытовки с душем</h1>
            <div className="gallary__item">
            </div>
            <h1>Бытовки под склад</h1>
            <div className="gallary__item">
            </div>
        </div>
    </main>
  )
}
