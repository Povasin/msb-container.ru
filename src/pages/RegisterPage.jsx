import React, {useEffect, useState, useRef} from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {register, authSlice} from "../shared/store/slices/auth"
import "./scss/register.scss"

export default function RegisterPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [form, setForm ] = useState({
    email: "", 
    password: "",
    name: "",
    phone: "",
  })
  const [checkPassword, setCheckPassword] = useState("")
  const [checkInput, setCheckInput] = useState({
    status: false,
    error: ""
  })
  const auth = useSelector((state)=>state.authSlice)
  const inputEl = useRef(null);
  
  if (auth.userData && !auth.isLoading  ) {
    navigate(`/user/${auth.userData.id}`)
  }

  function changeInput(key, e) {
    setForm({...form, [key]: e.target.value})
  }
  function send() {
    if ( form.email == "" || form.password == "" || form.name == "" || form.phone == "") {
      setCheckInput({status: false, error: "поля не заполненны"})
    } else {
      setCheckInput({error: "", status: true})
      if (checkPassword == form.password) {
        setCheckInput({ error: "", status: true})
        if (form.email.indexOf('@') != -1) {
         if (inputEl.current.checked) {
          store.dispatch(register({body: form}))
         }else  setCheckInput({error: "Заполните этот флажок для успешной регистрации", status: true})
          
        } else setCheckInput({error: "Введите коректную эл.почту", status: true})
      } else setCheckInput({status: false, error: "пароли не совпадают"})
    } 
  }
  useEffect(()=>{
    store.dispatch(authSlice.actions.clearError());
  }, [])

  useEffect(() => {
      window.scrollTo(0, 0)
  }, [location])
  return (
    <main>   
        <div className="register">
            <h1>Регистрация</h1>
            <div className="register-row">
                <input type="text" id="nameReg" placeholder="Имя профиля" value={form.name} onChange={(e)=>changeInput("name", e)}maxLength="20" />
                <input type="email"id="email"placeholder="эл.почта" value={form.email} onChange={(e)=>changeInput("email", e)} maxLength="40" />
                <input type="tel" id="phone"placeholder="Номер телефона" value={form.phone} onChange={(e)=>changeInput("phone", e)} maxLength="40" />
                <input type="password" id="password" placeholder="пароль" maxLength="16" value={form.password} onChange={(e)=>changeInput("password", e)}  />
                <input type="password" id="passwordCheck" placeholder="подтвердите пароль" value={checkPassword} onChange={(e)=>setCheckPassword(e.target.value)} maxLength="16"/>
                <p className="error">{auth?.error}{checkInput.error}{}</p>
                <label><input type="checkbox" id="accept" ref={inputEl} />согласен на отправку данных</label>
                <button id="register" className={`registerBTN ${!auth.isLoading  ? "" : "loading"} `} disabled={auth.isLoading } onClick={send}>{!auth.isLoading  ? "подтвердить" : "загрузка"}</button>
                <p className="account">Есть аккунт? <Link to="/login">Выполните вход</Link></p>
            </div>
        </div>  
    </main>
  )
}
