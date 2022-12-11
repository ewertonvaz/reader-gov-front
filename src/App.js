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
import ServerEnvPage from './pages/ServerEnvPage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import BookEditPage from './pages/BookEditPage';
import BookNewPage from './pages/BookNewPage';
import GoogleBooksPage from './pages/GoogleBooksPage';
import Leitura from "./pages/Leitura";

function App() {
  return (
    <div className="App d-flex flex-column h-100">
      <AuthContextComponent>
        <NavBar />
        <Toaster />

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/books" element={<BooksPage />}></Route>
            <Route path="/books/new" element={<BookNewPage />}></Route>
            <Route path="/books/:bookID" element={<BookDetailsPage />}></Route>
            <Route path="/books/:bookID/edit" element={<BookEditPage />}></Route>
            <Route path="/books/google" element={<GoogleBooksPage />} />
            <Route path="/books/leitura/:livroID" element={<Leitura />} />

            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/sign-up" element={<SignUpPage />}></Route>
            <Route path="/profile" element={<ProtectRoute Component={ProfilePage} />} />
            <Route path="/server-env" element={<ServerEnvPage Component={ProfilePage} />} />
            <Route path="/upload" element={<UploadPage />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
        
      </AuthContextComponent>
      <Footer />
    </div>
  );
}

export default App;
