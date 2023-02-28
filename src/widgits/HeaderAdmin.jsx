import React from 'react'
import Search from '../shared/componets/searchAdmin'
import "./adminScss/header.scss"
export default function Header() {
  return (
    <header>
      {<Search/>}
      <div className="contacts">
           <p>+7(910)973-36-65</p>
           <p>dir@ids76.ru</p> 
      </div>
      <img alt="логотип"  src="/iconPWA/logo48x48.svg" className='logo' />
    </header>
  )
}
