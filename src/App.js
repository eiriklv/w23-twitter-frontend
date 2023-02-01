import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Feed from './components/Feed';
import UserFeed from './components/UserFeed';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Feed} />
        <Route path="/user/:username" component={UserFeed} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
