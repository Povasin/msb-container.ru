import React, { useEffect } from 'react'
import Header from './Header'
import Footer from "./Footer"
import {BagSlice} from "../shared/store/slices/bag"
import {store} from "../shared/store/slices/store"
export default function LayOut(props) {
  useEffect(()=>{
    store.dispatch(BagSlice.actions.fillStore());
  }, [])
  return (
    <>
      <Header/>
        {props.children}  
      <Footer/>
    </>

  )
}
