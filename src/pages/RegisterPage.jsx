import React from 'react'
import "./css/register.css"
export default function RegisterPage() {
  return (
    <main>   
        <div className="register">
            <h1>Регистрация</h1>
            <div className="register-row">
                <input type="text" id="nameReg" placeholder="Имя профиля" maxlength="20" required/>
                <input type="email"id="email"placeholder="эл.почта" maxlength="40" required/>
                <input type="tel" id="phone"placeholder="Номер телефона" maxlength="40" required/>
                <input type="password" id="password" placeholder="пароль" maxlength="16" required/>
                <input type="password" id="passwordCheck" placeholder="подтвердите пароль" maxlength="16"required/>
                <p className="error"></p>
                <label><input type="checkbox" id="accept" required/>согласен на отправку данных</label>
                <button id="register">подтвердить</button>
                <p className="account">Есть аккунт? <a href="../login/login.html">выполните вход</a></p>
            </div>
        </div>  
    </main>
  )
}
