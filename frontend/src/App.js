import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./pages/Auth";
import BookingsPage from "./pages/Bookings";
import EventsPage from "./pages/Events";
import Navbar from "./components/Navigation/Navbar";
import AuthContext from "./context/auth-Context";
import { Component } from "react";

class App extends Component{

  state={
    token:null,
    userId:null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token:token,
      userId:userId
    })
  };

  logout = () => {
    this.setState({
      token:null,
      userId:null
    })
  };
  
  render(){
  return (
    <BrowserRouter>
      <>
        <AuthContext.Provider
          value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}
        >
          <Navbar />
          <main className="main-content">
          <Switch>
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}  
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/events" component={EventsPage} />
                {this.state.token && (
                  <Route path="/bookings" component={BookingsPage} />
                )}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
          </main>
        </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
  }
}

export default App;
