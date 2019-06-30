import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import PostForm from "./components/PostForm";
import PostDetails from "./components/PostDetails";
import "./styles/main.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/add-post" className="add-button">
          New FIRE
        </Link>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/add-post" component={PostForm} />
          <Route path="/posts/:id" component={PostDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
