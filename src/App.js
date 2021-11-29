import Header from './Header';
import Home from './Home';
import About from './About';
import Tool from './Tool';
import { Route } from 'react-router-dom';

function App() {
    return (
      <div className="AppDiv">
        <Header />
        <div className='Content'>
          <Route exact path='/' component = {Home} />
          <Route exact path='/tool' component = {Tool} />
          <Route exact path='/about' component = {About} />
        </div>  
      </div>
    );
}

export default App;
