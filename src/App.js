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

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
         <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path={`/bookdetail/:bookid`} element={<BookDetail/>} />
          </Routes>
        </BrowserRouter>,
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar
          // newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
    </div>
  );
}

export default App;
