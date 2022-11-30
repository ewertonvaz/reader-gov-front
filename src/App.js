import { Toaster } from 'react-hot-toast';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="*" element={<h1>ERROR 404</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
