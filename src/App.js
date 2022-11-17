import { Toaster } from 'react-hot-toast';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import DashBoardPage from './pages/DashBoardPage';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* NESSE MOMENTO ADICIONO UM ROUTE SEM PATH E DIGO QUE ELE IRÁ RENDERIZAR O ELEMENT E, NESTE CASO O HEADER, PARA TODOS OS ROUTES ABAIXO DELE QUE DEREM MATCH */}
        <Route element={<><NavBar /> {/* O Header sendo renderizado */} <Outlet /> {/* Outlet será substituído pelo element dos route filho */}</>}>
          <Route path="/dashboard" element={<DashBoardPage />} />
          {/* <Route path="/beers" element={<ListBeersPage />} />
          <Route path="/beers/:beerId" element={<BeerDetailsPage />} />
          <Route path="/random-beer" element={ <RandomBeerPage /> } />
          <Route path="/new-beer" element={ <NewBeerPage /> } />
          <Route path="/edit-beer/:beerId" element={ <EditBeerPage /> } /> */}
          {/* ...*/}
          {/* Demais Route com Header*/}
        </Route>
        {/*Path Coringa - sem Header*/}
        <Route path="*" element={<h1>ERROR 404</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
