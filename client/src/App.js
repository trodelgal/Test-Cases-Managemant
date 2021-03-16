import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddTest from "./components/addTests/AddTest";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SingleTest from "./components/SingleTest";

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/addTest">
          <AddTest/>
        </Route>
        <Route exact path="/singletest/:id">
          <SingleTest/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
