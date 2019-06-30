import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";

class Post extends React.Component {
  render() {
    const temp = Date(this.props.date).toString();
    const date = temp.split("GMT")[0];
    return (
      <section>
        <h2>{this.props.author}</h2>
        <p>
          <time>{date}</time>
        </p>
        <p> {this.props.description}</p>
        <img src={this.props.image} alt="" />
        <div className="post-footer">
          <div>
            <p>Votes ({this.props.votes})</p>
            <IconButton onClick={() => this.props.handleVote(this.props.id)}>
              Up Vote
            </IconButton>
          </div>
          <div>
            <p>Comments ({this.props.comments && this.props.comments.length})</p>
            <IconButton onClick={() => this.props.handleComment
              (this.props.id)}>
              Add Comment
            </IconButton>
          </div>
          <p>#{this.props.category}</p>
        </div>
      </section>
    );
  }
}

export default Post;
