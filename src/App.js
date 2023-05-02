import { HashRouter, Route, Routes } from 'react-router-dom';

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
      <HashRouter>
        {/*======= Incluimos Header =======*/}
        <Header />
        {/*======= creamos las rutas =======*/}
        <Routes>
          <Route path='/' element={<HacksCuotas />} />
          <Route path='/Contexto' element={<Contexto />}/>
          <Route path='*' element={<Page404 />} />
        </Routes>
        {/*======= Incluimos Footer =======*/}
      </HashRouter >
      <Footer />
    </div >
  );
}

export default App;
