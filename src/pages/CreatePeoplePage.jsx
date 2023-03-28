import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {create, peopleSlice} from "../shared/store/slices/people"
import "./scss/CreatePeoplePage.scss"

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm ] = useState({
    email: "", 
    password: "",
    name: "",
    phone: "",
    role: "Администратор"
  })
  const [checkPassword, setCheckPassword] = useState("")
  const [checkInput, setCheckInput] = useState({
    status: false,
    error: ""
  })
  const auth = useSelector((state)=>state.peopleSlice)
  function changeInput(key, e) {
    setForm({...form, [key]: e.target.value})
  }
  async function send() {
    if ( form.email == "" || form.password == "" || form.name == "" || form.phone == "" || form.role == "") {
      setCheckInput({status: false, error: "поля не заполненны"})
    } else {
      setCheckInput({error: "", status: true})
      if (checkPassword == form.password) {
        setCheckInput({ error: "", status: true})
        if (form.email.indexOf('@') != -1) {
          await store.dispatch(create({body: form}))
          console.log(auth);
          auth?.error != '' && navigate("/admin/people")
        } else setCheckInput({error: "Введите коректную эл.почту", status: true})
      } else setCheckInput({status: false, error: "пароли не совпадают"})
    } 
  }
  useEffect(()=>{
    store.dispatch(peopleSlice.actions.clearError());
  }, [])
  return (
    <main>   
        <div className="registerPeople">
            <h1>Добавление Сотрудника</h1>
            <div className="register-row">
                <input type="text" id="nameReg" placeholder="ФИО" value={form.name} onChange={(e)=>changeInput("name", e)}maxLength="20" />
                <input type="email"id="email"placeholder="эл.почта" value={form.email} onChange={(e)=>changeInput("email", e)} maxLength="40" />
                <input type="tel" id="phone"placeholder="Номер телефона" value={form.phone} onChange={(e)=>changeInput("phone", e)} maxLength="40" />
                <input type="password" id="password" placeholder="пароль" maxLength="16" value={form.password} onChange={(e)=>changeInput("password", e)}  />
                <input type="password" id="passwordCheck" placeholder="подтвердите пароль" value={checkPassword} onChange={(e)=>setCheckPassword(e.target.value)} maxLength="16"/>
                <select onClick={(e)=>changeInput("role", e)} className="select" name="role">
                    <option  value="Администратор">Администратор</option>
                    <option  value="Менеджер" >Менеджер</option>
                </select>
                <p className="error">{auth?.error}{checkInput.error}{}</p>
                <button id="register" className={`registerBTN ${!auth.isLoading  ? "" : "loading"} `} disabled={auth.isLoading } onClick={send}>{!auth.isLoading  ? "подтвердить" : "загрузка"}</button>
            </div>
        </div>  
    </main>
  )
}
