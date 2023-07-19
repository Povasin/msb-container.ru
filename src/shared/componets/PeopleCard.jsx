import React from 'react'
import { Link } from 'react-router-dom';

export default function PeopleCard({item}) {
  return (
      <Link to={`/admin/poeple/${item.idUser}`} className='bag__block'>
          <div className="borderRadius"> <img src="/peopleCard.svg" alt="сотрудник"/></div>
          <p>{item.name}</p>
      </Link>
  )
}
