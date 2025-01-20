import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Signin from './Components/Login';

import Dashboard from './Components/Dshboard';
import Login from './Components/Login';
import Authprovider from './Components/Authprovider';


function App() {


  return (
    <>
    <Authprovider>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Signin />}/>
        <Route path='/signin' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    </Authprovider>
    </>
  );
}

export default App;
