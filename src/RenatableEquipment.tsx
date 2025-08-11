import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import PageContainer from './utils/PageContainer.js';
import cdj3000Img from './assets/equipment_pics/cdj3000.jpg';
import djm900nxs2Img from './assets/equipment_pics/djm900nexus_angle_wht_high.jpg';
import xdjxzImg from './assets/equipment_pics/xdj.jpg'
import plx100 from './assets/equipment_pics/plx100.jpg'
import ddj1000 from './assets/equipment_pics/ddj1000.jpg'
import EquipmentModal from './utils/EquipmentDetailModal.js'

type TechnikaItem = {
  id: number;
  nazev: string;
  typ: string;
  cenaZaDen: number;
  obrazek: string;
  popis: string;
};

const data: TechnikaItem[] = [
  {
    id: 1,
    nazev: 'CDJ-3000',
    typ: 'Přehrávač',
    cenaZaDen: 1200,
    obrazek: cdj3000Img,
    popis: 'CDJ-3000 je vlajkový model přehrávače od Pioneer DJ s dotykovým displejem, pokročilým jogem a extrémně rychlým procesorem. Podporuje USB, SD karty a má špičkovou stabilitu a workflow.',
  },
  {
    id: 2,
    nazev: 'DJM-900NXS2',
    typ: 'Mixážní pult',
    cenaZaDen: 1500,
    obrazek: djm900nxs2Img,
    popis: 'DJM-900NXS2 je profesionální 4kanálový mixážní pult s 64bitovým procesorem, vylepšenými efekty, dvoukanálovým USB a legendární kvalitou zvuku. Standard v klubech po celém světě.',
  },
  {
    id: 3,
    nazev: 'XDJ-XZ',
    typ: 'All-in-one',
    cenaZaDen: 1800,
    obrazek: xdjxzImg,
    popis: 'XDJ-XZ je all-in-one DJ systém s velkými jogy, 4 kanály, podporou rekordboxu i Serato DJ Pro. Ideální pro mobilní i klubové DJ, nabízí profi ovládání a flexibilitu.',
  },
  {
    id: 4,
    nazev: 'PLX-1000',
    typ: 'Gramofon',
    cenaZaDen: 900,
    obrazek: plx100,
    popis: 'PLX-1000 je robustní profesionální gramofon s vysokým točivým momentem, ideální pro scratch i klasické DJ hraní. Nabízí precizní ovládání a špičkovou kvalitu zvuku.',
  },
  {
    id: 5,
    nazev: 'DDJ-1000',
    typ: 'Kontroler',
    cenaZaDen: 1000,
    obrazek: ddj1000,
    popis: 'DDJ-1000 je populární 4kanálový DJ kontroler pro rekordbox DJ s velkými jogy, LCD displeji a klubovým layoutem. Perfektní pro domácí i profesionální použití.',
  },{
    id: 6,
    nazev: 'XDJ-XZ',
    typ: 'All-in-one',
    cenaZaDen: 1800,
    obrazek: xdjxzImg,
    popis: 'XDJ-XZ je all-in-one DJ systém s velkými jogy, 4 kanály, podporou rekordboxu i Serato DJ Pro. Ideální pro mobilní i klubové DJ, nabízí profi ovládání a flexibilitu.',
  },
  {
    id: 7,
    nazev: 'PLX-1000',
    typ: 'Gramofon',
    cenaZaDen: 900,
    obrazek: plx100,
    popis: 'PLX-1000 je robustní profesionální gramofon s vysokým točivým momentem, ideální pro scratch i klasické DJ hraní. Nabízí precizní ovládání a špičkovou kvalitu zvuku.',
  },
  {
    id: 8,
    nazev: 'DDJ-1000',
    typ: 'Kontroler',
    cenaZaDen: 1000,
    obrazek: ddj1000,
    popis: 'DDJ-1000 je populární 4kanálový DJ kontroler pro rekordbox DJ s velkými jogy, LCD displeji a klubovým layoutem. Perfektní pro domácí i profesionální použití.',
  }
];

const RenatableEquipment = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<TechnikaItem | null>(null);

  const handleOpen = (item: TechnikaItem) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom align="center">
        Naše technika
      </Typography>
      <Box
  sx={{
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
    gap: 4,
    justifyItems: 'center',
    mt: 2,
    mb: 4,
  }}
>
  {data.map((item) => (
    <Card
      key={item.id}
      sx={{
        width: 370,
        maxWidth: '100%',
        mx: 'auto',
        cursor: 'pointer',
        transition: 'filter 0.2s, opacity 0.2s',
        '&:hover': { filter: 'grayscale(1)', opacity: 0.7 },
      }}
      onClick={() => handleOpen(item)}
    >
      <CardMedia
        component="img"
        height="180"
        image={item.obrazek}
        alt={item.nazev}
        sx={{
          objectFit: 'contain',
          bgcolor: '#ffffffff',
        }}
      />
      <CardContent>
        <Typography variant="h6">{item.nazev}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.typ}
        </Typography>
        <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
          {item.cenaZaDen} Kč / den
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>
      <EquipmentModal open={open} onClose={handleClose} product={selectedItem} />
    </PageContainer>
  );
};

export default RenatableEquipment;