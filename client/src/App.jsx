import './App.css';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketDetails from './pages/TicketDetails';
import Signup from './components/signUp';
import Login from './components/Login';
import RequiredAuth from './Private';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/home" element={<HomePage />} />

        <Route
          path="/movie/:id"
          element={
            <RequiredAuth>
              <MovieDetails />
            </RequiredAuth>
          }
        />

        <Route
          path="/ticketdetails"
          element={
            <RequiredAuth>
              <TicketDetails />
            </RequiredAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
