import { useEffect } from 'react'
import {React, Suspense} from 'react'
import {Routes, useLocation, Route } from 'react-router-dom'
import RouterConfig from "../../../shared/routerConfig"
import RouterConfigAdmin from "../../../shared/routerConfigAdmin"
import { authSlice } from '../../../shared/store/slices/auth'
import { useSelector } from 'react-redux'
import {store} from "../../../shared/store/slices/store"
export default function AppRouter() {
  const auth = useSelector((state)=>state.authSlice)
  const location = useLocation()
  const user = localStorage.getItem("user")
  useEffect(()=>{
    if (user && !auth.userData) {
      store.dispatch(authSlice.actions.setUser(user))
    }
  }, [])

  return (
    <Suspense fallback={<h1>loading profile...</h1>}>
        <Routes>
           {Object.values(RouterConfig).map(({element, path}) =>(
            <Route key={path} path={path} element={element}/>
           ))}
            {Object.values(RouterConfigAdmin).map(({element, path}) =>(
            <Route key={path} path={path} element={element}/>
           ))}
        </Routes>
    </Suspense>
  )
}
