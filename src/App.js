import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './Home';
import Management from './Management';
 
class App extends React.Component {
  render(){
    return(
      <Router >
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/Management" component={Management} />
        </div>
      </Router>
    )
  }
}

export default App;