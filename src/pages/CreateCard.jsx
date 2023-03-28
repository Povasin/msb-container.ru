import React, {useEffect, useState} from 'react'
import "./scss/createCard.scss"
import {addCards, cardsSlice} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateCard() {
  const select = useRef()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: "",
    role: "Бытовка для проживания",
    content: null,
    size: "",
    finishing: "",
    states: "",
    star: "",
    text: "",
    price: null,
    discount: null,
    img : []
  })
  async function send () {
    if (!form.name || !form.role || !form.content || !form.size || !form.finishing || !form.states || !form.star || !form.text || !form.price || !form.discount){
      setError("Поля не заполненны")
    } else{
      if ( form.img.length == 0) {
        setError("Картинки не добавленны")
      } else {
        setError("")
        console.log({body: form});
        await store.dispatch(addCards({body: form}))
         navigate("/admin/activeCard")
      }
    }
  }

  return (
    <div className='createcard'>
    <div className="fd-row">
      <div className="fd-col">
        <h2>Название*</h2>
        <input type="text" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} placeholder='Название...'/>
      </div>
      <div className="fd-col">
        <h2>Категория*</h2>
        <select ref={select} onClick={()=>setForm({...form, role: select.current.value})} className="select" name="role">
            {form.role != 'общая' ? <>
            <option  value="Бытовка для проживания">Бытовка для проживания</option>
            <option  value="Бытовка раздевалка" >Бытовка раздевалка</option>
            <option  value="Бытовки c душем" >Бытовки c душем</option>
            <option  value="Бытовки под склад" >Бытовки под склад</option>
            <option  value="Бытовки прорабские" >Бытовки прорабские</option>
            </> :  <option  value="общая" >Общая</option>}
         
        </select>
      </div>
    </div>
    <h2>Картинка*</h2>
      <label className="input-file"><input type="file" onChange={(e)=>setForm({...form, img: [...form.img, e.target.files[0]]})} accept='image/*, .png, .jpg, .gif, .web, .svg'/><span>Выберите файл</span></label>
    <p>*разрешение файлов должно 1920*1080</p>
    {form.img.map((item, index)=>{
      return <div key={index} className="addImg">
        <img src="/paperImg.svg" alt="" />
        <p>{item}</p>
        <img src="/trash.svg" onClick={()=>setForm({...form, img: form.img.filter((img)=>img != item) })} alt="удалить" />
      </div>
    })}
    <h2>Характеристки*</h2>
    <div className="fd-row">
      <div className="fd-col">
        <h3>Вместимость*</h3>
        <input  value={form.content} onChange={(e)=>setForm({...form, content: e.target.value})} type="number" placeholder='Вместимость...'/>
        <h3>Внутренняя отделка*</h3>
        <input  value={form.finishing} onChange={(e)=>setForm({...form, finishing: e.target.value})} type="text" placeholder='Внутренняя отделка...'/>
        <div className="katalog-star">
            <h2>Рейтинг покупателей</h2>
            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setForm({...form, star: "★★★★★"})}  checked={form.star == "★★★★★" ? true : false}/>★★★★★</label>
            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setForm({...form, star: "★★★★☆"})}  checked={form.star == "★★★★☆" ? true : false}/>★★★★☆</label>
            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setForm({...form, star: "★★★☆☆"})}  checked={form.star == "★★★☆☆" ? true : false}/>★★★☆☆</label>
            <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setForm({...form, star: "★★☆☆☆"})}  checked={form.star == "★★☆☆☆" ? true : false}/>★★☆☆☆</label>
        </div>
      </div>
      <div className="fd-col">
        <h3 >Габариты*</h3>
        <input  value={form.size} onChange={(e)=>setForm({...form, size: e.target.value})} type="text" placeholder='Габариты...'/>
        <h3>Состояние*</h3>
        <input type="text" value={form.states} onChange={(e)=>setForm({...form, states: e.target.value})} placeholder='Состояние...' className="katalog__Checkbox"/>
      </div>
    </div>
    <h2>Описание*</h2>
    <textarea value={form.text} onChange={(e)=>setForm({...form, text: e.target.value})} maxLength='1000' id="" cols="30" rows="10">Описание...</textarea>
    <div className="fd-row">
      <div className="fd-col">
        <h2>Цена*</h2>
        <label className='price'><input type="number"  value={form.price} onChange={(e)=>setForm({...form, price: e.target.value})}  placeholder='Цена...' maxLength="20"/><p>₽</p></label>
      </div>
      <div className="fd-col">
        <h2>Скидка*</h2>
        <label className='price'><input type="number" value={form.discount} onChange={(e)=>setForm({...form, discount: e.target.value})}  placeholder='Скидка...' maxLength="20"/><p>₽</p></label>
      </div>
    </div>
      <p className='error'>{error}</p>
      <input type="submit" onClick={send}/>
  </div>
  )
}
