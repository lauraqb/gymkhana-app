import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Intro from './pages/Intro'
import Prueba1 from './pages/Prueba1'
import Prueba2 from './pages/Prueba2'
import Prueba3 from './pages/Prueba3'
import Prueba4 from './pages/Prueba4'
import Prueba5 from './pages/Prueba5'
import Prueba6 from './pages/Prueba6'
import Prueba7 from './pages/Prueba7'
import Final from './pages/Final'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio} />
        <Route exact path="/intro" component={Intro} />
        <Route exact path="/prueba1" component={Prueba1} />
        <Route exact path="/prueba2" component={Prueba2} />
        <Route exact path="/prueba3" component={Prueba3} />
        <Route exact path="/prueba4" component={Prueba4} />
        <Route exact path="/prueba5" component={Prueba5} />
        <Route exact path="/prueba6" component={Prueba6} />
        <Route exact path="/prueba7" component={Prueba7} />
        <Route exact path="/final" component={Final} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
