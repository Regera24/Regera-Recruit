import './App.css';
import { Routes, Route} from 'react-router-dom';
import DLayout from './Components/Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Protected from './Pages/Protected';
import JobManage from './Pages/JobManage';
import User from './Pages/User';
import DCompany from './Pages/DetailCompany';
import Search from './Pages/Search';
import Dashboard2 from './Pages/Dashboard2';
import UserPage from './Pages/UserPage';
import Unauthorized from './Pages/ErrorPage/Unauthorized';
import UserProtected from './Pages/Protected/UserProtected';
import CompanyProtected from './Pages/Protected/CompanyProtected';
import DetailJob from './Pages/DetailJob';
import CVForm2 from './Pages/JobManage/CVForm2';
import Forget from './Pages/Login/forget';
import AdminDashboard from './Pages/AdminDashboard';
function App() {
  return (
      <Routes>
        <Route path='/' element={<DLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/dashboard' element={<Protected><Dashboard2/></Protected>}></Route>
          <Route path='/manage-jobs' element={<Protected><JobManage/></Protected>}></Route>
          <Route path='/user' element={<Protected><CompanyProtected><User/></CompanyProtected></Protected>}></Route>
          <Route path='/user-company' element={<Protected><UserProtected><UserPage/></UserProtected></Protected>}></Route>
          <Route path='/company/:id' element={<DCompany/>}></Route>
          <Route path='/job/:jid' element={<DetailJob/>}></Route>
          <Route path='/cv/:cvid' element={<CVForm2/>}></Route>
          <Route path='/search/:keywords' element={<Search/>}></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
        </Route>
        <Route path='/unauthorized' element={<Unauthorized/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/forget' element={<Forget/>}></Route>
      </Routes>
  );
}

export default App;
