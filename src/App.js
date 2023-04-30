import { BrowserRouter, Route, Routes } from 'react-router-dom';

// importo componentes
import HacksCuotas from './components/HacksCuotas/HacksCuotas';
import Page404 from './components/Page404/Page404';
import Header from './components/Estructura/Header';
import Footer from './components/Estructura/Footer';
import Contexto from './components/Contexto/Contexto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/*======= Incluimos Header =======*/}
        <Header />
        <Contexto />
        {/*======= creamos las rutas =======*/}
        <Routes>
          <Route exact path='/' element={<HacksCuotas />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
        {/*======= Incluimos Footer =======*/}
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
