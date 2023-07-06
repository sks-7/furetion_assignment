import './App.css';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';


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
       
      </Routes>
    </div>
  );
}

export default App;
