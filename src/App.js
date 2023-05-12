import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import  from '';
// import  from '';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
          {/* <Route path="/" component={ } />
          <Route path="/" component={ }/>
          <Route path="/" component={ }/> */}
        </Switch>
      </main>
    );
  }
}

export default App;
