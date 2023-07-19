import React from 'react'
import './scss/loadingPage.scss'
export default function LoadingPage({number}) {
  let forMass = []
  for (let i = 0; i < number; i++) {
    forMass = [...forMass, i]
  }
  return (
    <div className='containerLoadingUser'>
      {forMass.map(()=><div className="cardLoadingUser">
        <div className="blockLoadingUser starUser"></div>
        <div className="blockLoadingUser imgUser"></div>
        <div className="blockLoadingUser textUser"></div>
        <div className="fd-rowUser">
          <div className="blockLoadingUserpriceUser"></div>
          <div className="blockLoadingUser btnUser"></div>
        </div>
      </div>)}
    </div>
  )
}
