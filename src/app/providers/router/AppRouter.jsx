import {React, Suspense} from 'react'
import {Routes, useLocation, Route } from 'react-router-dom'
import RouterConfig from "../../../shared/routerConfig"
export default function AppRouter() {

    const location = useLocation()

  return (
    <Suspense fallback={<h1>loading profile...</h1>}>
        <Routes>
           {Object.values(RouterConfig).map(({element, path}) =>(
            <Route key={path} path={path} element={element}/>
           ))}
        </Routes>
    </Suspense>
  )
}
