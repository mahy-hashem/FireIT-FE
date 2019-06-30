import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Post from "./Post";

class Posts extends React.Component {
  state = {
    posts: []
  };

  fetchPosts = () => {
    axios
      .get("http://localhost:3001/")
      .then(response => {
        if (response.status !== 200) {
          throw new Error("Failed to get posts.");
        }
        return response.data;
      })
      .then(resData => {
        this.setState({
          posts: resData.posts
        });
      })
      .catch(error => {
        //throw new Error("Could not fetch posts");
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  handleVote = id => {
    axios
      .patch("http://localhost:3001/add-vote", { id })
      .then(response => {
        let updatedPosts = this.state.posts.map(post => {
          if (post._id === id) {
            post.votes++;
          }
          return post;
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        //throw new Error("Could not fetch posts");
        console.log(error);
      });
  };

  handleComment = id => {
    this.props.history.push(`/posts/${id}`);
  };

  render() {
    return (
      <main>
        {this.state.posts.length > 0
          ? this.state.posts.map(post => {
            return (
              <Post
                key={post._id}
                id={post._id}
                author={post.author}
                description={post.description}
                image={post.image}
                category={post.category}
                date={post.date}
                votes={post.votes}
                comments={post.comments}
                handleVote={this.handleVote}
                handleComment={this.handleComment}
              />
            );
          })
          : null}
        }
      </main>
    );
  }
}

export default withRouter(Posts);
