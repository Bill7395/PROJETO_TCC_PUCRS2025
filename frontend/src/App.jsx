import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardVendedor from './pages/DashboardVendedor';
import DashboardCliente from './pages/DashboardCliente';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pedidos" element={<DashboardVendedor />} />
        <Route path="/meus-pedidos" element={<DashboardCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
