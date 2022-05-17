



// import React,{use} from 'react';
import {BrowserRouter as Router , Routes} from 'react-router-dom'
import AppAreaLayout from './components/layouts/AppArea'
import ClientAreaLayout from './components/layouts/ClientArea'
import ClientArea from './components/client-area'
import AppArea from './components/app-area'
import {changeUserStatus , changeUnsubscribeStatus,changeErrorStatus} from './store/auth'
import {userState } from './api/dataBaseAuthMethods'
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {} from '@reduxjs/toolkit'
import { useState ,useEffect } from 'react';
import "./styles/signButtons.css";


function App() {

//  const authStore = useSelector((state:any)=> state.auth)
 const dispatch = useDispatch()
//  const [someState,setSomeState] = useState('hey')
// {/* <button onClick={()=>{dispatch(fakeLogin())}}>click me</button> */}

const [currentUser,setCurrentUser] = useState<null | {email:string}>(null)
const [loading,setLoading] = useState(true)





useEffect(() => {

  function setStatusCurrentUser(user:{email:string,uid:string} | null){
    setCurrentUser(user)
    dispatch(changeUserStatus(user))
  }
  
 
 
    const {error,data} =  userState(setStatusCurrentUser)
    if(error) {
      
      dispatch(changeErrorStatus(error))
      setLoading(false)
      return 
    }
    
    setLoading(false)
    changeUnsubscribeStatus(data)
  

  
  
  
 

}, [dispatch]) // functions like dispatch are  here only because of the "Mr. eslint" is screaming his lungs of ,it  does not make any sens i know


  return (
    <div className="App ">
     
     

      {
        currentUser === null 
        &&
        <ClientAreaLayout >
        <ClientArea/>
        </ClientAreaLayout>
      }

      {
      currentUser 
            && 
      <AppAreaLayout>
        <AppArea/>

      </AppAreaLayout> 
      
      }

     
     
    
    </div>
    
  );
}

export default App;




//// 





// // import React,{use} from 'react';
// import {BrowserRouter as Router , Routes} from 'react-router-dom'

// import './App.css';
// import { useDispatch, useSelector } from 'react-redux';
// import {} from '@reduxjs/toolkit'
// import { useState  } from 'react';
// import {fakeLogin} from './store/auth'
// import {auth} from './firebase'
// import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'

// function App() {

//  const authStore = useSelector((state:any)=> state.auth)
//  const dispatch = useDispatch()
//  const [someState,setSomeState] = useState('hey')

//   const testSignUpFirebase = async ()=>{
//     const signedIn = await createUserWithEmailAndPassword(auth,'prodan.septimiu@gmail.com','test1234')
//    console.log('registered ???',signedIn)
//   }

//   return (
//     <div className="pt-2 bg-blue-400 App">
//      hey son {authStore.user.email}
//      <button onClick={()=>{dispatch(fakeLogin())}}>click me</button>
//      <button className='p-2 bg-red-400 border rounded-sm' onClick={testSignUpFirebase}>Register ....Now :\ !!!!</button>
//     </div>
    
//   );
// }

// export default App; 
