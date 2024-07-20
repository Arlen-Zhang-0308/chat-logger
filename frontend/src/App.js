import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "./components/record/index.css";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';

export const host = "http://localhost:18080";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
