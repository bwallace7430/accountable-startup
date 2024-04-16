import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './shared/header'
import Login from './login/login'
import Journal from './journal/journal'
import Friends from './friends/friends'
import Footer from './shared/footer'
import Home from './landing/home'

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </ BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App
