import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

    // Resetuj pole při zavření modalu
  React.useEffect(() => {
    if (!open) {
      setEmail('');
      setPassword('');
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" gutterBottom>
          Přihlášení
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Heslo"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Zrušit
            </Button>
            <Button type="submit" variant="contained">
              Přihlásit se
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;