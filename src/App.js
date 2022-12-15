import { Toaster } from 'react-hot-toast';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import { AuthContextComponent } from "./contexts/authContext";

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
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
import DocumentsPage from './pages/DocumentsPage';
import DocumentDetalhesPage from './pages/DocumentDetailsPage';
import DocumentEditPage from './pages/DocumentEditPage';
import DocumentNewPage from './pages/DocumentNewPage';
import UserListPage from './pages/UserListPage';
import SeiLoginPage from './pages/SeiLoginPage';
import EditUserByAdminPage from   './pages/EditUserByAdminPage';


function App() {

  return (
    <div className="App d-flex flex-column h-100">

      <Toaster />

      <AuthContextComponent>
        <Routes>

          {/* Estast rotas ficarão SEM a NavBar padrão */}
          <Route path="/signup" element={<SignUpPage /> }></Route>

          {/* Todas as rotas aqui dentro estão COM a NavBar */}
          <Route element={<> <NavBar /> <Outlet /> </>}>

            {/* Estast rotas ficarão SEM container */}
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/profile" element={<ProtectRoute Component={ProfilePage} />} />
            <Route path="/edit-user/:idUser" element={<ProtectRoute Component={EditUserByAdminPage}/>}/>
            <Route path="/login-sei" element={<SeiLoginPage/>}/>
            <Route path="/leitura/:tipoConteudo/:idConteudo" element={<ProtectRoute Component={Leitura} />} />
            <Route path="/" element={<ProtectRoute Component={HomePage} />}></Route>

            {/* Todas as rotas aqui dentro estão COM container */}
            <Route element={<> <div className='container py-3'><Outlet /></div> </>}>
              <Route path="/userlist" element={<ProtectRoute Component={UserListPage} />}></Route>

              <Route path="/books" element={<ProtectRoute Component={BooksPage} />}></Route>
              <Route path="/books/new" element={<ProtectRoute Component={BookNewPage} />}></Route>
              <Route path="/books/:bookID" element={<ProtectRoute Component={BookDetailsPage} />}></Route>
              <Route path="/books/:bookID/edit" element={<ProtectRoute Component={BookEditPage} />}></Route>
              <Route path="/books/google" element={<ProtectRoute Component={GoogleBooksPage} />} />

              <Route path="/documents" element={<ProtectRoute Component={DocumentsPage} />}></Route>
              <Route path="/documents/new" element={<ProtectRoute Component={DocumentNewPage} />}></Route>
              <Route path="/documents/:documentID" element={<ProtectRoute Component={DocumentDetalhesPage} />}></Route>
              <Route path="/documents/:documentID/edit" element={<ProtectRoute Component={DocumentEditPage} />}></Route>
              <Route path="/profile" element={<ProtectRoute Component={ProfilePage} hideContainer={true}/>} />
              <Route path="/server-env" element={<ProtectRoute Component={ServerEnvPage} />} />
              <Route path="/upload" element={<ProtectRoute Componente={UploadPage} />}></Route>

              <Route path="*" element={<ErrorPage />}></Route>
            </Route>


          </Route>
        </Routes>
      </AuthContextComponent>

      <Footer />
    </div>
  );
}

export default App;