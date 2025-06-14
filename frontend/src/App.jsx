import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import PublishProduct from './pages/PublishProduct';
import Cart from './pages/Cart';
import { getUser } from './services/auth';

function App() {
  const usuario = getUser();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {usuario ? (
          <>
            <Route path="/cart" element={<Cart />} />
            {usuario.tipo === 'vendedor' ? (
              <>
                <Route path="/orders" element={<Orders />} />
                <Route path="/publish" element={<PublishProduct />} />
              </>
            ) : (
              <Route path="/orders" element={<Orders />} />
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
