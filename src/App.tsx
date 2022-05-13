// import React,{use} from 'react';
import {BrowserRouter as Router , Routes} from 'react-router-dom'

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {} from '@reduxjs/toolkit'
import { useState  } from 'react';
import {fakeLogin} from './store/auth'
import {auth} from './firebase'
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth'

function App() {

 const authStore = useSelector((state:any)=> state.auth)
 const dispatch = useDispatch()
 const [someState,setSomeState] = useState('hey')

  const testSignUpFirebase = async ()=>{
    const signedIn = await createUserWithEmailAndPassword(auth,'prodan.septimiu@gmail.com','test1234')
   console.log('registered ???',signedIn)
  }

  return (
    <div className="App bg-blue-400 pt-2">
     hey son {authStore.user.email}
     <button onClick={()=>{dispatch(fakeLogin())}}>click me</button>
     <button className='bg-red-400 p-2 border rounded-sm' onClick={testSignUpFirebase}>Register ....Now :\ !!!!</button>
    </div>
    
  );
}

export default App;
