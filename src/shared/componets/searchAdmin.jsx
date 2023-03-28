import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useRef } from 'react'
import {orderSliceClient, getordersAdmin} from "../store/slices/orderClient"
import { useSelector } from 'react-redux'
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
  const orders = useSelector((state)=>state.orderSliceClient)
  const [search, setSearch] = useState("")
  const [results, setResult] = useState ([])
  function resultFUNC(e) {
    setShowSearch(true)
    setSearch(e.target.value)
    if ( search != "") {
      let midlle = []
      orders.items.map((item)=>{
      midlle = item.orderMass.map((card) => {
          return String(card.number).includes(e.target.value) && {number: card.number, name: item.name, _id: item._id}
        }).filter(Boolean)
      }) 
      setResult(midlle)
    }
  }
  function endSearch ()  {
    setShowSearch(false)
    setSearch("")
  }
  useOnClickOutside(ref, ()=>setShowSearch(false))
  useEffect(()=>{
    store.dispatch(getordersAdmin({}))
  }, [])
  return (
    <div ref={ref} className="search__wrapper" >            
        <input type="text" value={search} onChange={(e)=>resultFUNC(e)} placeholder="Поиск заказов..." maxLength="30" className="search" />
        <img src="/search.svg" alt="поиск"/>
        {showSearch && 
          <div className="search__block"  onClick={endSearch}>
            {results ? results.map((item, index)=><Link key={index} className="search__blockHref" to={`/order/${item._id}/${item.number}`}>Заказ № {item.number} {item.name}</Link>) : null}
          </div>
        }
    </div>
  )
}
