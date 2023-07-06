import './App.css';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import CheckOut from './pages/CheckOut';

import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketDetails from './pages/TicketDetails';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/ticketdetails" element={<TicketDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </div>
  );
}

export default App;
