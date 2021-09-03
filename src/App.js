import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import Management from './Management';
 
function App() {
  return(
    <Router >
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/Management" component={Management} />
      </div>
    </Router>
  )
  
}

export default App;