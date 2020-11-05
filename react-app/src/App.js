import './App.css';
import Navbar from './components/Navbar'
import Encode from './components/Encode'
import Decode from './components/Decode'
import About from './components/About'
import { BrowserRouter, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Route path="/about" component={About}/>
        <Route exact path={["/", "/encode"]} component={Encode}/>
        <Route path ="/decode" component={Decode}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
