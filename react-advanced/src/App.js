import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Movie from "./hoc/movie";
import Counter from "./hooks/Counter";
import Users from "./hooks/Users";
import MoviePage from "./context/MoviePage";
import UserContext from "./context/userContext";
import CartContext from "./context/cartContext";
import Login from "./context/Login";

class App extends Component {
  state = { currentUser: { name: "Mosh" } };

  handleLoggedIn = (username) => {
    console.log("Getting user");
    const user = { name: "Brian" };
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <CartContext.Provider value={{ cart: [] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn,
          }}
        >
          <div>
            <Movie id={1} />
            <Counter />
            <Users />
            <MoviePage />
            <Login />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
