import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import MateriaList from './components/materias/MateriaList.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import Header from './components/ui/Header.jsx';
import Footer from './components/ui/Footer.jsx';
import './assets/styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header user={user} />
      <main>
        <Routes>
          <Route path="/" element={user ? <MateriaList /> : <Login setUser={setUser} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;