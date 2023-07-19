import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "./css/footer.scss"
import { authSlice } from '../shared/store/slices/auth';
import { useState } from 'react';
export default function Footer() {
    const auth = useSelector((state)=>state.authSlice)
    const [massQuestion, setMassQuestion] = useState([
        {
            quastion: "бытовка автономная?",
            answer: "Нет, нужно будет подключать воду, электричество и канализацию",
            active: false
        },
        {
            quastion: "Какое состояние у бытовок?",
            answer: "Бытовки б/у, все в хорошем состояние, чистые, убранные и без посторонних запахов. По запросу перед отправкой можем отправить фото бытовки которая приедет именно к вам.",
            active: false
        },
        {
            quastion: "Нужно ли проводить воду?",
            answer: "Да, нужно будет подключать воду, электричество и канализацию",
            active: false
        },
        {
            quastion: "нужно ли подключать электричество",
            answer: "Да, нужно будет подключать воду, электричество и канализацию",
            active: false
        },
        
    ])
    function showAnswer(item) {
        let newMass = massQuestion.slice()
        newMass.forEach((card)=>{
            if (card.quastion == item.quastion) {
                    card.active =  !card.active
            }
        })
        setMassQuestion(newMass)
    } 

  return (
    <footer>
    <div className="pd-100">
        <h2>Часто задаваемые воросы</h2>
       {massQuestion.map((item, index)=> 
       <div key={index}  className="answer" >
            <div className="answer__block">
                <div className="answer__question">
                    <div className="answer__info">i</div>
                    <p>{item.quastion}</p>
                    <p className={`answer__open  ${item.active ? "active" : ""}`} onClick={()=>showAnswer(item)}>{">"}</p>
                </div>
                <div className={`answer__content ${item.active ? "active" : ""}`}>{item.answer}</div>
            </div>
        </div>
        )}
    </div>
    <div className="basement">
        <div className="basement__block">
            <div className="basement__col">
                <h2>Новинки, акции и скидки! <br/> для постояных клиентов</h2>
                <p>мы сами не любим спам, поэтому только самое интересное!</p>
            </div>
            <div className="basement__col">
                <h3>Кстати нас уже 1249 человек!</h3>
                <div className="logFooter">
                    { auth.userData == null ? 
                    <>
                        <Link to="/login" className="login">Войти</Link>
                        <Link to="/register" className="register">Зарегистрироваться</Link>
                    </> :
                     <Link to="/katalog" className="katalog">Каталог</Link>
                }
                   
                </div>
                <h3>Присоединяйся!</h3>
            </div>
        </div>
        <div className="basement__content">
            <div className="d-col">
                <Link to="/" className="basement__logo">MSB <span>container</span></Link>
                <div className="block">
                    <Link to="#" className="prava">2022 все права защищены</Link>
                    <Link to="#" className="prava">пользовательское соглашение</Link>
                    <Link to="#" className="prava">политика конфидециальности</Link>
                    <Link to="/admin" className="prava">для администраторов</Link>
                </div>
            </div>
            <div className="d-col">
                <h4>Каталог</h4>
                <Link to="/card/2">Бытовки для проживания</Link>
                <Link to="/card/1">Бытовки раздевалки</Link>
                <Link to="/card/5">Бытовки прорабские</Link>
                <Link to="/card/4">Бытовки под склад</Link>
                <Link to="/card/3">Бытовки с душем</Link>
            </div>
            <div className="d-col">
                <h4>Информация</h4>
                <Link to="/aboutUs">О нас</Link>
                <Link to="/contact">контакты</Link>
                <Link to="/services">услуги</Link>
                <Link to="/gallary">Виды товаров</Link>
            </div>
            <div className="d-col">
                <h4>Контакты</h4>
                <p>+7 (910)973-36-65</p>
                <p>	dir@ids76.ru</p>
                <p>г. ярославль, ул 2-я Тарная 2</p>
            </div>
        </div>
    </div>
</footer>
  )
}
