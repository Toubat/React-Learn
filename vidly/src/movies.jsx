import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import "font-awesome/css/font-awesome.css";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";

class Movies extends Component {
  state = {
    movies: getMovies().map((movie) => {
      return { ...movie, liked: false };
    }),
    page: 1,
    pageSize: 4,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLiked = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ page });
  };

  getDisplayedMovies = () => {
    let movies = [];
    for (
      let i = (this.state.page - 1) * 4;
      i < Math.min(this.state.page * 4, this.state.movies.length);
      i++
    ) {
      movies.push(this.state.movies[i]);
    }

    return movies;
  };

  renderTable() {
    const { movies, page, pageSize } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginate(movies, page, pageSize).map((movie) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLiked(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    if (this.numMovies === 0) {
      return <p>There are no movies in the database.</p>;
    }

    return (
      <React.Fragment>
        <p>Showing {this.numMovies} movies in the database</p>
        {this.renderTable()}
        <Pagination
          onPageChange={this.handlePageChange}
          itemCount={this.state.movies.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.page}
        />
      </React.Fragment>
    );
  }

  get numMovies() {
    return this.state.movies.length;
  }
}

export default Movies;
