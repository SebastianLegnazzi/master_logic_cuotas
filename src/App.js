import { BrowserRouter, Route, Routes } from 'react-router-dom';

// importo componentes
import HacksCuotas from './components/HacksCuotas/HacksCuotas';
import Page404 from './components/Page404/Page404';
import Header from './components/Estructura/Header';
import Footer from './components/Estructura/Footer';
import Contexto from './components/Contexto/Contexto';

function App() {
  window.document.title = 'Master Logic Cuotas';
  return (
    <div className="App">
      <BrowserRouter basename="/master_logic_cuotas">
        {/*======= Incluimos Header =======*/}
        <Header />
        {/*======= creamos las rutas =======*/}
        <Routes>
          <Route exact path='/' element={<HacksCuotas />} />
          <Route exact path='/Contexto' element={<Contexto />}/>
          <Route path='*' element={<Page404 />} />
        </Routes>
        {/*======= Incluimos Footer =======*/}
      </BrowserRouter >
      <Footer />
    </div >
  );
}

export default App;
