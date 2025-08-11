import Box from '@mui/material/Box';

const PageContainer = ({ children }) => (
  <Box
    sx={{
      maxWidth: 900,
      mx: 'auto',
      mt: 4,
      p: 2,
      minHeight: 'calc(100vh - 64px - 32px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {children}
  </Box>
);

export default PageContainer;