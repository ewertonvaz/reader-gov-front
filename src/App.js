import { Toaster } from 'react-hot-toast';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContextComponent } from "./contexts/authContext";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from './pages/UploadPage';
import ErrorPage from "./pages/ErrorPage";
import ProtectRoute from "./components/ProtectRoute";
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <NavBar />
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/profile" element={<ProtectRoute Component={ProfilePage} />}/>
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </AuthContextComponent>
      <Footer/>
    </div>
  );
}

export default App;
