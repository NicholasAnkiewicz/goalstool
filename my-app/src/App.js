import { BrowserRouter, Route, Routes } from 'react-router-dom';
 import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard'; 
import NewGoal from './pages/NewGoal';
import GoalCard from './pages/components/GoalCard';
import AlertBox from './pages/components/AlertBox';
function App() {
    return (      
       <BrowserRouter>
            <Routes>
                < Route path='/' element={<Login />} />
                < Route path='/dashboard' element={<Dashboard />} />
                < Route path='/manager-dashboard' element={<ManagerDashboard />} />
                < Route path='/NewGoal' element={<NewGoal />} />
                < Route path='/goalcard' element={<GoalCard/> } />
                < Route path='/alertbox' element={<AlertBox/> } />
           </Routes>
      </BrowserRouter>
    );
}

export default App;