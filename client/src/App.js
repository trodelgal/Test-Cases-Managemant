import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddTest from "./components/addTests/AddTest";
import NavBar from "./components/NavBar";
import Home from "./components/Home";

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
      </Router>
    </div>
  );
}

export default App;
