import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link as RouterLink } from 'react-router-dom';
import PageContainer from './utils/PageContainer.js';
import ProductModal from './utils/EquipmentDetailModal.js';

import cdj3000Img from './assets/equipment_pics/cdj3000.jpg';
import djm900nxs2Img from './assets/equipment_pics/djm900nexus_angle_wht_high.jpg';
import xdjxzImg from './assets/equipment_pics/xdj.jpg'

type Product = {
  id: number;
  nazev: string;
  obrazek: string;
  popis: string;
};

const featuredProducts: Product[] = [
  {
    id: 1,
    nazev: 'CDJ-3000',
    obrazek: cdj3000Img,
    popis: 'Špičkový přehrávač pro profesionální DJ.',
  },
  {
    id: 2,
    nazev: 'DJM-900NXS2',
    obrazek: djm900nxs2Img,
    popis: 'Profesionální mixážní pult s vynikajícím zvukem.',
  },
  {
    id: 3,
    nazev: 'XDJ-XZ',
    obrazek: xdjxzImg,
    popis: 'All-in-one řešení pro mobilní i klubové DJ.',
  },
];

const Home: React.FC = () => {
  // ⬇️ Hooky a funkce musí být tady!
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <PageContainer>
      <Typography variant="h2" gutterBottom align="center">
        Vítejte v DJ Rentalu
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom align="center">
        Pronájem špičkové DJ techniky Pioneer DJ pro každou akci
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={RouterLink}
        to="/RenatableEquipment"
        sx={{ mt: 2, mb: 4, display: 'block', mx: 'auto' }}
      >
        Prohlédnout techniku
      </Button>

      <Typography variant="h4" gutterBottom align="center">
        Naše top produkty
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'nowrap',
          mt: 2,
          mb: 4,
        }}
      >
        {featuredProducts.map((item) => (
          <Card
            key={item.id}
            sx={{
              width: 370,
              maxWidth: '100%',
              mx: 'auto',
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={item.obrazek}
              alt={item.nazev}
              sx={{
                objectFit: 'contain',
                bgcolor: '#ffffffff',
                cursor: 'pointer',
                transition: 'filter 0.2s, opacity 0.2s',
                '&:hover': { filter: 'grayscale(1)', opacity: 0.7 },
              }}
              onClick={() => handleOpen(item)}
            />
            <CardContent>
              <Typography variant="h6">{item.nazev}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.popis}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <ProductModal open={open} onClose={handleClose} product={selectedProduct} />
      </Box>
    </PageContainer>
  );
};

export default Home;