import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class PostForm extends React.Component {
  state = {
    author: "",
    description: "",
    image: "",
    category: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleForm = event => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/add-post", this.state)
      .then(response => {
        this.props.history.push("/");
      })
      .catch(error => {
        //throw new Error("Could not fetch posts");
        console.log(error);
      });
  };

  render() {
    return (
      <form>
        <legend>Create a new post</legend>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          onChange={this.handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={this.handleInputChange}
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          onChange={this.handleInputChange}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleForm}>Submit</button>
      </form>
    );
  }
}

export default withRouter(PostForm);
