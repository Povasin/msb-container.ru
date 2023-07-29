import React, { useState } from 'react'
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'
import "./css/footer.scss"
import { authSlice } from '../shared/store/slices/auth';
import {BagSlice, checkRegister} from "../shared/store/slices/bag"
import {store} from "../shared/store/slices/store"
export default function Footer() {
    const auth = useSelector((state)=>state.authSlice)
    const BagStore = useSelector((state) => state.BagSlice);
    const location = useLocation()
    const navigate = useNavigate()
    let newBagMass = BagStore.items.filter(item=>item.data.have == 'true')
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
    function BagStorePrice() {
        let summ = 0;
        newBagMass.forEach(item=>{
            summ+= (item.count*item.data.price )*item.month 
        })
        return summ
    }
    function BagStoredisCount() {
        let summ = 0;
        newBagMass.forEach(item=>{
            summ+= (item.count*item.data.discount )*item.month 
        })
        return summ
    }
    function send() {
        if (!auth.userData) {
            store.dispatch(BagSlice.actions.checkRegister(" ПОДСКАЗКА: Для оформления заказа зарегистрируйтесь"));
        } else {
            if (BagStoredisCount() == 0) {
                store.dispatch(BagSlice.actions.checkRegister(" ПОДСКАЗКА: Товары которых нет в наличии нельзя заказать"));
            } else{
                navigate(`/arrange`)
            }
        }
    }
  return (
   document.documentElement.clientWidth > 630 ? 
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
</footer> : <>
    {location.pathname.split("/")[1] == 'bag' && BagStore.items != 0 ? 
        <div className="mobile__bag">
            <p>{BagStorePrice()}₽</p>
            <p>{BagStoredisCount()}</p>
            <button id="order" to="/arrange" onClick={send}>К оформлению</button>
        </div>
    : false} 
    <div className="mobile">
        <div className="mobile__block">
            <Link to='/'><img src={location.pathname.split("/")[1] == '' ? '/homeActive.svg' : '/home.svg'} alt="Главная"/></Link>
            <p className={`mobile__text ${location.pathname.split("/")[1] == '' && 'active'}`}>Главная</p>
        </div>
        <div className="mobile__block">
            <Link to='/katalog'><img src={location.pathname.split("/")[1] == 'katalog' ? '/katalogActive__icon.svg' : '/katalog__icon.svg'} alt="Каталог"/></Link>
            <p className={`mobile__text ${location.pathname.split("/")[1] == 'katalog' && 'active'}`}>Каталог</p>
        </div>
        <div className="mobile__block">
            <Link to='/gallary'><img src={location.pathname.split("/")[1] == 'gallary' ? '/productActive__icon.svg' : '/product__icon.svg'} alt="Товары"/></Link>
            <p className={`mobile__text ${location.pathname.split("/")[1] == 'gallary' && 'active'}`}>Товары</p>
        </div>
        <div className="mobile__block">
            <Link to="/bag" ><img src={location.pathname.split("/")[1] == 'bag' ? '/bagActive__icon.svg' : '/bag__icon.svg'} alt="корзина"/><div className="services__sum"><p>{BagStore.items?.length}</p></div></Link>
            <p className={`mobile__text ${location.pathname.split("/")[1] == 'bag' && 'active'}`}>Корзина</p>
        </div>
        <div className="mobile__block">
            <Link to={auth?.userData == null ? '/register' : `/user/${auth?.userData?.idUser}`}><img src={location.pathname.split("/")[1] == 'user' || location.pathname.split("/")[1] == 'register' || location.pathname.split("/")[1] == 'login' ? '/userActive__icon.svg' : '/user__icon.svg'} alt="Профиль"/></Link>
            <p className={`mobile__text ${location.pathname.split("/")[1] == 'user' || location.pathname.split("/")[1] == 'register' || location.pathname.split("/")[1] == 'login'  ? 'active' : false}`}>Профиль</p>
        </div>
    </div>
    </> 
  )
}
