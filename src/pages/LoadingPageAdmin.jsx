import React from 'react'
import './scss/loadingPageAdmin.scss'

export default function LoadingPageAdmin({number}) {
    let forMass = []
    for (let i = 0; i < number; i++) {
      forMass = [...forMass, i]
    }
    return (
      <div className='containerLoadingAdmin'>
        {forMass.map(()=><div className="cardLoadingAdmin">
          <div className="blockLoadingAdmin imgAdmin"></div>
          <div className="fd-colAdmin">
            <div className="fd-rowAdmin">
                <div className="blockLoadingAdmin textAdmin"></div>
                <div className="blockLoadingAdmin priceAdmin"></div>
            </div>
            <div className="blockLoadingAdmin btnAdmin"></div>
          </div>
        </div>)}
      </div>
    )
}
