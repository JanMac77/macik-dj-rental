import Navbar from './utils/Navbar.js';
import Home from './Home.js';
import Technika from './RenatableEquipment.js';
import Kontakt from './Contact.js';
import { Route, Routes } from 'react-router-dom';
import PageContainer from './utils/PageContainer.js';
import UserPage from './UserPage.js';

function App() {  
  return (
    <>    
      <Navbar />
      <Routes>
        <Route path="/" element={<PageContainer><Home /></PageContainer>} />
        <Route path="/Home" element={<PageContainer><Home /></PageContainer>} />
        <Route path="/RenatableEquipment" element={<PageContainer><Technika /></PageContainer>} />
        <Route path="/Contact" element={<PageContainer><Kontakt /></PageContainer>} />
        <Route path="/SignIn" element={<PageContainer><Kontakt /></PageContainer>} />
        <Route path="/User" element={<PageContainer><UserPage /></PageContainer>} />
      </Routes>
    </>
  )
}

export default App;