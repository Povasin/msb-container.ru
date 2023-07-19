import React, {useEffect, useState, useRef} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {store} from "../shared/store/slices/store"
import {exit, authSlice} from "../shared/store/slices/auth"
import {changePeople, deletePeople, peopleSlice} from "../shared/store/slices/people"
import "./scss/CreatePeoplePage.scss"

export default function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const peopleStorage = JSON.parse(localStorage.getItem("people"))
  const user = useSelector((state)=>state.authSlice)
  let myPeople = peopleStorage.find((item)=>item.idUser == location.pathname.split("/")[3]) 
  const [form, setForm ] = useState({
    name: myPeople.name,
    phone: myPeople.phone,
    role: myPeople.role,
    idUser: myPeople.idUser
  })
  const [checkInput, setCheckInput] = useState('')
  const auth = useSelector((state)=>state.peopleSlice)
  const [isChanged, setIsChanged] = useState(false)
  function changeInput(key, e) {
    setIsChanged(true)
    setForm({...form, [key]: e.target.value})
  }
  async function send() {
    if (form.name == "" || form.phone == "" || form.role == "") {
      setCheckInput("поля не заполненны")
    } else {
        setCheckInput("")
        await store.dispatch(changePeople({body: form}))
        auth?.error == "" && navigate("/admin/people")
    } 
  }
  async function deletePeopleFUNC(params) {
      store.dispatch(deletePeople({idUser: myPeople.idUser}))
        if (user.userData.idUser == myPeople.idUser) {
            return new Promise((resolve, reject) => {
                resolve(store.dispatch(authSlice.actions.exit()))
            }).then(()=>{navigate("/")})
        } else{
            navigate("/admin/people")
        }
  }
  useEffect(()=>{
    store.dispatch(peopleSlice.actions.clearError());
  }, [])
  return (
    <main>   
        <div className="registerPeople">
            <h1>Редактирование сотрудника</h1>
            <div className="register-row">
                <input type="text" id="nameReg" placeholder="ФИО" value={form.name} onChange={(e)=>changeInput("name", e)}maxLength="20" />
                <input type="tel" id="phone"placeholder="Номер телефона" value={form.phone} onChange={(e)=>changeInput("phone", e)} maxLength="40" />
                 {myPeople.idUser != 1 &&  <select onClick={(e)=>changeInput("role", e)} className="select" name="role">
                { myPeople.role == "Администратор" ? 
                <>
                    <option  value="Администратор">Администратор</option>
                    <option  value="Менеджер" >Менеджер</option></> :  
                <> 
                    <option  value="Менеджер" >Менеджер</option>
                    <option  value="Администратор">Администратор</option>
                </>}    
                </select>}
                <p className="error">{auth?.error}{checkInput}{}</p>
                <div className="fd-row">
                    <button className={`registerBTN ${!auth.isLoading  ? "" : "loading"} `} disabled={auth.isLoading } onClick={send}>{!isChanged && !auth.isLoading  ? "Сохраненно" : !auth.isLoading ? "Сохранить" : "Загрузка"}</button>
                  {myPeople.idUser != 1 && <button className='deleteBtn' onClick={deletePeopleFUNC}>Удалить</button>} 
                </div>
            </div>
        </div>  
    </main>
  )
}


