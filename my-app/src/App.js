import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard'; 

function App() {
    return (      
       <BrowserRouter>
            <Routes>
                < Route path='/' element={<Login />} />
                < Route path='/dashboard' element={<Dashboard />} />
                < Route path='/manager-dashboard' element={<ManagerDashboard />} />
           </Routes>
      </BrowserRouter>
    );
}
 
export default App;