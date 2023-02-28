import React, { useState, useRef } from 'react'
import FurnitureCard from "../FurnitureCard"
import {furniture} from "../../../DATA/Data"

export default function FurnitureSlider() {

    const [furnitureSlider, setFurnitureSlider] = useState(0)
    const furnitureLine = useRef()
    const [furnitureBTN , setFurnitureBTN] = useState({
        next: true,
        prev: false
    })
    function sliderNext() {
        if (document.documentElement.clientWidth > 851) {
            if (furnitureSlider < 100 && furnitureSlider >= 0) {
                setFurnitureSlider(furnitureSlider+100)
                setFurnitureBTN({next:  false ,prev: true})
                furnitureLine.current.style.left = -(furnitureSlider+100) + '%' 
            } 
        } else {
            if (furnitureSlider < 200 && furnitureSlider >= 0) {
                setFurnitureSlider(furnitureSlider+100)
                furnitureLine.current.style.left = -(furnitureSlider+100) + '%' 
                if (furnitureSlider == 200) {
                    setFurnitureBTN({nex:  false ,prev: true})
                } else if (furnitureSlider == 100) {
                    setFurnitureBTN({next:  true ,prev: true})
                }
            } 
        }
    }
    function sliderPrev() {
        if (document.documentElement.clientWidth > 851) {
            if (furnitureSlider < 101 && furnitureSlider > 0 ) {
                setFurnitureSlider(furnitureSlider-100)
                furnitureLine.current.style.left = -(furnitureSlider-100) + '%' 
                setFurnitureBTN({next:  true ,prev: false})
            }
        }  else{
            if (furnitureSlider < 201 && furnitureSlider > 0 ) {
                setFurnitureSlider(furnitureSlider-100)
                furnitureLine.current.style.left = -(furnitureSlider-100) + '%' 
                if (furnitureSlider == 0) {
                    setFurnitureBTN({next:  true ,prev: false})
                }
            }
        }
    }

  return (
    <div className="furniture">
    <div className="content">
        <h2>выберети мебель и оборудывание</h2>
        <p>для создание комплекта вам нужно выбрать мебель</p>
        <div className="fd-row">
            <button className={`prevFurniture ${!furnitureBTN.prev ? "" : "prev__active" }`} onClick={sliderPrev}>←</button>
            <button className={`nextFurniture ${!furnitureBTN.next ? "" : "next__active" }`} onClick={sliderNext}>→</button>
        </div>
    </div>
    <div className="slider">
        <div className="furniture-line" ref={furnitureLine} >
            {furniture.map((item, index) => <FurnitureCard key={index} item={item}/>)}
        </div>
    </div>
    </div>
  )
}
