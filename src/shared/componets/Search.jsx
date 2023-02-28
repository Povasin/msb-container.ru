import React, {useEffect} from 'react'
import {DATA, furniture} from "../../DATA/Data"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'

function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }
    )
}

export default function Search() {
    function parseData() {
        return DATA.reduce((acc,card)=>{
            const cardArr = [card, ...card.mass]
            if(acc) {
                return  acc = [...acc, cardArr]
            } else {
                return acc = cardArr
            }
        },[]).flat(2)

    }
    const [showSearch, setShowSearch] = useState(false)
    const ref = useRef()
    const parsedData = parseData().slice()
    const [search, setSearch] = useState("")
    const [results, setResult] = useState ("")

    function resultFUNC(e) {
        setShowSearch(true)
        setSearch(e.target.value)
        if ( search != "") {
            const filterMass = DATA.filter(card =>card.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
            const filterUnderMass = parsedData.filter((array)=>array.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
            setResult(filterMass != 0 ? filterMass : filterUnderMass)
        }
    }
    useOnClickOutside(ref, ()=>setShowSearch(false))
  return (
    <div ref={ref} >            
        <input type="text" value={search} onChange={(e)=>resultFUNC(e)} placeholder="Поиск" maxLength="30" className="search" />
        <img src="/search.svg" alt="поиск"/>
        {showSearch && 
            <div className="search__block" onClick={()=>setShowSearch(false)}>
                {results ? results.map((item, index)=><Link key={index} className="search__blockHref" to={`/card/${item.id}`}>{item.name}</Link>) : null}
            </div>
        }   
    </div>
  )
}
