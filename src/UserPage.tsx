import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/context/AuthContext.js';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import EditIcon from '@mui/icons-material/Edit';

type Rental = {
  id: number;
  userEmail: string;
  equipmentId: number;
  equipmentName: string;
  rentedFrom: string;
  rentedTo: string;
};

const UserPage = () => {
  const { user } = useAuth();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<Rental[]>(
          `http://localhost:5134/api/rentals?userEmail=${encodeURIComponent(user.email)}`
        );
        setRentals(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Chyba při načítání zápůjček');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Neznámá chyba');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [user]);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh'
        }}
      >
        <Typography variant="h6" color="error">
          Musíte být přihlášeni.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ mt: 4, textAlign: 'center' }}
      >
        Vítejte zpět {user.email}
      </Typography>

      {/* Box s osobními údaji */}
      <Box
        sx={{
          bgcolor: '#e3f2fd',
          px: 3,
          py: 2,
          borderRadius: 2,
          maxWidth: 700,
          mx: 'auto',
          mb: 4,
          boxShadow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon color="primary" />
            <Typography variant="subtitle1">{user.email}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <BadgeIcon color="primary" />
            <Typography variant="subtitle1">{user.role}</Typography>
          </Stack>
        </Stack>
        <IconButton color="primary" aria-label="Upravit profil" size="large">
          <EditIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          bgcolor: '#f5f5f5',
          px: { xs: 2, sm: 6 },
          py: 4,
          borderRadius: 2,
          maxWidth: 700,
          mx: 'auto',
          boxShadow: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Zapůjčená technika
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : rentals.length === 0 ? (
          <Typography>Nemáte žádnou půjčenou techniku.</Typography>
        ) : (
          <List>
            {rentals.map(rental => (
              <React.Fragment key={rental.id}>
                <ListItem>
                  <ListItemText
                    primary={rental.equipmentName}
                    secondary={`Od: ${rental.rentedFrom}  Do: ${rental.rentedTo}`}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default UserPage;