import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookform from './Components/Bookform';
import Booklist from './Components/Booklist';

function App() {
  return (
    <Router>
      <container>
       <h1 className="my-4 text-center title-main">
   CodeShelf
</h1>
        <Routes>
        <Route path='/' element={<Booklist/>}/>
        <Route path='/add' element={<Bookform/>}/>
        <Route path='/edit/:id'element={<Bookform/>}/>
        </Routes>
      </container>
    </Router>
  )
}

export default App