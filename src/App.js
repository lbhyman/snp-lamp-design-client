import Header from './Header';
import Home from './Home';
import About from './About';
import Tutorial from './Tutorial';
import { Route } from 'react-router-dom';

function App() {
    return (
      <div className="AppDiv">
        <Header />
        <div className='Content'>
          <Route exact path='/' component = {Home} />
          <Route exact path='/about' component = {About} />
          <Route exact path='/tutorial' component = {Tutorial} />
        </div>  
      </div>
    );
}

export default App;
