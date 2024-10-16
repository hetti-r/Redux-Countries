import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './components/Home'
import ErrorPage from './components/ErrorPage'
import "bootstrap/dist/css/bootstrap.min.css"
import Countries from './components/Countries'
import CountrySingle from './components/CountrySingle'
import Register from './components/Register'
import Favourites from './components/Favourites'
import Login from './components/Login'
import ProtectedRoute from './auth/ProtectedRoute'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './auth/firebase'
import './global.css';

const App = () => {

  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/countries/:single" element={<CountrySingle />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App