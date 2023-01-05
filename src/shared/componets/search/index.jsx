import React from 'react'
import {DATA, furniture} from "../../../DATA/Data"
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Search() {
    
    //TODO: как сортировать подмассив
    const [search, setSearch] = useState("")
    const [results, setResult] = useState ("")
   function resultFUNC(e) {
    setSearch(e.target.value)
    if ( search != "") {
        // setResult(DATA.filter(card =>card.name.toLowerCase().includes(search.toLocaleLowerCase())))
        
        // setResult(DATA.forEach(card =>card.mass.filter((array)=>array.name.toLowerCase().includes(search.toLocaleLowerCase()))))
        const boba = DATA.forEach(card=>{
            console.log(card.mass);
            card.mass.filter((array)=>{
               return array.name.toLowerCase().includes(search.toLocaleLowerCase())
            })
        })
      
    }
    console.log(results);
   }
  return (
    <div>            
        <input type="text" value={search} onChange={(e)=>resultFUNC(e)} placeholder="Поиск" maxLength="30" className="search"/>
        <img src="/search.svg" alt="поиск"/>
        <div className="search__block">
            {results && results.map((item, index)=><Link key={index} className="search__blockHref" to={`/card/${item.id}`}>{item.name}</Link> )}
        </div>
    </div>
  )
}
