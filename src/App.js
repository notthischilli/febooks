import React from 'react';
import './App.css';
import BookForm from './components/BookForm';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';

function App() {
  return (
    <div className="container">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path={`/bookdetail/:bookid`} element={<BookDetail/>} />
          </Routes>
        </BrowserRouter>,
    </div>
  );
}

export default App;
