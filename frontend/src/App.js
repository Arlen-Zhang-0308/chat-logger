import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "./components/record.css";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

export const host = "http://localhost:18080";

export function getHost() {
  return host;
}

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
