import React, {useEffect, useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import "./scss/createCard.scss"
import {cardsSlice, updateCard, getCards, getCardsImg, deleteCard, addImg, deleteImg, changePhoto} from "../shared/store/slices/cards"
import { store } from '../shared/store/slices/store';
import {useNavigate, useLocation} from 'react-router-dom'



export default function CreateCard() {
  const location = useLocation()
  const cards  = useSelector((state)=>state.cardsSlice)
  const cardsStorage = JSON.parse(localStorage.getItem("cards"))
  const cardsStorageImg = JSON.parse(localStorage.getItem("cardsImg"))
  const select = useRef()
  let itemImg = [] 
  let myCards = cardsStorage.find((item)=>item.idCard == location.pathname.split("/")[3]) 
    if (cardsStorageImg.filter((item)=>item.idCard == location.pathname.split("/")[3]).length != 0) {
      let cardsImg =  cardsStorageImg.filter((item)=>item.idCard == location.pathname.split("/")[3])
      itemImg = [...itemImg, {img: myCards?.img, idCard: myCards?.idCard, active: 'true'} ] 
      cardsImg.map(item=>{
        itemImg = [...itemImg, item] 
      })
    } else {
      if (myCards?.img == 'false') {
        itemImg = []
      } else{
        itemImg = [{img: myCards?.img, idCard: myCards?.idCard, active: 'true'}]
      }
    }
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    name: myCards.name,
    role: myCards.role,
    content: myCards.content,
    size: myCards.size,
    finishing: myCards.finishing,
    states: myCards.states,
    star: myCards.star,
    text: myCards.text,
    price: myCards.price,
    discount: myCards.discount,
    imgMass: itemImg,
    idCard: myCards.idCard,
    have: myCards.have
  })
  console.log(form);
  const [errorImg, setErrorImg] = useState("")
  async function send () {
    console.log(form);
    if (!form.name || !form.role || !form.content || !form.size || !form.finishing || !form.states || !form.star || !form.text || !form.price || !form.discount){
      setError("Поля не заполненны")
    } else{
        setError("")
        await store.dispatch(updateCard({form}))
        navigate("/admin/activeCard")
    }
  }
  async function checkMass(e) {
    if (e.target.files[0] != undefined) {
      await store.dispatch(addImg({img: e.target.files[0], idCard: `${myCards?.idCard}`, index: form.imgMass.length, form: form}))
      window.location.reload(true);
    }
  }
  async function deleteCardFUNC() {
    await store.dispatch(deleteCard({idCard: myCards.idCard}))
    navigate("/admin/activeCard")
  }
  async function DeleteImgFunc(index) {
    let middleWare = false 
    if (index == 0) {
      if (form.imgMass.length > 1) {
        middleWare = form.imgMass[1]
      } else{
        middleWare = false
      }
    } else {
      middleWare = true
    }
    await store.dispatch(deleteImg({img: form.imgMass[index], idCard: myCards.idCard, index: middleWare, form: form}))
    window.location.reload(true);
  }
   function changePhotoFunc(index) {
    let middleWareMass =  form.imgMass.filter(item=>item.active == 'true').length
    middleWareMass = form.imgMass[index].active == 'true' ? middleWareMass-1 : middleWareMass+1
    if (middleWareMass <= 6) {      
      let newMass = [...form.imgMass]
      newMass[index].active = newMass[index].active == 'true' ? 'false' : 'true'
      store.dispatch(changePhoto({img: form.imgMass[index]}))
      setForm({...form, imgMass: newMass})
      setErrorImg('') 
    } else{
      setErrorImg('ПОДСКАЗКА: Может быть максимум 6 активных фото') 
      console.log(form.imgMass);
    }
  }
  function renderImg(index) {
    return (
      form.imgMass[index] != undefined  && <>
        {form.imgMass[index].active == 'true' ? 
          <img className="mainBlock__imgAccept" onClick={()=>changePhotoFunc(index)} src='/tick.svg' alt='accept'/> 
          : 
          <img className="mainBlock__imgDelete" onClick={()=>changePhotoFunc(index)} src='/close.svg' alt='close'/>
        }  
          <img className="mainBlock__imgTrash" onClick={()=>DeleteImgFunc(index)} src='/trash.svg' alt='trash'/>
          <img className='mainBlock__imgPhoto' src={form.imgMass[index].img} alt={form.name}/>
        </>
    )
  }
  useEffect(()=>{
    store.dispatch(getCards({}))
    store.dispatch(getCardsImg({}))
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
}, [location])
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
                <option  value="Бытовка для проживания" >Бытовка для проживания</option>
                <option  value="Бытовка раздевалка" >Бытовка раздевалка</option>
                <option  value="Бытовки c душем" >Бытовки c душем</option>
                <option  value="Бытовки под склад" >Бытовки под склад</option>
                <option  value="Бытовки прорабские" >Бытовки прорабские</option>
                </> :  <option  value="общая" >Общая</option>}
             
            </select>
          </div>
        </div>
        <h2>Фото*</h2>
          <label className={`input-file`}><input type="file" onChange={(e)=>checkMass(e)} accept='image/*, .png, .jpg, .gif, .web, .svg'/><span className={cards?.isLoading ? 'loading' : ""}>{cards?.isLoading ? "Загрузка..." : "Выберите файл..."}</span></label>
          <p>*разрешение файлов должно <span className='spanDanger'>1920*1080</span> </p>
          <p>*в названии <span className='spanDanger'>не должно быть русских букв и пробелов</span> </p>
          <div className="container__img">
            <div className="mainBlock__img">
                {form.imgMass[0] != undefined  && <>  
                  <img className="mainBlock__imgTrash" onClick={()=>DeleteImgFunc(0)} src='/trash.svg' alt='trash'/>
                  <img className="mainBlock__imgAccept" onClick={()=>setErrorImg("ПОДСКАЗКА: У главной картинки нельзя поменять активность")} src='/tick.svg' alt='accept'/> 
                  <img className='mainBlock__imgPhoto' src={form.imgMass[0].img} alt={form.name}/>
                </>}
            </div>
            <div className="fd-colImg">
              <div className="fd-rowImg">
                  <div className="block__img1">{renderImg(1)}</div>
                  <div className="block__img2">{renderImg(2)}</div>
                  <div className="block__img2">{renderImg(3)}</div>
                  <div className="block__img4">{renderImg(4)}</div>
              </div>
              <div className="fd-rowImg">
                  <div className="block__img5">{renderImg(5)}</div>
                  <div className="block__img3">{renderImg(6)}</div>
                  <div className="block__img3">{renderImg(7)}</div>
                  <div className="block__img8">{renderImg(8)}</div>
              </div>
            </div>
        </div>
       {form.imgMass.length > 9 && 
       <div className="extra__img">
         {form.imgMass.map((item, index)=>{
          if (index > 8) {
           return(
            <div className='extraBlock__img'>
                {renderImg(index)}
            </div>
           ) 
          }
         })}
       </div>
       }  
       <h3 className='errorImg'>{errorImg}</h3>
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
        <h2>Наличие*</h2>
        <label> <input type="checkbox" className="katalog__Checkbox" onClick={()=>setForm({...form, have: form.have == "true" ? "false" : 'true'})}  checked={form.have == "true" ? true : false}/>В наличие</label>
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
          <div className="fd-row">
            <input type="submit" onClick={send}/>
            {form.role != 'общая' && <input type="button" value='Удалить' onClick={deleteCardFUNC}/>}
          </div>
    </div>
  )
}
