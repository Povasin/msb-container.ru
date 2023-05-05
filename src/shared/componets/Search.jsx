import React, {useEffect,useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useLocation, Link,} from 'react-router-dom'
import {cardsSlice, getCards} from "../store/slices/cards"
import { store } from '../store/slices/store';

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
    const [showSearch, setShowSearch] = useState(false)
    const ref = useRef()
    const [search, setSearch] = useState("")
    const [results, setResult] = useState ("")
    const cards = useSelector((state)=>state.cardsSlice)
    function resultFUNC(e) {
        setShowSearch(true)
        setSearch(e.target.value)
        if ( search != "") {
            const filterMass = cards.items.filter(card =>card.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
            setResult(filterMass)
        }
    }
    useEffect (()=>{
      store.dispatch(getCards({}))
    }, [])
    useOnClickOutside(ref, ()=>setShowSearch(false))
  return (
    <div ref={ref} >            
        <input type="text" value={search} onChange={(e)=>resultFUNC(e)} placeholder="Поиск" maxLength="30" className="search" />
        <img src="/search.svg" alt="поиск"/>
        {showSearch && 
            <div className="search__block" onClick={()=>setShowSearch(false)}>
                {results ? results.map((item, index)=><Link key={index} className="search__blockHref" to={`/card/${item.idCard}`}>{item.name}</Link>) : null}
            </div>
        }   
    </div>
  )
}
