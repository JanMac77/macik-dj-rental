import Box from '@mui/material/Box';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer: React.FC<PageContainerProps> = ({ children }) => (
  <Box
    sx={{
      maxWidth: 900,
      mx: 'auto',
      mt: 4,
      p: 2,
      minHeight: 'calc(100vh - 64px - 32px)', // 64px = výška navbaru, 32px = marginy
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // centrování obsahu horizontálně
      justifyContent: 'center', // centrování obsahu vertikálně
    }}
  >
    {children}
  </Box>
);

export default PageContainer;