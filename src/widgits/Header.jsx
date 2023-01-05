import React, { useState } from 'react'
import "./css/header/header.scss"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import  Search  from '../shared/componets/search/index';
import { authSlice } from '../shared/store/slices/auth';

export default function Header() {
    const BagStore = useSelector((state) => state.BagSlice);
    const [scroll, setScroll] = useState(false)
    const auth = useSelector((state)=>state.authSlice)
  return (
<header>
    <div className="headerTop">
        <div className="headerTop__logotip" itemScope itemType="http://schema.org/ImageObject">
            <img alt="логотип"  src="/iconPWA/logo96x96.svg" itemProp="contentUrl" />
        </div>
        <Link to="/" className="headerTop__logo">MSB<span>container</span></Link>
        <div className="headerTop__search">
            {<Search/>}
        </div>
        <div className="headerTop__contacts">
           <p>+7(910)973-36-65</p>
           <p>dir@ids76.ru</p> 
        </div>
        <div className="headerTop__log">
            {auth.userData == null ?  <>
                <Link to="/login" className="login">Войти</Link>
                <Link to="/register" className="register">Зарегистрироваться</Link>
                <Link to="/login" className="log"> <img src="/log.svg" alt="вход"/><p>вход</p></Link>
            </> : 
            <Link to={`/user/${auth.userData.id}`} className="loginUser"> <img src="/log.svg" alt="пользователь"/><p>{auth.userData.name}</p></Link> }
         
        </div>
    </div>
    <div className={`services ${scroll && "services__fixed"}`} onScroll={window.onscroll = ()=> window.pageYOffset > 103 ? setScroll(true) :  setScroll(false)} >
        <Link to="/katalog">Каталог <div className="menu"><span></span></div></Link>
        <Link to="/aboutUs">О нас</Link>
        <Link to="/services">Услуги</Link>
        <Link to="/contact">Контакты</Link>
        <Link to="/gallary">Галерея</Link>
        <Link to="/bag" ><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{BagStore.items?.length}</p></div>Корзина</Link>
        <img  className="services__media" src="/search.svg" alt="поиск"/>
        <div className="sidebar__open">
            <span></span>
        </div>
        <div className="sidebar">
            <div className="sidebar__menu">
                <div className="sidebar__row">
                    <Link to="/katalog/katalog.html">Каталог <div className="iconMenu"><span></span></div></Link>
                    <p className="sidebar__close">X</p>
                </div>
                <Link to="/aboutUs">О нас</Link>
                <Link to="/services">Услуги</Link>
                <Link to="/contact">Контакты</Link>
                <Link to="/gallary">Галерея</Link>
                <Link to="/bag" ><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{BagStore.items.length}</p></div>Корзина</Link>
            </div>
        </div>
    </div>
    </header>
  )
}
