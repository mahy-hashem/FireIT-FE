import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios"
import Post from "../components/Post"

class PostDetails extends React.Component {

    state = {
        post: {},
        user: "",
        text: ""
    }

    componentDidMount() {
        const { id } = this.props.match.params
        axios
            .get(`http://localhost:3001/posts/${id}`)
            .then(result => {
                this.setState({ post: result.data })
            })
            .catch(error => {
                //throw new Error("Could not fetch posts");
                console.log(error);
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlePostComment = (id, event) => {
        event.preventDefault();
        const user = this.state.user;
        const text = this.state.text;
        const comment = { user, text }
        axios
            .patch("http://localhost:3001/add-comment", { id, comment })
            .then(response => {
                let newPost = this.state.post;
                const user = this.state.user;
                const text = this.state.text;
                newPost.comments = [...this.state.post.comments, { user, text }];
                this.setState({
                    post: newPost,
                    user: "",
                    text: ""
                })
            })
            .catch(error => {
                //throw new Error("Could not fetch posts");
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Post
                    key={this.state.post._id}
                    id={this.state.post._id}
                    author={this.state.post.author}
                    description={this.state.post.description}
                    image={this.state.post.image}
                    category={this.state.post.category}
                    date={this.state.post.date}
                    votes={this.state.post.votes}
                    comments={this.state.post.comments}
                />
                {
                    this.state.post.comments && this.state.post.comments.length > 0 ?
                        <ul>
                            {
                                this.state.post.comments.map(comment => {
                                    return <li>{`${comment.user}: ${comment.text}`}</li>
                                })
                            }
                        </ul>
                        : null
                }
                <form className="comment-form">

                    <label htmlFor="user">User</label>
                    <input onChange={this.handleChange} id="user" name="user" value={this.state.user} />

                    <label htmlFor="text">Comment</label>
                    <input onChange={this.handleChange} id="text" name="text" value={this.state.text} />

                    <button onClick={(e) => this.handlePostComment(this.state.post._id, e)}>Send</button>
                </form>
            </div>
        )
    }

}

export default withRouter(PostDetails)


