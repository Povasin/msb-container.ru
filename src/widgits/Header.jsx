import React, { useState } from 'react'
import "./css/header.scss"
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import  Search  from '../shared/componets/Search';
import { authSlice } from '../shared/store/slices/auth';

export default function Header() {
    const BagStore = useSelector((state) => state.BagSlice);
    const [scroll, setScroll] = useState(false)
    const auth = useSelector((state)=>state.authSlice)
    const location = useLocation()
    const [showSidebar, setShowSideBar] = useState(false)
    const [searchToggle, setSearchToggle] = useState(false)
    const cards = useSelector((state)=>state.cardsSlice)
    function onSearch() {
        window.scrollTo(0, 0)
        setSearchToggle(!searchToggle)
    }
  return (
<header className='header'>
    {searchToggle &&
        <div className="search__modal">
            <p  onClick={()=>onSearch()} className='search__arrow'>←</p>
            {<Search setSearchToggle={setSearchToggle}/>}
        </div>
    } 
    <div className="headerTop">
        <div className="headerTop__logotip" itemScope itemType="http://schema.org/ImageObject">
            <img alt="логотип"  src="/iconPWA/logo96x96.svg" itemProp="contentUrl" />
        </div>
        <Link to="/" className="headerTop__logo">MSB<span>container</span></Link>
        <div className="headerTop__search">
            {<Search setSearchToggle={setSearchToggle}/>}
        </div>
        <div className="headerTop__contacts">
           <p>+7(910)973-36-65</p>
           <p>dir@ids76.ru</p> 
        </div>
        <div className="headerTop__log">
            {auth.userData == null ?  <>
                <Link to="/login" className="login">Войти</Link>
                <Link to="/register" className="register">Зарегистрироваться</Link>
            </> : 
            <Link to={`/user/${auth.userData.idUser}`} className="loginUser"> <img src="/log.svg" alt="пользователь"/><p>{auth.userData.name}</p></Link> }
         
        </div>
    </div>
    {document.documentElement.clientWidth > 630 ? <div className={`services ${scroll && "services__fixed"}`} onScroll={window.onscroll = ()=> window.pageYOffset > 103 ? setScroll(true) :  setScroll(false)} >
        <Link to="/katalog">Каталог <div className="menu"><span></span></div></Link>
        <Link to="/aboutUs">О нас</Link>
        <Link to="/services">Услуги</Link>
        <Link to="/contact">Контакты</Link>
        <Link to="/gallary">Виды товаров</Link>
        <Link to="/bag" ><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{BagStore.items?.length}</p></div>Корзина</Link>
        <img  className="services__media" onClick={()=>onSearch()} src="/search.svg" alt="поиск"/>
        <div className="sidebar__open" onClick={()=>setShowSideBar(!showSidebar)}>
            <span></span>
        </div>
       {showSidebar && 
       <div className="sidebar">
            <div className="sidebar__menu">
                <div className="sidebar__row">
                    <Link to="/katalog">Каталог <div className="iconMenu"><span></span></div></Link>
                    <p className="sidebar__close" onClick={()=>setShowSideBar(!showSidebar)}>X</p>
                </div>
                <Link to="/aboutUs">О нас</Link>
                <Link to="/services">Услуги</Link>
                <Link to="/contact">Контакты</Link>
                <Link to="/gallary">Виды товаров</Link>
                <Link to="/bag" ><img src="/bagHeader.svg" alt="корзина"/><div className="services__sum"><p>{BagStore.items?.length}</p></div>Корзина</Link>
            </div>
        </div>
        } 
    </div> : 
    <div className={`mobile__header ${scroll && "mobile__header__fixed"}`} onScroll={window.onscroll = ()=> window.pageYOffset > 103 ? setScroll(true) :  setScroll(false)}>
         <img alt="логотип" className='mobile__logo' src="/iconPWA/logo48x48.svg" itemProp="contentUrl" />
         {location.pathname.split("/")[1] == '' &&  <p className='mobile__header__text'>Главная</p>}
         {location.pathname.split("/")[1] == 'katalog' &&  <p className='mobile__header__text'>Каталог</p>}
         {location.pathname.split("/")[1] == 'gallary' &&  <p className='mobile__header__text'>Товары</p>}
         {location.pathname.split("/")[1] == 'bag' &&  <p className='mobile__header__text'>Корзина</p>}
         {location.pathname.split("/")[1] == 'register' &&  <p className='mobile__header__text'>Регистрация</p>}
         {location.pathname.split("/")[1] == 'login' &&  <p className='mobile__header__text'>Вход</p>}
         {location.pathname.split("/")[1] == 'user' &&  <p className='mobile__header__text'>{auth?.userData?.name}</p>}
         {location.pathname.split("/")[1] == 'arrange' &&  <p className='mobile__header__text'>Оформление заказа</p>}
         {location.pathname.split("/")[1] == 'card' &&  <p className='mobile__header__text'>{cards?.items.find(item=>item.idCard == location.pathname.split("/")[2])?.name}</p>}
         <img className="mobile__search"onClick={()=>onSearch()} src="/search.svg" alt="поиск"/>
    </div>
    }
    </header>
  )
}
