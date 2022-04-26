import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import List from './components/List';
import Edit from './components/Edit';
import Login from './components/Login';
import Signup from './components/Signup';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} >
        
          </Route>
  
          <Route path="/edit" element={<Edit />} >
        
          </Route>
          <Route path="/login" element={<Login />} >
        
          </Route>
          <Route path="/" element={<List />} >
        
          </Route>

        </Routes>
        {/* <Link to={`/about?name=mien&age=20`}>about</Link> */}
      </BrowserRouter>

    </div>
  )
}
