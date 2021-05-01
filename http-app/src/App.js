import React, { Component } from "react";
import "./App.css";
import http from "./services/httpService";
import config from "./config.json";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolve (success) OR rejected (failure)
    const { data: posts } = await http.get(config.API_END_POINT);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.API_END_POINT, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await http.put(config.API_END_POINT + "/" + post.id, post);
    // axios.patch(config.API_END_POINT + "/" + post.id, {title: 'UPDATED'});
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const prevPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(config.API_END_POINT + "/" + post.id);
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");
      const request = ex.request;
      const response = ex.response;
      console.log(ex);
      // Expected (404: not found, 400: bad request)- CLIENT ERRORS
      // - Display a specific error message
      if (response && response.status === 404) {
        alert("This post has already been deleted");
      }
      // Unexpected (network down, server down, DB down, bug)
      // - Log them
      // - Display a generic and friendly error message
      this.setState({ posts: prevPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
