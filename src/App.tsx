import "./App.scss";

import { BrowserRouter, Route } from "react-router-dom";

import CountryScreen from "./components/CountryScreen/CountryScreen";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import MainMenu from "./components/MainMenu/MainMenu";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <div className="app-wrapper">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Header />
          <Route exact path="/">
            <MainMenu />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/country">
            <CountryScreen />
          </Route>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
