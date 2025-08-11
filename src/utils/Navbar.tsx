import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';
import React from 'react';
import LoginModal from './LoginModal.js';
import { useAuth } from '../context/AuthContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // přesměruje na homepage
  };
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5134/api/auth/login', {
        email,
        password,
      });
      if (response.status === 200) {
        // ​Zavolej login z contextu
        login({
          email: response.data.email,
          role: response.data.role,
        });
        setLoginOpen(false); // zavři modal
        navigate('/User');        
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Chyba přihlášení');
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Neznámá chyba');
      }
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Button color="inherit" component={RouterLink} to="/Home">Domů</Button>
          <Button color="inherit" component={RouterLink} to="/RenatableEquipment">Naše technika</Button>
          <Button color="inherit" component={RouterLink} to="/Contact">Kontakt</Button>
          {user && (<Button color="inherit" component={RouterLink} to="/User">Můj profil</Button>)}
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <>              
              <span style={{ marginRight: 16 }}>{user.email} ({user.role})</span>
              <Button color="inherit" onClick={handleLogout}>Odhlásit se</Button>
              {/* ​Např. admin sekce */}
              {user.role === 'admin' && (
                <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
              )}
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginOpen}>
              Přihlásit se
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal
        open={loginOpen}
        onClose={handleLoginClose}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;