import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar = () => (
  <AppBar position="static" sx={{ width: '100%' }}>
    <Toolbar>
      <Button color="inherit" component={RouterLink} to="/Home">Domů</Button>
      <Button color="inherit" component={RouterLink} to="/RenatableEquipment">Naše technika</Button>
      <Button color="inherit" component={RouterLink} to="/Contact">Kontakt</Button>
      {/* //  je "pružná mezera" – zabere všechen volný prostor mezi předchozími tlačítky a tím posledním.Vše, co je za tímto Boxem, je zarovnané úplně doprava. */}
      <Box sx={{ flexGrow: 1 }} />
      <Button color="inherit" component={RouterLink} to="/Contact">Přihlásit se</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;