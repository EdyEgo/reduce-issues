// import React,{use} from 'react';
import {BrowserRouter as Router , Routes} from 'react-router-dom'

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {} from '@reduxjs/toolkit'
import { useState  } from 'react';
import {fakeLogin} from './store/auth'

function App() {

 const authStore = useSelector((state:any)=> state.auth)
 const dispatch = useDispatch()
 const [someState,setSomeState] = useState('hey')
  return (
    <div className="App bg-blue-400 pt-2">
     hey son {authStore.user.email}
     <button onClick={()=>{dispatch(fakeLogin())}}>click me</button>
    </div>
    
  );
}

export default App;
