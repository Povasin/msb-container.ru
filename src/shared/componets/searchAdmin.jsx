import React, {useEffect, useCallback, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import { store } from '../store/slices/store';
import { Link } from 'react-router-dom'
import {orderSliceClient, getordersAdmin, getOrdersAuth} from "../store/slices/orderClient"
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
  const orders = useSelector((state)=>state.orderSliceClient)
  const [showSearch, setShowSearch] = useState(false)
  const ref = useRef()
  const [search, setSearch] = useState("")
  const [results, setResult] = useState ("")
  function resultFUNC(e) {
   
      setShowSearch(true)
      setSearch(e.target.value)
      console.log(e.target.value);
      const filterMass = orders.items.filter(card =>card.number == e.target.value)
      setResult(filterMass)
  }  
  function endSearch ()  {
    setShowSearch(false)
    setSearch("")
  }
  useEffect (()=>{
    store.dispatch(getordersAdmin({}))
  }, [])
  useOnClickOutside(ref, ()=>setShowSearch(false))
  return (
    <div ref={ref} className="search__wrapper" >            
        <input type="text" value={search} onChange={(e)=>resultFUNC(e)} placeholder="Поиск заказов..." maxLength="30" className="search" />
        <img src="/search.svg" alt="поиск"/>
        {showSearch && 
          <div className="search__block"  onClick={endSearch}>
            {results ? results.map((item, index)=><Link key={index} className="search__blockHref" to={`/card/${item.idUser}`}>заказ № {item.number}</Link>) : null}
          </div>
        }
    </div>
  )
}
