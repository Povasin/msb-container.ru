import React, { useState, useRef } from 'react'
import ProductCard from "../ProdactCard"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function CubinsSlider() {
    
    // че то не с слайдером
    const cards = useSelector((state)=>state.cardsSlice)
    const [cubinsSlider, setCubinsSlider] = useState(0)
    const cubinsLine = useRef()
    const [cubinsBTN , setCubinsBTN] = useState({
        next: true,
        prev: false
    })
    function sliderNext() {
        if (document.documentElement.clientWidth > 851) {
            if ( cubinsSlider < 100 ) {
                setCubinsBTN({next:  false ,prev: true})
                let ofset = cubinsSlider+100
                setCubinsSlider(ofset)
                cubinsLine.current.style.left = - ofset + '%' 
            }
        } else if (document.documentElement.clientWidth < 851 && document.documentElement.clientWidth > 440) {
            if ( cubinsSlider < 200 ) {
                let ofset = cubinsSlider+100
                 setCubinsSlider(ofset)
                    cubinsLine.current.style.left = - ofset + '%' 
                if (cubinsSlider== 200) {
                    setCubinsBTN({next:  false ,prev: true})
                }else if ( cubinsSlider == 100) {
                    setCubinsBTN({next:  true ,prev: true})
                }
            }
        } else if (document.documentElement.clientWidth < 440) {
            if ( cubinsSlider< 500 ) {
                let ofset = cubinsSlider+100
                 setCubinsSlider(ofset)
                cubinsLine.current.style.left = - ofset + '%' 
                if ( cubinsSlider == 500) {
                    setCubinsBTN({next:  false ,prev: true})
                }else if ( cubinsSlider == 100 || cubinsSlider == 200 ||cubinsSlider == 300 ||  cubinsSlider == 400 || cubinsSlider == 500) {
                    setCubinsBTN({next:  true ,prev: true})
                }
            } 
        }        
    }
    function sliderPrev() {
        if (document.documentElement.clientWidth > 851) {
            if ( cubinsSlider< 101 && cubinsSlider> 0) {
                let ofset = cubinsSlider-100
                 setCubinsSlider(ofset)
                 setCubinsBTN({next:  true ,prev: false})
                cubinsLine.current.style.left = - ofset + '%' 
            }
        } else if (document.documentElement.clientWidth < 851 && document.documentElement.clientWidth > 440) {
            if ( cubinsSlider <= 200 &&  cubinsSlider > 0  ) {
                let ofset = cubinsSlider-100
                 setCubinsSlider(ofset)
                cubinsLine.current.style.left = - ofset + '%' 
                if ( cubinsSlider == 200 || cubinsSlider == 0) {
                    setCubinsBTN({next:  true ,prev: false})
                }else if ( cubinsSlider == 100) {
                    setCubinsBTN({next:  true ,prev: true})
                }
            }
        } else if (document.documentElement.clientWidth < 440) {
            if ( cubinsSlider <= 500 && cubinsSlider > 0 ) {
                let ofset = cubinsSlider-100
                 setCubinsSlider(ofset)
                cubinsLine.current.style.left = - ofset + '%' 
                if ( cubinsSlider == 500 || cubinsSlider == 0 ) {
                    setCubinsBTN({next:  true ,prev: false})
                }else if ( cubinsSlider == 100 ||cubinsSlider == 200 ||  cubinsSlider == 300 ||  cubinsSlider == 400 ||cubinsSlider == 500) {
                    setCubinsBTN({next:  true ,prev: true})
                }
            } 
        }        
    }
  return (
    <div className="katalog">
        <div className="katalog-row">
            <h2>Лидеры продаж</h2>
            <button className={`prev ${!cubinsBTN.prev ? "" : "prev__active" }`} onClick={sliderPrev}>←</button>
            <button className={`next ${!cubinsBTN.next ? "" : "next__active" }`} onClick={sliderNext}>→</button>
        </div>
        <div className="slider">
            <div className="katalog-line" ref={cubinsLine}>
            {cards?.items.map((item, index) => item.role == 'общая' && <ProductCard key={index} item={item}/>)}
            </div>
        </div>
        <Link to="/katalog" className="more">посмотреть все бытовки</Link>
    </div>
  )
}
