import React, { useEffect } from 'react'
import Header from './Header'
import Footer from "./Footer"
import {BagSlice} from "../shared/store/slices/bag"
import {store} from "../shared/store/slices/store"
import { useNavigate } from 'react-router-dom'
export default function LayOut(props) {
  const navigate = useNavigate()
  useEffect(()=>{
    store.dispatch(BagSlice.actions.fillStore());
  }, [])
  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      if (user.role != undefined) {
        navigate(`/admin`)
      }
    }
  }, [])
  return (
    <>
      <Header/>
        {props.children}  
      <Footer/>
    </>

  )
}
