import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed';
import Login from './components/Login';
import UserFeed from './components/UserFeed';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/user/:username" component={UserFeed} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
