import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Product = {
  id: number;
  nazev: string;
  obrazek: string;
  popis: string;
  cenaZaDen?: number;
};

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
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

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={style}>
      {product ? (
        <>
          <Typography variant="h5" gutterBottom>
            {product.nazev}
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={product.obrazek}
              alt={product.nazev}
              style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.popis}
          </Typography>
          {product.cenaZaDen !== undefined && (
            <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
              Cena za den: {product.cenaZaDen} Kč
            </Typography>
          )}
        </>
      ) : (
        <Typography>Produkt nenalezen.</Typography>
      )}
    </Box>
  </Modal>
);

export default ProductModal;