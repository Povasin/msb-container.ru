import React, { useEffect } from 'react'
import Header from './HeaderAdmin'
import SideBar from './SideBar'
import "./adminScss/layOut.scss"
import {useLocation, useNavigate} from 'react-router-dom'
import {exit, authSlice} from "../shared/store/slices/auth"
import { useSelector } from 'react-redux'
import { store } from '../shared/store/slices/store';

export default function LayoutAdmin(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state)=>state.authSlice) 
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      if (user.role == undefined) {
        navigate(`/admin`)
      } else if (user?.userData == null){
          store.dispatch(authSlice.actions.setUser(localStorage.getItem("user")))
      }
    }
  }, [])
  return (
    <>
      { location.pathname.split("/")[2] != null ? 
      <div className='LayOut'>
        <SideBar/>
        <div  className='LayOut__children' >
            <Header/>
            {props.children} 
        </div>
      </div> :  <div className='LayOut__Login'> {props.children} </div>}
    </>
  
  )
}
